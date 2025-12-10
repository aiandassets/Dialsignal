export interface Review {
    user: string;
    role: string;
    rating: number; // 1-5
    comment: string;
    source: string; // "G2", "Capterra", "Verified User"
    date: string;
}

export interface Provider {
    id: string;
    name: string;
    website: string;
    logo: string;
    description: string;
    contactRate: number; // Percentage 0-100
    callVolume: number; // Daily calls
    price: number; // Monthly price per seat
    features: string[];
    reportingInstructions: string;
    affiliateLink?: string; // Optional affiliate tracking link
    featured?: boolean; // If true, shows in default list
    score?: number; // Calculated score
    costScore?: number; // For admin dashboard
    reviews?: Review[];
}

export const providers: Provider[] = [
    {
        "id": "ricochet360",
        "name": "Ricochet360",
        "featured": true,
        "website": "https://ricochet360.com",
        "affiliateLink": "https://ricochet360.com/partners/",
        "logo": "https://logo.clearbit.com/ricochet360.com",
        "description": "All-in-one dialing and CRM platform designed for high-velocity sales.",
        "contactRate": 46,
        "callVolume": 350,
        "price": 135,
        "features": [
            "Dialer + Elite Spam Protection",
            "CRM Integration",
            "Local Presence"
        ],
        "reportingInstructions": "Log in to Ricochet360 > Reports > Standard Reports > Call Outcome Report.",
        "reviews": [
            { "user": "Jasmine R.", "role": "Sales Manager", "rating": 5, "comment": "Ricochet360 automates our entire workflow. The contact rates jumped 18% in the first month.", "source": "G2 Review", "date": "Dec 2024" },
            { "user": "Mark T.", "role": "Agency Owner", "rating": 4.5, "comment": "Best dialer for speed. Support is great.", "source": "Capterra", "date": "Nov 2024" }
        ]
    },
    {
        "id": "five9",
        "name": "Five9",
        "featured": true,
        "website": "https://five9.com",
        "affiliateLink": "https://www.five9.com/partners/referral-program",
        "logo": "https://logo.clearbit.com/five9.com",
        "description": "Intelligent cloud contact center.",
        "contactRate": 35,
        "callVolume": 190,
        "price": 180,
        "features": ["Omnichannel", "AI Routing", "Workforce Management"],
        "reportingInstructions": "Navigate to Reporting > Standard Reports > Call Log."
    },
    {
        "id": "ringcentral",
        "name": "RingCentral",
        "featured": true,
        "website": "https://ringcentral.com",
        "affiliateLink": "https://www.ringcentral.com/partner/affiliate.html",
        "logo": "https://logo.clearbit.com/ringcentral.com",
        "description": "Message, video, and phone on any device.",
        "contactRate": 32,
        "callVolume": 180,
        "price": 45,
        "features": ["Video Meetings", "Team Messaging", "Global Calling"],
        "reportingInstructions": "Analytics Portal > Performance Reports."
    },
    {
        "id": "dialpad",
        "name": "Dialpad",
        "featured": true,
        "website": "https://dialpad.com",
        "affiliateLink": "https://refer.dialpad.com/Brett-Schickler",
        "logo": "https://logo.clearbit.com/dialpad.com",
        "description": "The AI-powered cloud communications platform.",
        "contactRate": 30,
        "callVolume": 170,
        "price": 25,
        "features": ["AI Voice Intelligence", "Sales Coaching", "Sentiment Analysis"],
        "reportingInstructions": "Check Analytics > Calls."
    },
    {
        "id": "aircall",
        "name": "Aircall",
        "website": "https://aircall.com",
        "logo": "https://logo.clearbit.com/aircall.com",
        "description": "The phone system for modern business.",
        "contactRate": 14,
        "callVolume": 26,
        "price": 30,
        "features": ["CRM Integrations", "Power Dialer", "Call Monitoring"],
        "reportingInstructions": "Check admin dashboard for reporting metrics."
    },
    {
        "id": "openphone",
        "name": "OpenPhone",
        "website": "https://openphone.com",
        "logo": "https://logo.clearbit.com/openphone.com",
        "description": "The modern phone system for teams.",
        "contactRate": 7,
        "callVolume": 98,
        "price": 15,
        "features": ["Shared Numbers", "Slack Integration", "Call Recording"],
        "reportingInstructions": "Check admin dashboard for reporting metrics."
    },
    {
        "id": "vonage",
        "name": "Vonage",
        "featured": true,
        "website": "https://vonage.com",
        "logo": "https://logo.clearbit.com/vonage.com",
        "description": "Communications APIs and Unified Communications.",
        "contactRate": 24,
        "callVolume": 130,
        "price": 40,
        "features": ["API Integrations", "Conversational Commerce", "Service Cloud"],
        "reportingInstructions": "Vonage Dashboard > Reports > Summary."
    },
    {
        "id": "8x8",
        "name": "8x8",
        "featured": true,
        "website": "https://8x8.com",
        "logo": "https://logo.clearbit.com/8x8.com",
        "description": "Integrated cloud communications.",
        "contactRate": 22,
        "callVolume": 120,
        "price": 50,
        "features": ["XCaaS", "Global Voice", "Team Chat"],
        "reportingInstructions": "8x8 Analytics > Call Detail Records."
    }
];
