import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import ServicesGrid from "@/components/sections/ServicesGrid";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Process from "@/components/sections/Process";
import FreePreviewCTA from "@/components/sections/FreePreviewCTA";
import PricingGrid from "@/components/sections/PricingGrid";
import FaqAccordion from "@/components/sections/FaqAccordion";
import TestimonialsSlider from "@/components/sections/TestimonialsSlider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesGrid />
      <FeaturedProjects />
      <WhyChooseUs />
      <Process />
      <FreePreviewCTA />
      <PricingGrid />
      <TestimonialsSlider />
      <FaqAccordion />
    </>
  );
}
