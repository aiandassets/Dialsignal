'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Search, Lock } from 'lucide-react';

export function SearchHero() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isChecking, setIsChecking] = useState(false);

    const handleCheck = (e: React.FormEvent) => {
        e.preventDefault();
        if (!phoneNumber) return;

        setIsChecking(true);
        // Simulate analysis delay
        setTimeout(() => {
            router.push(`/dashboard?lookup=${encodeURIComponent(phoneNumber)}`);
        }, 800);
    };

    return (
        <div className="mt-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl relative z-20 ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300">
            <h3 className="text-white font-semibold text-lg mb-4 text-left flex items-center gap-2">
                <Search className="w-5 h-5 text-indigo-400" />
                Analyze Reputation
            </h3>
            <form onSubmit={handleCheck}>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter number (e.g. +1 555-0123)"
                        className="w-full min-w-0 flex-auto rounded-xl border border-white/10 bg-black/40 px-4 py-4 text-white placeholder:text-slate-500 shadow-inner focus:ring-2 focus:ring-indigo-500 focus:bg-black/60 sm:text-lg outline-none transition-all"
                    />
                </div>
                <p className="mt-3 text-xs text-slate-500 text-left flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Secure lookup. No data storage.
                </p>
                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={isChecking}
                        className="w-full block rounded-xl bg-indigo-600 px-8 py-4 text-center text-lg font-bold text-white shadow-lg hover:bg-indigo-500 hover:shadow-indigo-500/25 transition-all hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isChecking ? (
                            <>Scanning Networks...</>
                        ) : (
                            <>Check Reputation Status <ArrowRight className="w-5 h-5" /></>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
