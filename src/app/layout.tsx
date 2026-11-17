import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileFab } from "@/components/layout/mobile-fab";
import { siteConfig } from "@/lib/site-config";

const displayFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.domain}`),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "TheDripRoom6ix — Toronto's premier entertainment brand spanning events, talent management, and media production.",
  keywords: [
    "TheDripRoom6ix",
    "The Drip Room",
    "Toronto events",
    "Toronto talent management",
    "Toronto media production",
  ],
  openGraph: {
    title: siteConfig.name,
    description: "Events. Talent. Media. Culture.",
    url: `https://${siteConfig.domain}`,
    siteName: siteConfig.name,
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: "Events. Talent. Media. Culture.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} bg-obsidian font-body text-white antialiased`}
      >
        <Navbar />
        <main className="min-h-screen pb-28 lg:pb-0">{children}</main>
        <Footer />
        <MobileFab />
      </body>
    </html>
  );
}
