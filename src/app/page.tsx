import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { ArrowRight, ShieldCheck, BarChart3, Phone, Lock } from 'lucide-react';

export const metadata = {
    title: "DialSignal | Check Number Reputation",
    description: "Is your business number marked 'Scam Likely'? Check your reputation instantly with DialSignal.",
};

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-950">
            <Navbar />

            <div className="relative isolate overflow-hidden bg-slate-950 min-h-[calc(100vh-64px)] flex items-center justify-center">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.500),transparent)] opacity-20" />

                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <div className="mb-6 inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                        <span className="mr-2">🛡️</span> Enterprise Grade Reputation Tool
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-7xl mb-6">
                        Is Your Number Marked<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">"Scam Likely"?</span>
                    </h1>

                    <p className="mt-6 text-xl leading-8 text-slate-400 max-w-3xl mx-auto">
                        76% of customers ignore calls flagged as spam. Check your number's reputation score instantly across major carrier databases.
                    </p>

                    {/* SPAM CHECKER INPUT HERO */}
                    <div className="mt-12 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl relative z-20">
                        <h3 className="text-white font-semibold text-lg mb-4 text-left">Enter Business Phone Number</h3>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <input
                                type="tel"
                                placeholder="(555) 123-4567"
                                className="w-full min-w-0 flex-auto rounded-xl border border-white/10 bg-black/50 px-4 py-4 text-white placeholder:text-slate-500 shadow-sm focus:ring-2 focus:ring-emerald-500 sm:text-lg outline-none"
                            />
                        </div>
                        <p className="mt-3 text-xs text-slate-500 text-left">
                            * We do not store your number or use it for marketing. This is a secure reputation lookup.
                        </p>
                        <div className="mt-6">
                            <button className="w-full block rounded-xl bg-emerald-600 px-8 py-4 text-center text-lg font-bold text-white shadow-lg hover:bg-emerald-500 transition-all hover:scale-[1.02]">
                                Check Reputation Status
                            </button>
                        </div>
                    </div>

                    <div className="mt-16 flex justify-center gap-8 text-slate-500 text-sm font-medium uppercase tracking-widest">
                        <span>Verified Data</span>
                        <span>•</span>
                        <span>Carrier Direct</span>
                        <span>•</span>
                        <span>Real-Time Updates</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
