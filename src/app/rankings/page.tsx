'use client';

import { providers } from '@/lib/data';
import { ProviderCard } from '@/components/ProviderCard';
import { Navbar } from '@/components/Navbar';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function RankingsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProviders = providers.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => b.contactRate - a.contactRate); // Sort by highest contact rate

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            {/* Header */}
            <div className="relative isolate overflow-hidden pt-16 pb-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">VOIP Performance Index</h1>
                    <p className="mt-4 text-lg leading-8 text-slate-400 max-w-2xl mx-auto">
                        We track millions of calls to rank providers by <span className="text-emerald-400 font-semibold">Answer Rate</span>.
                        Stop paying for spam calls.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
                {/* Search Bar */}
                <div className="relative max-w-xl mx-auto mb-12">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-500" />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-xl border-0 bg-white/5 py-4 pl-10 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-lg"
                        placeholder="Search providers (e.g. RingCentral, Twilio)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* List */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                    {filteredProviders.map((provider, index) => (
                        <ProviderCard key={provider.id} provider={provider} rank={index + 1} />
                    ))}
                </div>

                {filteredProviders.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        No providers found matching "{searchTerm}"
                    </div>
                )}
            </div>
        </div>
    );
}
