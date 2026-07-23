"use client";

import { CheckCircle2 } from "lucide-react";
import { whyChooseUs as staticItems } from "@/lib/data";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { usePublicDocument } from "@/lib/usePublicFirestore";

const iconByLabel = new Map(staticItems.map((i) => [i.title, i.icon]));
const staticLabels = staticItems.map((i) => i.title);

export default function WhyChooseUs() {
  const { data } = usePublicDocument("settings/content", { whyChooseUs: staticLabels });
  const labels = data.whyChooseUs;

  return (
    <section className="section">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Why Choose Us</span>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          Everything a growing business needs.
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-4">
        {labels.map((title, i) => {
          const Icon = iconByLabel.get(title) ?? CheckCircle2;
          return (
            <Reveal key={title} delay={(i % 4) * 0.06}>
              <TiltCard className="card flex flex-col items-center gap-3 py-8 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-forge-gradient/20 ring-1 ring-white/[0.08]">
                  <Icon className="h-5 w-5 text-forge-cyan" strokeWidth={1.75} />
                </div>
                <p className="text-sm font-medium text-white">{title}</p>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
