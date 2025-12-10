import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Check, Shield } from 'lucide-react';

export const metadata = {
    title: "Pricing | DialSignal",
    description: "Simple, transparent pricing for clean business phone numbers.",
};

const tiers = [
    {
        name: 'Single Reputation Check',
        id: 'tier-check',
        href: '/',
        priceMonthly: '$0',
        description: 'Instant analysis of any US phone number.',
        features: [
            'Instant Spam Assessment',
            'Carrier Database Check',
            'Basic Risk Score',
        ],
        featured: false,
    },
    {
        name: 'Verified Clean Number',
        id: 'tier-number',
        href: '/dashboard',
        priceMonthly: '$29',
        description: 'Get a guaranteed clean business line ready to use.',
        features: [
            'Guaranteed "Spam Likely" Free',
            '30-Day Reputation Monitoring',
            'Instant Provisioning',
            'Sms & Voice Capable',
            'Export to any Carrier',
        ],
        featured: true,
    },
    {
        name: 'Enterprise Remediation',
        id: 'tier-enterprise',
        href: '/remediate/intake',
        priceMonthly: '$499',
        description: 'Full service remediation for labeled numbers.',
        features: [
            'Dedicated Case Manager',
            'Direct Carrier Appeals',
            'Reputation Repair',
            'Daily Monitoring Reports',
            'Bulk Number Processing',
        ],
        featured: false,
    },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Pricing() {
    return (
        <div className="min-h-screen bg-[#0b1120] text-slate-100 font-sans">
            <Navbar />

            <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
                <div className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl" aria-hidden="true">
                    <div className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-10" />
                </div>

                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-400">Pricing</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        Clean Numbers, Clear Pricing
                    </p>
                    <p className="mt-6 text-lg leading-8 text-slate-400">
                        Stop losing customers to "Scam Likely" labels. Get a verified clean number or fix your existing ones today.
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
                    {tiers.map((tier, tierIdx) => (
                        <div
                            key={tier.id}
                            className={classNames(
                                tier.featured ? 'relative bg-indigo-600/10 shadow-2xl ring-2 ring-indigo-500' : 'bg-white/5 ring-1 ring-white/10 sm:mx-8 lg:mx-0',
                                tier.featured ? '' : tierIdx === 0 ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none' : 'sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl',
                                'rounded-3xl p-8 xl:p-10'
                            )}
                        >
                            <h3 id={tier.id} className="text-base font-semibold leading-7 text-indigo-400">
                                {tier.name}
                            </h3>
                            <p className="mt-4 flex items-baseline gap-x-2">
                                <span className="text-5xl font-bold tracking-tight text-white">{tier.priceMonthly}</span>
                                {tier.name !== 'Single Reputation Check' && <span className="text-base text-gray-400">/one-time</span>}
                            </p>
                            <p className="mt-6 text-base leading-7 text-gray-300">{tier.description}</p>
                            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <Check className="h-6 w-5 flex-none text-indigo-400" aria-hidden="true" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={tier.href}
                                aria-describedby={tier.id}
                                className={classNames(
                                    tier.featured
                                        ? 'bg-indigo-600 shadow-sm hover:bg-indigo-500'
                                        : 'bg-white/10 hover:bg-white/20',
                                    'mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors'
                                )}
                            >
                                Get started
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
