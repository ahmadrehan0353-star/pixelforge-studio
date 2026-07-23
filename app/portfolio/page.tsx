import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import FreePreviewCTA from "@/components/sections/FreePreviewCTA";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "See real websites we've designed and shipped for businesses, from home service marketplaces to fashion e-commerce stores.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Work we're proud to show."
        description="A selection of live projects — real businesses, real websites, real results."
      />
      <FeaturedProjects />
      <FreePreviewCTA />
    </>
  );
}
