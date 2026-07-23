// Shared types for admin-managed content. Every type includes an `id`
// (Firestore document id) once fetched, plus an `order` field used for
// manual up/down reordering in list managers.

export type PortfolioProject = {
  id?: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  clientName?: string;
  completionDate?: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudy: {
    overview: string;
    goals: string[];
    designProcess: string;
    uiDecisions: string[];
    features: string[];
    challenges: { challenge: string; solution: string }[];
    results: string[];
  };
  thumbnailUrl?: string;
  galleryUrls: string[];
  featured: boolean;
  status: "published" | "draft";
  order: number;
  slug: string;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type Service = {
  id?: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
  order: number;
  status: "published" | "draft";
};

export type PricingPlan = {
  id?: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  popular: boolean;
  enabled: boolean;
  order: number;
};

export type Testimonial = {
  id?: string;
  name: string;
  company: string;
  review: string;
  rating: number;
  photoUrl?: string;
  published: boolean;
  order: number;
};

export type FaqItem = {
  id?: string;
  question: string;
  answer: string;
  order: number;
};

export type TeamMember = {
  id?: string;
  name: string;
  role: string;
  bio: string;
  photoUrl?: string;
  social: {
    instagram?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  order: number;
};

export type Lead = {
  id?: string;
  name: string;
  business: string;
  email: string;
  phone: string;
  websiteType: string;
  budget: string;
  timeline: string;
  description: string;
  status: "unread" | "read" | "archived";
  createdAt?: unknown;
};

export type ContactInfo = {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  github: string;
  workingHours: string;
};

export type SeoSettings = {
  websiteTitle: string;
  metaDescription: string;
  keywords: string;
  ogImageUrl: string;
  faviconUrl: string;
  googleAnalyticsId: string;
};

export type SiteSettings = {
  websiteName: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  defaultTheme: "dark" | "light";
};

export type SiteContent = {
  hero: {
    headline: string;
    subheadline: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
  stats: { label: string; value: number; suffix: string }[];
  about: {
    mission: string;
    vision: string;
    values: string;
    designPhilosophy: string;
    story: string;
  };
  whyChooseUs: string[];
  process: { title: string; description: string }[];
  ctaFreeMockup: {
    headline: string;
    text: string;
    buttonText: string;
  };
  footer: {
    tagline: string;
  };
};

export type MediaItem = {
  id?: string;
  name: string;
  url: string;
  path: string;
  type: string;
  size: number;
  createdAt?: unknown;
};
