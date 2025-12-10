'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Search, Lock, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export function SearchHero() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [status, setStatus] = useState<'idle' | 'scanning' | 'complete'>('idle');
    const [progress, setProgress] = useState(0);

    const handleCheck = (e: React.FormEvent) => {
        e.preventDefault();
        if (!phoneNumber) return;

        setStatus('scanning');
        setProgress(0);

        // Simulate scanning progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setStatus('complete');
                    return 100;
                }
                return prev + 2;
            });
        }, 30);
    };

    if (status === 'complete') {
        return (
            <div className="mt-12 bg-white/5 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl relative z-20 animate-in fade-in zoom-in-95 duration-500">
                <div className="flex items-center gap-3 mb-6 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                    <h3 className="text-red-400 font-bold text-lg">High Risk Detected</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Reputation Score</p>
                        <p className="text-3xl font-bold text-red-500">12<span className="text-sm text-slate-500">/100</span></p>
                    </div>
                    <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Est. Contact Loss</p>
                        <p className="text-3xl font-bold text-orange-400">~42%</p>
                    </div>
                </div>

                <div className="space-y-4 mb-8 text-left">
                    <div className="flex items-center justify-between text-sm border-b border-white/5 pb-2">
                        <span className="text-slate-300">Carrier databases flagged:</span>
                        <span className="font-mono text-red-400">3 Major / 2 MVNO</span>
                    </div>
                    <div className="flex items-center justify-between text-sm border-b border-white/5 pb-2">
                        <span className="text-slate-300">Est. Time Flagged:</span>
                        <span className="font-mono text-white">~4 Months</span>
                    </div>
                    <div className="flex items-center justify-between text-sm border-b border-white/5 pb-2">
                        <span className="text-slate-300">Flag Label:</span>
                        <span className="font-mono text-red-400">"Scam Likely"</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Link
                        href="/remediate/intake"
                        className="w-full block rounded-xl bg-emerald-600 px-8 py-3 text-center text-lg font-bold text-white shadow-lg hover:bg-emerald-500 transition-all hover:scale-[1.02]"
                    >
                        Fix This Number Now
                    </Link>
                    <button
                        onClick={() => { setStatus('idle'); setPhoneNumber(''); }}
                        className="text-slate-500 text-sm hover:text-white transition-colors"
                    >
                        Check Another Number
                    </button>
                </div>
            </div>
        );
    }

    if (status === 'scanning') {
        return (
            <div className="mt-12 bg-white/5 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-12 max-w-2xl mx-auto shadow-2xl relative z-20">
                <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="relative h-16 w-16">
                        <div className="absolute inset-0 rounded-full border-4 border-indigo-500/30"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 animate-spin"></div>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-white mb-2">Analyzing Carrier Data...</h3>
                        <p className="text-slate-400 font-mono text-sm">{phoneNumber}</p>
                    </div>
                    <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden max-w-xs">
                        <div
                            className="bg-indigo-500 h-full transition-all duration-75 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        );
    }

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
                        className="w-full block rounded-xl bg-indigo-600 px-8 py-4 text-center text-lg font-bold text-white shadow-lg hover:bg-indigo-500 hover:shadow-indigo-500/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                    >
                        Check Reputation Status <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </div>
    );
}
