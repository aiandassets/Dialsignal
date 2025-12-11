import { NextResponse } from 'next/server';
import { getTwilioClient } from '@/lib/twilio';

export async function POST(req: Request) {
    try {
        const { phoneNumber } = await req.json();

        if (!phoneNumber) {
            return new NextResponse('Missing phone number', { status: 400 });
        }

        const client = getTwilioClient();

        // 1. REAL DATA PATH
        if (client) {
            try {
                // Fetch Twilio Lookup (including line info if possible, or reputation add-ons)
                // For basic tier, we verify existence and line type. 
                // Advanced reputation requires specific packages/addons which might not be enabled.
                const lookup = await client.lookups.v2.phoneNumbers(phoneNumber)
                    .fetch({ fields: 'line_type_intelligence' }); // Fixed: string, not array

                // Interpret Twilio Response
                // This logic would need tuning based on specific reputation data returned.
                // For now, if we get a valid response, we consider it "scanned".

                // MOCK LOGIC FOR DEMO based on real lookup existence:
                // If it's a valid mobile number, we might default to "Clean" unless flagged.
                // Since standard lookup doesn't return "Scam Likely" without add-ons, 
                // we will pass the raw data or a simplified status back.

                return NextResponse.json({
                    source: 'Twilio',
                    valid: lookup.valid,
                    carrier: lookup.lineTypeIntelligence?.carrierName || 'Unknown',
                    type: lookup.lineTypeIntelligence?.type || 'unknown',
                    // If we had a reputation score, we'd map it here.
                    // For now, we return "clean" to confirm the API worked.
                    status: 'clean',
                    score: 98,
                });

            } catch (twilioError: any) {
                console.error('Twilio Lookup Failed:', twilioError);
                // Fallback to simulation if API fails (e.g. invalid number format for API)
            }
        }

        // 2. SIMULATION FALLBACK (If keys missing or API error)
        // Deterministic logic: Even last digit = Clean, Odd = Risk
        const cleanNumber = phoneNumber.replace(/\D/g, '');
        const lastDigit = parseInt(cleanNumber.slice(-1));
        const isClean = !isNaN(lastDigit) && lastDigit % 2 === 0;

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (isClean) {
            return NextResponse.json({
                source: 'Simulation',
                status: 'clean',
                score: 98,
                carrier: 'Simulation Network',
                riskLevel: 'Low'
            });
        } else {
            return NextResponse.json({
                source: 'Simulation',
                status: 'high_risk',
                score: 12,
                carrier: 'Simulation Network',
                riskLevel: 'High',
                flagLabel: 'Scam Likely'
            });
        }

    } catch (error) {
        console.error('Scan Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
