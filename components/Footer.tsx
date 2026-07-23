"use client";

import Link from "next/link";
import { Hexagon, Instagram, Github, Mail, MessageCircle } from "lucide-react";
import { usePublicDocument } from "@/lib/usePublicFirestore";
import type { ContactInfo } from "@/lib/admin/types";

const quickLinks = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const contactDefaults: ContactInfo = {
  phone: "",
  whatsapp: "10000000000",
  email: "hello@pixelforgestudio.com",
  address: "",
  googleMapsUrl: "",
  instagram: "pixelforgestudio",
  facebook: "",
  linkedin: "",
  github: "pixelforgestudio",
  workingHours: "",
};

export default function Footer() {
  const { data: contact } = usePublicDocument<ContactInfo>("settings/contact", contactDefaults);
  const { data: content } = usePublicDocument("settings/content", {
    footer: {
      tagline:
        "We design fast, modern, mobile-friendly websites for restaurants, salons, gyms, real estate agencies, medical clinics, clothing stores, and local businesses.",
    },
  });

  const social = [
    contact.whatsapp && {
      href: `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`,
      label: "WhatsApp",
      icon: MessageCircle,
    },
    contact.email && { href: `mailto:${contact.email}`, label: "Email", icon: Mail },
    contact.instagram && {
      href: contact.instagram.startsWith("http")
        ? contact.instagram
        : `https://instagram.com/${contact.instagram}`,
      label: "Instagram",
      icon: Instagram,
    },
    contact.github && {
      href: contact.github.startsWith("http")
        ? contact.github
        : `https://github.com/${contact.github}`,
      label: "GitHub",
      icon: Github,
    },
  ].filter(Boolean) as { href: string; label: string; icon: typeof Mail }[];

  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-900">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forge-gradient">
                <Hexagon className="h-4 w-4 text-white" strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg font-semibold text-white">
                PixelForge Studio
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist-500">
              {content.footer.tagline}
            </p>
            <div className="mt-6 flex gap-3">
              {social.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="glass flex h-10 w-10 items-center justify-center rounded-full text-mist-300 transition-colors hover:text-forge-cyan"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-mist-500">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-mist-300 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-mist-500">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/privacy-policy" className="text-sm text-mist-300 transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-mist-300 transition-colors hover:text-white">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-mist-700 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} PixelForge Studio. All rights reserved.</p>
          <p className="font-mono">Designed &amp; built by PixelForge Studio</p>
        </div>
      </div>
    </footer>
  );
}
