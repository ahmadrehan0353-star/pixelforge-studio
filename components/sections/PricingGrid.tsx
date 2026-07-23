"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { pricingPlans as staticPlans } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { usePublicCollection } from "@/lib/usePublicFirestore";
import type { PricingPlan } from "@/lib/admin/types";

const fallback: PricingPlan[] = staticPlans.map((p, i) => ({
  ...p,
  buttonText: p.price === "Custom" ? "Request Custom Quote" : "Get Started",
  popular: !!p.highlighted,
  enabled: true,
  order: i,
}));

export default function PricingGrid() {
  const { items } = usePublicCollection<PricingPlan>("pricing", fallback, "enabled");

  return (
    <section className="section">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Pricing</span>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          Simple, transparent packages.
        </h2>
        <p className="mt-4 text-mist-500">
          Every project starts with a free homepage mockup, regardless of package.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 lg:grid-cols-4">
        {items.map((plan, i) => (
          <Reveal key={plan.id ?? plan.name} delay={i * 0.08}>
            <div
              className={`relative flex h-full flex-col rounded-xl2 border p-7 ${
                plan.popular
                  ? "border-forge-cyan/40 bg-white/[0.06] shadow-glow"
                  : "glass-panel"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-forge-gradient px-3 py-1 text-[11px] font-semibold text-white">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-lg font-medium text-white">
                {plan.name}
              </h3>
              <p className="mt-2 text-sm text-mist-500">{plan.description}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-3xl font-semibold text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-mist-700">/ {plan.period}</span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-mist-300">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-forge-cyan" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`mt-8 w-full text-center ${
                  plan.popular ? "btn-primary" : "btn-secondary"
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mx-auto mt-12 max-w-lg text-center">
        <p className="text-mist-500">Need something custom?</p>
        <Link href="/contact" className="btn-secondary mt-4 inline-flex">
          Request Custom Quote
        </Link>
      </Reveal>
    </section>
  );
}
