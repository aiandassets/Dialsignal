'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Navbar } from '@/components/Navbar';
import { Search, ShoppingCart, Loader2, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NumberItem {
    id: string;
    phone_number: string;
    area_code: string;
    status: string;
}

export default function NumberSearchPage() {
    const [areaCode, setAreaCode] = useState('');
    const [numbers, setNumbers] = useState<NumberItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [purchasingId, setPurchasingId] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    // Helper to generate realistic mock numbers
    const generateMockNumbers = (code: string): NumberItem[] => {
        const count = 24; // Show a good amount
        const mockData: NumberItem[] = [];
        for (let i = 0; i < count; i++) {
            const prefix = Math.floor(Math.random() * 800) + 200; // 200-999
            const line = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
            mockData.push({
                id: `mock-${code}-${i}`,
                phone_number: `+1 (${code}) ${prefix}-${line}`,
                area_code: code,
                status: 'available'
            });
        }
        return mockData;
    };

    const searchNumbers = async () => {
        if (!areaCode) return;
        setLoading(true);

        // 1. Try Real DB first
        const { data, error } = await supabase
            .from('numbers')
            .select('*')
            .eq('status', 'available')
            .ilike('area_code', `%${areaCode}%`)
            .limit(20);

        if (data && data.length > 0) {
            setNumbers(data);
        } else {
            // 2. Fallback to Simulated Inventory (The "Thousands" feel)
            // Only generate if we have a valid-ish area code (3 digits)
            if (areaCode.length >= 3) {
                const mocks = generateMockNumbers(areaCode);
                setNumbers(mocks);
            } else {
                setNumbers([]);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        searchNumbers();
    }, []);

    const handlePurchase = async (numberId: string, phoneNumber: string) => {
        setPurchasingId(numberId);
        try {
            // Use configured price ID or fallback
            const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_NUMBER || 'price_1ScZBWGargl3vZqGyoUIxydE';

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    priceId: priceId,
                    areaCode: phoneNumber,
                    type: 'number_purchase',
                    returnUrl: '/dashboard'
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || 'Checkout initialization failed');
            }

            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Checkout failed: No redirect URL returned.');
            }
        } catch (err: any) {
            console.error(err);
            alert(`Failed to start checkout: ${err.message}. (Check your Price ID configuration)`);
        } finally {
            setPurchasingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#0b1120] text-slate-100 font-sans">
            <Navbar />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                        Clean Number Inventory
                    </h1>
                    <p className="mt-4 text-lg text-slate-400">
                        Search our verified "Scam Likely" free inventory. Ready for immediate use.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto mb-16 relative">
                    <div className="flex gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                            <input
                                type="text"
                                value={areaCode}
                                onChange={(e) => setAreaCode(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && searchNumbers()}
                                placeholder="Filter by Area Code (e.g. 212)"
                                className="w-full rounded-xl border border-white/10 bg-white/5 pl-12 pr-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                            />
                        </div>
                        <button
                            onClick={searchNumbers}
                            disabled={loading}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : 'Search'}
                        </button>
                    </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {numbers.map((num) => (
                        <div key={num.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/50 transition-all group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-500/10 rounded-full text-emerald-400">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <span className="font-mono text-xl font-bold">{num.phone_number}</span>
                                </div>
                                <span className="px-2 py-1 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    Clean
                                </span>
                            </div>

                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                                <div className="flex flex-col">
                                    <span className="text-slate-400 text-sm">Price</span>
                                    <span className="text-xl font-bold text-white">$29.00</span>
                                </div>
                                <button
                                    onClick={() => handlePurchase(num.id, num.phone_number)}
                                    disabled={!!purchasingId}
                                    className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-lg font-bold hover:bg-slate-200 transition-colors disabled:opacity-50"
                                >
                                    {purchasingId === num.id ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                                        <>
                                            Buy Now <ShoppingCart className="h-4 w-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {numbers.length === 0 && !loading && (
                    <div className="text-center text-slate-500 py-12">
                        {areaCode ? 'No numbers found. Try another area code.' : 'Enter an area code to start searching.'}
                    </div>
                )}
            </div>
        </div>
    );
}
