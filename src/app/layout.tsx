import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SOUR LEMON — AI Operational Intelligence Platform",
    template: "%s | SOUR LEMON",
  },
  description:
    "AI-powered Operational Intelligence Platform that helps enterprises reduce complexity, automate workflows, preserve knowledge and accelerate onboarding.",
  keywords: [
    "AI platform",
    "operational intelligence",
    "workflow automation",
    "enterprise AI",
    "knowledge management",
  ],
  authors: [{ name: "SOUR LEMON" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sourlemon.ai",
    siteName: "SOUR LEMON",
    title: "SOUR LEMON — AI Operational Intelligence Platform",
    description: "Complexity becomes intelligence. AI-powered platform for enterprise operations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOUR LEMON — AI Operational Intelligence Platform",
    description: "Complexity becomes intelligence.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04040C",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-[#04040C] text-[#EEEEF2] antialiased overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
