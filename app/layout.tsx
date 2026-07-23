import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = "https://pixelforgestudio.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PixelForge Studio — Websites That Grow Your Business",
    template: "%s | PixelForge Studio",
  },
  description:
    "PixelForge Studio designs fast, modern, mobile-friendly websites for restaurants, salons, gyms, real estate agencies, medical clinics, clothing stores, and local businesses. Get a free homepage mockup before you commit.",
  keywords: [
    "web design agency",
    "website design",
    "small business website",
    "e-commerce website design",
    "restaurant website design",
    "custom website development",
  ],
  authors: [{ name: "PixelForge Studio" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "PixelForge Studio — Websites That Grow Your Business",
    description:
      "We design fast, modern, mobile-friendly websites for local businesses. Request a free homepage mockup — pay nothing if you don't love it.",
    siteName: "PixelForge Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelForge Studio — Websites That Grow Your Business",
    description:
      "Fast, modern, mobile-friendly websites for local businesses. Free homepage mockup, no obligation.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${outfit.variable} ${inter.variable} ${jetbrains.variable} bg-ink-950`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "PixelForge Studio",
              description:
                "Web design agency building fast, modern websites for local businesses.",
              url: siteUrl,
              sameAs: [
                "https://instagram.com/pixelforgestudio",
                "https://github.com/pixelforgestudio",
              ],
            }),
          }}
        />
        <CursorGlow />
        <div className="pointer-events-none fixed inset-0 bg-mesh-radial" aria-hidden="true" />
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
