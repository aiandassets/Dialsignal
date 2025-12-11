import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getTwilioClient } from '@/lib/twilio';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const areaCode = searchParams.get('areaCode');

    if (!areaCode || areaCode.length < 3) {
        return new NextResponse('Invalid area code', { status: 400 });
    }

    try {
        const supabase = await createClient();
        const results = [];

        // 1. Check Local DB Inventory (Owned Numbers)
        const { data: localData } = await supabase
            .from('numbers')
            .select('*')
            .eq('status', 'available')
            .ilike('area_code', `%${areaCode}%`)
            .limit(10);

        if (localData) {
            results.push(...localData.map(n => ({
                id: n.id,
                phone_number: n.phone_number,
                area_code: n.area_code,
                status: 'available',
                source: 'inventory'
            })));
        }

        // 2. Check Twilio Real Inventory (if configured)
        const client = getTwilioClient();
        if (client) {
            try {
                const twilioNumbers = await client.availablePhoneNumbers('US')
                    .local.list({
                        areaCode: parseInt(areaCode),
                        limit: 12
                    });

                results.push(...twilioNumbers.map(n => ({
                    id: `twilio-${n.phoneNumber}`,
                    phone_number: n.friendlyName,
                    area_code: areaCode,
                    status: 'available',
                    source: 'twilio_api'
                })));
            } catch (err) {
                console.warn('Twilio inventory fetch failed:', err);
            }
        }

        // 3. Fallback Simulation (If no real results found yet)
        if (results.length === 0) {
            const count = 24;
            for (let i = 0; i < count; i++) {
                const prefix = Math.floor(Math.random() * 800) + 200;
                const line = Math.floor(Math.random() * 9000) + 1000;
                results.push({
                    id: `mock-${areaCode}-${i}`,
                    phone_number: `+1 (${areaCode}) ${prefix}-${line}`,
                    area_code: areaCode,
                    status: 'available',
                    source: 'simulation'
                });
            }
        }

        return NextResponse.json({ numbers: results });

    } catch (error) {
        console.error('Inventory Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
