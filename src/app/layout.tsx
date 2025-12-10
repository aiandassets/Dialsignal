import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "DialSignalV2",
    description: "DialSignal V2 Application",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
