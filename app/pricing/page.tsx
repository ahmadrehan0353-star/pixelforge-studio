import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PricingGrid from "@/components/sections/PricingGrid";
import FaqAccordion from "@/components/sections/FaqAccordion";
import FreePreviewCTA from "@/components/sections/FreePreviewCTA";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent website design pricing from PixelForge Studio — Starter, Business, Premium, and Enterprise packages, plus custom quotes.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Straightforward pricing, no surprises."
        description="Every package starts the same way: a free homepage mockup before you spend a dollar."
      />
      <PricingGrid />
      <FaqAccordion />
      <FreePreviewCTA />
    </>
  );
}
