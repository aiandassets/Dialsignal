'use client';

import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { LogIn, LayoutDashboard } from 'lucide-react';
import Image from 'next/image';

export function Navbar() {
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <nav className="border-b bg-slate-950 border-slate-800 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-3">
                            {/* Logo */}
                            <div className="h-8 w-8 relative">
                                <Image
                                    src="/logo.png"
                                    alt="DialSignal Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-bold text-xl tracking-tight">DialSignal</span>
                        </Link>
                        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
                            <Link href="/rankings" className="hover:text-white transition-colors">Directory</Link>
                            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-white hover:text-emerald-400">
                                <LayoutDashboard className="h-4 w-4" /> Dashboard
                            </Link>
                        ) : (
                            <Link href="/login" className="flex items-center gap-2 text-sm font-medium hover:text-emerald-400 transition-colors">
                                <LogIn className="h-4 w-4" />
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
