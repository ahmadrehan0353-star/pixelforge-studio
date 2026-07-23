import {
  services as staticServices,
  projects as staticProjects,
  pricingPlans as staticPlans,
  testimonials as staticTestimonials,
  faqs as staticFaqs,
  processSteps as staticProcessSteps,
  stats as staticStats,
} from "@/lib/data";
import { mapStaticProject } from "@/lib/admin/mapStaticProject";
import type {
  Service,
  PortfolioProject,
  PricingPlan,
  Testimonial,
  FaqItem,
  ContactInfo,
  SeoSettings,
  SiteSettings,
  SiteContent,
} from "@/lib/admin/types";

export const defaultServices: Omit<Service, "id">[] = staticServices.map((s, i) => ({
  title: s.title,
  description: s.description,
  icon: s.icon.displayName || "Briefcase",
  features: [],
  order: i,
  status: "published",
}));

export const defaultPortfolio: Omit<PortfolioProject, "id">[] = staticProjects.map((p, i) =>
  mapStaticProject(p, i)
);

export const defaultPricing: Omit<PricingPlan, "id">[] = staticPlans.map((p, i) => ({
  name: p.name,
  price: p.price,
  period: p.period,
  description: p.description,
  features: p.features,
  buttonText: p.price === "Custom" ? "Request Custom Quote" : "Get Started",
  popular: !!p.highlighted,
  enabled: true,
  order: i,
}));

export const defaultTestimonials: Omit<Testimonial, "id">[] = staticTestimonials.map((t, i) => ({
  name: t.name,
  company: t.role,
  review: t.quote,
  rating: 5,
  photoUrl: "",
  published: true,
  order: i,
}));

export const defaultFaqs: Omit<FaqItem, "id">[] = staticFaqs.map((f, i) => ({
  question: f.question,
  answer: f.answer,
  order: i,
}));

export const defaultContactInfo: ContactInfo = {
  phone: "+1 (000) 000-0000",
  whatsapp: "10000000000",
  email: "hello@pixelforgestudio.com",
  address: "",
  googleMapsUrl: "",
  instagram: "pixelforgestudio",
  facebook: "",
  linkedin: "",
  github: "pixelforgestudio",
  workingHours: "",
};

export const defaultSeo: SeoSettings = {
  websiteTitle: "PixelForge Studio — Websites That Grow Your Business",
  metaDescription:
    "We design fast, modern, mobile-friendly websites for restaurants, salons, gyms, real estate agencies, medical clinics, clothing stores, and local businesses.",
  keywords: "web design agency, website design, small business website",
  ogImageUrl: "",
  faviconUrl: "",
  googleAnalyticsId: "",
};

export const defaultSiteSettings: SiteSettings = {
  websiteName: "PixelForge Studio",
  logoUrl: "",
  primaryColor: "#6D5EF5",
  secondaryColor: "#4CD9E8",
  accentColor: "#FF7A45",
  defaultTheme: "dark",
};

export const defaultSiteContent: SiteContent = {
  hero: {
    headline: "Websites That Grow Your Business.",
    subheadline:
      "We design fast, modern, mobile-friendly websites for restaurants, salons, gyms, real estate agencies, medical clinics, clothing stores, and local businesses.",
    primaryButtonText: "Get a Free Website Preview",
    secondaryButtonText: "View Our Work",
  },
  stats: staticStats,
  about: {
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
  },
  whyChooseUs: [
    "Modern UI Design",
    "Mobile Responsive",
    "Fast Loading",
    "SEO Friendly",
    "Secure",
    "Affordable",
    "Custom Built",
    "Ongoing Support",
  ],
  process: staticProcessSteps.map((s) => ({ title: s.title, description: s.description })),
  ctaFreeMockup: {
    headline: "Not Sure If You Need A Website?",
    text:
      "We'll design a FREE homepage mockup for your business. If you love it, we'll build the complete website. If you don't like it, you pay absolutely nothing.",
    buttonText: "Request Your Free Mockup",
  },
  footer: {
    tagline:
      "We design fast, modern, mobile-friendly websites for restaurants, salons, gyms, real estate agencies, medical clinics, clothing stores, and local businesses.",
  },
};
