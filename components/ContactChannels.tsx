"use client";

import { MessageCircle, Mail, Instagram, Github } from "lucide-react";
import Reveal from "@/components/Reveal";
import { usePublicDocument } from "@/lib/usePublicFirestore";
import type { ContactInfo } from "@/lib/admin/types";

const defaults: ContactInfo = {
  phone: "+1 (000) 000-0000",
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

export default function ContactChannels() {
  const { data } = usePublicDocument<ContactInfo>("settings/contact", defaults);

  const channels = [
    data.whatsapp && {
      icon: MessageCircle,
      label: "WhatsApp",
      value: data.phone || data.whatsapp,
      href: `https://wa.me/${data.whatsapp.replace(/\D/g, "")}`,
    },
    data.email && {
      icon: Mail,
      label: "Email",
      value: data.email,
      href: `mailto:${data.email}`,
    },
    data.instagram && {
      icon: Instagram,
      label: "Instagram",
      value: data.instagram.startsWith("http") ? data.instagram : `@${data.instagram}`,
      href: data.instagram.startsWith("http")
        ? data.instagram
        : `https://instagram.com/${data.instagram}`,
    },
    data.github && {
      icon: Github,
      label: "GitHub",
      value: data.github.startsWith("http") ? data.github : `github.com/${data.github}`,
      href: data.github.startsWith("http") ? data.github : `https://github.com/${data.github}`,
    },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href: string }[];

  return (
    <>
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

      {data.workingHours && (
        <Reveal delay={0.15}>
          <div className="glass-panel p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-mist-500">
              Working Hours
            </p>
            <p className="mt-3 text-sm leading-relaxed text-mist-300">{data.workingHours}</p>
          </div>
        </Reveal>
      )}
    </>
  );
}
