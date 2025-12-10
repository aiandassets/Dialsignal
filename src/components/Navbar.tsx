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
        <nav className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                            {/* Logo */}
                            <div className="h-8 w-8 relative">
                                <Image
                                    src="/logo.png"
                                    alt="DialSignal Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">DialSignal</span>
                        </Link>
                        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
                            <Link href="/rankings" className="hover:text-white transition-colors">Directory</Link>
                            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-full hover:bg-white/20 transition-all border border-white/5">
                                <LayoutDashboard className="h-4 w-4" /> Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className="hidden sm:block text-sm font-medium text-slate-300 hover:text-white transition-colors">
                                    Log in
                                </Link>
                                <Link href="/login?signup=true" className="flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-bold text-white shadow-lg hover:bg-indigo-500 hover:shadow-indigo-500/25 transition-all">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
