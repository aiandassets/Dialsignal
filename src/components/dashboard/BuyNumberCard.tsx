'use client';

import { useState } from 'react';
import { ShieldAlert, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function BuyNumberCard() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handlePurchase = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceId: 'price_1234567890', // Placeholder - User must update this env var or hardcode
                    areaCode: '555'
                }),
            });

            if (!response.ok) {
                const text = await response.text();
                // If it's a 400/500, it might be missing keys. Warn user gracefully.
                alert(`Configuration Error: ${text}. (Did you set STRIPE_SECRET_KEY?)`);
                return;
            }

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('No URL returned from checkout session');
            }
        } catch (error) {
            console.error('Purchase error:', error);
            alert('Failed to initiate checkout. Please check console.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-emerald-500/10 blur-xl rounded-full"></div>

            <h3 className="font-semibold text-lg flex items-center gap-2 mb-2 text-emerald-400">
                <ShieldAlert className="h-5 w-5" />
                Get a Clean Number
            </h3>
            <p className="text-sm text-slate-400 mb-6">
                Certified spam-free numbers. Ready for cold outreach.
            </p>

            <div className="space-y-4">
                <div className="bg-black/40 rounded-lg p-3 border border-white/10">
                    <label className="text-xs text-slate-500 uppercase font-bold">Price</label>
                    <div className="text-2xl font-bold text-white">$5.00 <span className="text-sm text-slate-500 font-normal">/mo</span></div>
                </div>

                <button
                    onClick={handlePurchase}
                    disabled={loading}
                    className="w-full flex justify-center items-center rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Purchase Number →'}
                </button>
                <p className="text-xs text-center text-slate-600">Processed securely via Stripe</p>
            </div>
        </div>
    );
}
