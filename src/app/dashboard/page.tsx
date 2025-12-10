import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
// import { AreaCodeSearch } from '@/components/dashboard/AreaCodeSearch'; // We'll port/rebuild this next
// import { ActiveNumbersList } from '@/components/dashboard/ActiveNumbersList'; // We'll port this too
import { BuyNumberCard } from '@/components/dashboard/BuyNumberCard';
import { RemediationList } from '@/components/dashboard/RemediationList';
import { Phone, ShieldAlert, CreditCard } from 'lucide-react';

export default async function Dashboard() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-slate-400 mt-2">Manage your secure numbers and subscriptions.</p>
                    </div>
                    <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                        V2 System Active
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Left Column: Main Inventory (Takes 2 cols) */}
                    <div className="md:col-span-2 space-y-6">

                        {/* Status Card */}
                        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                            <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                                <Phone className="h-5 w-5 text-indigo-400" />
                                Remediation Cases
                            </h3>
                            <RemediationList />
                        </div>

                    </div>

                    {/* Right Column: Actions (Takes 1 col) */}
                    <div className="space-y-6">

                        {/* Buy Number Card (Real Stripe) */}
                        <BuyNumberCard />

                        {/* Billing Link */}
                        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                            <h3 className="font-semibold text-base flex items-center gap-2 mb-2 text-slate-300">
                                <CreditCard className="h-4 w-4" />
                                Billing Portal
                            </h3>
                            <a
                                href="#"
                                className="text-sm text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
                            >
                                Manage Subscriptions
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
