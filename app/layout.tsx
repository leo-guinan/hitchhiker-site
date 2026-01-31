import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "The Hitchhiker's Guide to the Future",
    template: "%s | The Hitchhiker's Guide to the Future",
  },
  description:
    "Infrastructure for people who've crossed the threshold. Guides, podcast, and network for coordination beyond the old systems.",
  openGraph: {
    title: "The Hitchhiker's Guide to the Future",
    description:
      "Infrastructure for people who've crossed the threshold. Guides, podcast, and network for coordination beyond the old systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <Header />
        <main className="min-h-[calc(100vh-8rem)]">{children}</main>
        <Footer />
        {plausibleDomain && (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
