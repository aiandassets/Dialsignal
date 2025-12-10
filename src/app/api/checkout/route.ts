import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

// Initialize Stripe with strict API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
});

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await req.json();
        const { priceId, areaCode } = body;

        if (!priceId) {
            return new NextResponse('Missing Price ID', { status: 400 });
        }

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            customer_email: user.email,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            metadata: {
                userId: user.id,
                areaCode: areaCode || 'Any', // Store area code preference to provision later
                type: 'clean_number_subscription'
            },
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://dialsignal.io'}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://dialsignal.io'}/dashboard?canceled=true`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('[STRIPE_ERROR]', error);
        return new NextResponse(error.message || 'Internal Server Error', { status: 500 });
    }
}
