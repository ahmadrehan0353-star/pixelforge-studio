"use client";

import { Target, Eye, Heart, Layers } from "lucide-react";
import Reveal from "@/components/Reveal";
import { usePublicDocument } from "@/lib/usePublicFirestore";

const defaults = {
  mission:
    "To help local and growing businesses compete online with websites that look and perform like they belong to companies twice their size.",
  vision:
    "A future where every small business has a website as polished, fast, and trustworthy as the best brands on the internet.",
  values:
    "Honest communication, genuine craftsmanship, and results that matter more to us than billable hours.",
  designPhilosophy:
    "Design should never get in the way of the message. We build with clarity first, decoration second, and performance always.",
  story:
    "PixelForge Studio was founded on a simple observation: too many great businesses were being represented online by outdated, slow, or confusing websites. We set out to close that gap — combining modern design sensibilities with the practical needs of real businesses like restaurants, salons, gyms, clinics, and retailers.\n\nEvery project starts the same way, with a free homepage mockup, because we believe you should see the quality of our work before you commit to it. From there, we handle everything — design, development, and support — so you can focus on running your business.",
};

export default function AboutContent() {
  const { data: about } = usePublicDocument("settings/content", { about: defaults });
  const content = about.about;

  const pillars = [
    { icon: Target, title: "Mission", text: content.mission },
    { icon: Eye, title: "Vision", text: content.vision },
    { icon: Heart, title: "Values", text: content.values },
    { icon: Layers, title: "Our Design Philosophy", text: content.designPhilosophy },
  ];

  return (
    <>
      <section className="section">
        <div className="grid gap-6 sm:grid-cols-2">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="card h-full">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forge-gradient/20 ring-1 ring-white/[0.08]">
                    <Icon className="h-5 w-5 text-forge-cyan" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-medium text-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist-500">
                    {p.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section max-w-4xl">
        <Reveal>
          <div className="glass-panel p-8 sm:p-12">
            <span className="eyebrow">Our Story</span>
            <h2 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">
              Started by people who were tired of bad small business websites.
            </h2>
            {content.story.split("\n\n").map((para, i) => (
              <p key={i} className="mt-5 text-sm leading-relaxed text-mist-300 sm:text-base first:mt-5">
                {para}
              </p>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
