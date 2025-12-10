import { Provider } from '@/lib/data';
import { ArrowUpRight, BarChart3, CheckCircle2, Phone } from 'lucide-react';
import Link from 'next/link';

export function ProviderCard({ provider, rank }: { provider: Provider; rank: number }) {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 transition-all hover:bg-white/10 hover:shadow-2xl hover:shadow-emerald-900/10">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-2 shadow-sm">
                        <img src={provider.logo} alt={provider.name} className="h-full w-full object-contain" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-white">{provider.name}</h3>
                            {provider.featured && (
                                <span className="inline-flex items-center rounded-full bg-emerald-400/10 px-2 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-400/20">
                                    Trusted
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-slate-400">{provider.description}</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-1 justify-end text-emerald-400 font-bold text-xl">
                        <BarChart3 className="h-5 w-5" />
                        {provider.contactRate}%
                    </div>
                    <p className="text-xs text-slate-500 uppercase font-medium">Answer Rate</p>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                <div>
                    <p className="text-xs text-slate-500 uppercase font-medium mb-2">Key Features</p>
                    <ul className="space-y-1">
                        {provider.features.slice(0, 2).map((feature, i) => (
                            <li key={i} className="flex items-center text-sm text-slate-300">
                                <CheckCircle2 className="mr-2 h-3 w-3 text-emerald-500" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col justify-end">
                    <a
                        href={provider.affiliateLink || provider.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition-all"
                    >
                        View Provider <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                </div>
            </div>

            {/* Rank Badge */}
            <div className="absolute -right-6 -top-6 h-20 w-20 rotate-45 bg-white/5"></div>
            <div className="absolute right-4 top-4 text-xs font-bold text-slate-600">
                #{rank}
            </div>
        </div>
    );
}
