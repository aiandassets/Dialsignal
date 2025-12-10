import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { RemediationForm } from '@/components/dashboard/RemediationForm';
import { Navbar } from '@/components/Navbar';

export default async function IntakePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login?next=/remediate/intake');
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <div className="py-12 px-6">
                <div className="mx-auto max-w-2xl">
                    <div className="mb-8 text-center">
                        <div className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20 mb-4">
                            Full Service Remediation
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">Clean Your Numbers</h1>
                        <p className="mt-3 text-slate-400">
                            We advocate directly with carriers to remove "Spam Likely" labels.
                            Submit your numbers below to start the process.
                        </p>
                    </div>

                    <div className="bg-slate-900 shadow-xl rounded-2xl p-8 border border-white/10">
                        <RemediationForm userId={user.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}
