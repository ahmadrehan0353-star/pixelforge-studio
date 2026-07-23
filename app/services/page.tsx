import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Process from "@/components/sections/Process";
import FreePreviewCTA from "@/components/sections/FreePreviewCTA";

export const metadata: Metadata = {
  title: "Services",
  description:
    "From business websites to e-commerce stores, booking systems, and SEO — explore the full range of services PixelForge Studio offers.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Every service your business needs online."
        description="Whether you're launching your first website or replacing one that's holding you back, we build it fast, modern, and mobile-ready."
      />
      <ServicesGrid eyebrow="What We Offer" title="Pick what fits, or let us guide you." />
      <Process />
      <FreePreviewCTA />
    </>
  );
}
