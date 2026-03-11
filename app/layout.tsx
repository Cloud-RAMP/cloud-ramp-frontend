import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Cloud Ramp",
    description:
        "Deploy your websocket apps at massive scale, without the overhead, with cloud ramp.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <link rel="icon" href="/logo.png" />
            <UserProvider>
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    <div className="w-(--capped-width) h-screen fixed border-x border-outline left-1/2 -translate-x-1/2 z-[-1]"></div>
                    <Header />
                    <div className="max-w-capped-width mx-auto font-geist-sans">{children}</div>
                </body>
            </UserProvider>
        </html>
    );
}
