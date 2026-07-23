"use client";

import * as Icons from "lucide-react";
import { Briefcase } from "lucide-react";
import { services as staticServices } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { usePublicCollection } from "@/lib/usePublicFirestore";
import type { Service as AdminService } from "@/lib/admin/types";

// Static fallback re-shaped to the admin Service type (icon as string name)
// so the same rendering path works whether data comes from Firestore or not.
const fallback: AdminService[] = staticServices.map((s, i) => ({
  title: s.title,
  description: s.description,
  icon: s.icon.displayName || "Briefcase",
  features: [],
  order: i,
  status: "published",
}));

export default function ServicesGrid({
  eyebrow = "What We Build",
  title = "Websites for every kind of business.",
}: {
  eyebrow?: string;
  title?: string;
}) {
  const { items } = usePublicCollection<AdminService>("services", fallback, "status");

  return (
    <section className="section">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          {title}
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((service, i) => {
          const Icon = (Icons as unknown as Record<string, typeof Briefcase>)[service.icon] || Briefcase;
          return (
            <Reveal key={service.id ?? service.title} delay={(i % 4) * 0.08}>
              <div className="card group h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forge-gradient/20 ring-1 ring-white/[0.08] transition-transform duration-300 group-hover:scale-110 group-hover:ring-forge-cyan/40">
                  <Icon className="h-5 w-5 text-forge-cyan" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 font-display text-lg font-medium text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-500">
                  {service.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
