import { createClient } from '@/lib/supabase/server';
import { ShieldCheck, Clock } from 'lucide-react';

export async function RemediationList() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .eq('type', 'remediation')
        .order('created_at', { ascending: false });

    if (!orders || orders.length === 0) {
        return (
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
                <ShieldCheck className="mx-auto h-8 w-8 text-slate-600 mb-2" />
                <h3 className="text-sm font-semibold text-white">No Active Cases</h3>
                <p className="text-xs text-slate-500 mt-1">Start a remediation case to clean your numbers.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <div key={order.id} className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-indigo-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">{order.details?.companyName || 'Remediation Case'}</p>
                            <p className="text-xs text-slate-500">
                                {order.details?.numbers?.length || 0} numbers • {new Date(order.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20">
                            {order.status}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
