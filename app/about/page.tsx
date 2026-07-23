import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import AboutContent from "@/components/AboutContent";
import FreePreviewCTA from "@/components/sections/FreePreviewCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "PixelForge Studio helps businesses establish a professional online presence with modern, high-performing websites that attract more customers.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="We build the websites your business deserves."
        description="PixelForge Studio helps businesses establish a professional online presence with modern, high-performing websites that attract more customers."
      />

      <AboutContent />

      <FreePreviewCTA />
    </>
  );
}
