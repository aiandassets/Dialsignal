import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_build_fallback', {
    typescript: true,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
    if (!webhookSecret) {
        return new NextResponse('Webhook error: Missing secret', { status: 500 });
    }

    const body = await req.text();
    const signature = (await headers()).get('stripe-signature')!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook signature verification failed.`, err.message);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const supabase = await createClient();

    if (event.type === 'checkout.session.completed') {
        const { userId, areaCode, type } = session.metadata || {};

        if (type === 'number_purchase' && userId && areaCode) {
            // Provision the specific number.
            // Since our inventory is "simulated", we create the record now.
            // In a real app with real inventory, we would UPDATE an existing record.

            // For this version: Insert into 'numbers' table.

            // Generate the purchased number based on what was shown? 
            // The metadata 'areaCode' passed from checkout is actually the full phone number string.
            // See search/page.tsx: areaCode: phoneNumber

            const { error } = await supabase.from('numbers').insert({
                user_id: userId,
                phone_number: areaCode, // The full number string was passed here
                status: 'active',
                capabilities: ['voice', 'sms'],
                area_code: areaCode.replace(/\D/g, '').substring(1, 4), // Extract 212 from +1 (212)...
                purchased_at: new Date().toISOString(),
                subscription_id: session.subscription as string
            });

            if (error) {
                console.error('Failed to provision number:', error);
                return new NextResponse('Database Error', { status: 500 });
            }
            console.log(`Provisioned number ${areaCode} for user ${userId}`);
        }

        if (type === 'remediation_service' && userId) {
            // Log remediation order
            const { error } = await supabase.from('orders').insert({
                user_id: userId,
                type: 'remediation',
                status: 'paid',
                stripe_session_id: session.id,
                amount: session.amount_total,
                created_at: new Date().toISOString()
            });
            if (error) {
                console.error('Failed to create order:', error);
            }
        }
    }

    return new NextResponse(null, { status: 200 });
}
