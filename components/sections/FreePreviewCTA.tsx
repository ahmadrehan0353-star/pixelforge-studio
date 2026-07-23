"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import { usePublicDocument } from "@/lib/usePublicFirestore";

const defaults = {
  headline: "Not Sure If You Need A Website?",
  text:
    "We'll design a FREE homepage mockup for your business. If you love it, we'll build the complete website. If you don't like it, you pay absolutely nothing.",
  buttonText: "Request Your Free Mockup",
};

export default function FreePreviewCTA() {
  const { data } = usePublicDocument("settings/content", { ctaFreeMockup: defaults });
  const cta = data.ctaFreeMockup;

  return (
    <section className="section">
      <Reveal>
        <div className="relative overflow-hidden rounded-xl3 border border-white/[0.08] bg-forge-gradient px-8 py-16 text-center sm:px-16">
          <div
            className="pointer-events-none absolute inset-0 bg-ink-950/40"
            aria-hidden="true"
          />
          <div className="relative">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              {cta.headline}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/85">
              {cta.text}
            </p>

            <div className="mx-auto mt-6 flex max-w-md flex-col gap-2 text-sm text-white/80 sm:flex-row sm:justify-center sm:gap-6">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> No cost to preview
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> No obligation
              </span>
            </div>

            <div className="mt-9">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-950 px-8 py-4 text-sm font-semibold text-white shadow-panel transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                {cta.buttonText}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
