import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", weight: ["500", "700"] });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });

const siteUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI Suite — JARVIS, FRIDAY & EDITH for Windows",
    template: "%s · AI Suite",
  },
  description:
    "AI Suite is a Windows desktop AI ecosystem built around three assistants — JARVIS, FRIDAY, and EDITH — unified under one account and one download.",
  openGraph: {
    title: "AI Suite — JARVIS, FRIDAY & EDITH for Windows",
    description:
      "One suite, multiple intelligences. Download the AI Suite desktop app for Windows.",
    url: siteUrl,
    siteName: "AI Suite",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Suite — JARVIS, FRIDAY & EDITH for Windows",
    description: "One suite, multiple intelligences. Download AI Suite for Windows.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body bg-core-bg text-core-text antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
