import type { Metadata } from "next";
import { MessageCircle, Mail, Instagram, Github } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request your free homepage mockup from PixelForge Studio. Tell us about your business and we'll get back to you shortly.",
};

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+1 (000) 000-0000",
    href: "https://wa.me/10000000000",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@pixelforgestudio.com",
    href: "mailto:hello@pixelforgestudio.com",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@pixelforgestudio",
    href: "https://instagram.com/pixelforgestudio",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/pixelforgestudio",
    href: "https://github.com/pixelforgestudio",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's build something great."
        description="Tell us about your business and we'll design a free homepage mockup — no cost, no obligation."
      />

      <section className="section pt-0">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>

          <div className="space-y-4 lg:col-span-2">
            {channels.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.label} delay={i * 0.06}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card flex items-center gap-4"
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-forge-gradient/20 ring-1 ring-white/[0.08]">
                      <Icon className="h-5 w-5 text-forge-cyan" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-sm text-mist-500">{c.label}</p>
                      <p className="font-medium text-white">{c.value}</p>
                    </div>
                  </a>
                </Reveal>
              );
            })}

            <Reveal delay={0.2}>
              <div className="glass-panel p-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-mist-500">
                  Response Time
                </p>
                <p className="mt-3 text-sm leading-relaxed text-mist-300">
                  We typically respond within 24 hours on business days with
                  next steps for your free homepage mockup.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
