import {
  Store,
  ShoppingBag,
  UtensilsCrossed,
  CalendarCheck,
  LayoutTemplate,
  Briefcase,
  RefreshCw,
  Search,
  Palette,
  Smartphone,
  Zap,
  ShieldCheck,
  Wallet,
  Wrench,
  Headphones,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    icon: Briefcase,
    title: "Business Websites",
    description:
      "Professional, conversion-focused sites that make your business look as credible online as it is in person.",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Stores",
    description:
      "Full online stores with product catalogs, secure checkout, and inventory tools built to sell around the clock.",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurant Websites",
    description:
      "Menus, reservations, and online ordering wrapped in a design that makes people hungry before they arrive.",
  },
  {
    icon: CalendarCheck,
    title: "Booking Systems",
    description:
      "Let clients book appointments, classes, or services in a few taps — synced straight to your calendar.",
  },
  {
    icon: LayoutTemplate,
    title: "Landing Pages",
    description:
      "High-converting single pages built for campaigns, launches, and lead generation that actually perform.",
  },
  {
    icon: Palette,
    title: "Portfolio Websites",
    description:
      "Clean, image-first sites that let your work speak for itself — built for creatives and studios.",
  },
  {
    icon: RefreshCw,
    title: "Website Redesign",
    description:
      "Already have a site that feels dated or slow? We rebuild it with modern design and real performance.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Technical and on-page SEO so the customers searching for you can actually find you.",
  },
];

export type WhyChooseItem = {
  icon: LucideIcon;
  title: string;
};

export const whyChooseUs: WhyChooseItem[] = [
  { icon: Palette, title: "Modern UI Design" },
  { icon: Smartphone, title: "Mobile Responsive" },
  { icon: Zap, title: "Fast Loading" },
  { icon: Search, title: "SEO Friendly" },
  { icon: ShieldCheck, title: "Secure" },
  { icon: Wallet, title: "Affordable" },
  { icon: Wrench, title: "Custom Built" },
  { icon: Headphones, title: "Ongoing Support" },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  liveUrl: string;
  tech: string[];
  overview: string;
  goals: string[];
  designProcess: string;
  uiDecisions: string[];
  features: string[];
  challenges: { challenge: string; solution: string }[];
  results: string[];
};

export const projects: Project[] = [
  {
    slug: "karvo",
    title: "Karvo",
    category: "Home Services Marketplace",
    description:
      "A modern platform connecting customers with trusted service professionals including electricians, plumbers, painters, tutors, AC technicians, cleaners, and more. The platform features responsive design, authentication, service listings, booking functionality, and a modern UI.",
    liveUrl: "https://karvo-swart.vercel.app",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Authentication", "Responsive UI"],
    overview:
      "Karvo needed a marketplace that felt trustworthy on both sides of the transaction — homeowners searching for reliable help, and professionals showcasing their services. We designed a platform that puts service discovery front and center without sacrificing the polish of a modern consumer app.",
    goals: [
      "Make it effortless to browse and compare service professionals by category",
      "Build a booking flow simple enough for first-time users to complete in under a minute",
      "Establish a visual identity that feels trustworthy across dozens of trade categories",
      "Ship a fully responsive experience that works as well on a job site phone as a home desktop",
    ],
    designProcess:
      "We started with user flows for both customers and professionals, mapping the shortest path from 'I need an electrician' to a confirmed booking. Wireframes were tested against real service categories before any visual design began, ensuring the information architecture could scale from five categories to fifty.",
    uiDecisions: [
      "Category-first navigation so users never have to guess where their need fits",
      "Card-based service listings with clear pricing signals and trust indicators",
      "A restrained color system so professional photos and listings stay the visual focus",
      "Sticky booking actions on mobile so the primary action is always reachable",
    ],
    features: [
      "User authentication for customers and service professionals",
      "Searchable, filterable service listings by category and location",
      "Booking functionality with real-time availability",
      "Responsive design tuned for on-the-go mobile use",
      "Professional profile pages with services offered and reviews",
    ],
    challenges: [
      {
        challenge: "Supporting a huge range of service categories without the UI feeling generic.",
        solution:
          "We built a flexible listing template with category-specific iconography and copy patterns, so an electrician's listing and a tutor's listing both feel tailored, not templated.",
      },
      {
        challenge: "Keeping the booking flow fast on mobile data connections.",
        solution:
          "We optimized the booking flow to load progressively and minimized required fields, cutting time-to-booking significantly on mobile.",
      },
    ],
    results: [
      "Launched a production-ready marketplace covering multiple home service categories",
      "Fully responsive experience across mobile, tablet, and desktop",
      "A scalable design system ready to support new service categories as Karvo grows",
    ],
  },
  {
    slug: "ameer-clothing",
    title: "Ameer Clothing",
    category: "Fashion E-Commerce",
    description:
      "A premium clothing store with elegant shopping experience, responsive layouts, product browsing, fashion categories, and modern design.",
    liveUrl: "https://ameer-sepia.vercel.app",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "E-commerce UI", "Responsive Design"],
    overview:
      "Ameer Clothing wanted an online store that matched the feel of a premium boutique — elegant, uncluttered, and focused on letting the product photography do the talking. We designed a shopping experience that feels editorial rather than transactional.",
    goals: [
      "Create a browsing experience that feels premium and boutique, not like a generic template store",
      "Organize a full clothing catalog into clear, navigable categories",
      "Design product pages that build desire through imagery and clean layout",
      "Ensure the store performs beautifully on mobile, where most fashion browsing happens",
    ],
    designProcess:
      "We researched premium fashion retailers to understand the visual language of the category — generous white space, large imagery, minimal chrome — then adapted those patterns into a system that could be built and maintained efficiently.",
    uiDecisions: [
      "Large, uninterrupted product imagery with minimal competing UI",
      "A restrained neutral palette so garment colors remain accurate and vivid",
      "Editorial-style category pages that group product by look, not just type",
      "Simplified navigation that keeps the path from browse to cart short",
    ],
    features: [
      "Full product catalog with fashion category browsing",
      "Responsive product grids and detail pages",
      "Elegant, minimal navigation and search",
      "Mobile-first shopping experience",
    ],
    challenges: [
      {
        challenge: "Presenting a large catalog without overwhelming the shopper.",
        solution:
          "We introduced curated category landing pages and progressive filtering, so shoppers narrow down naturally instead of facing the entire catalog at once.",
      },
      {
        challenge: "Keeping page loads fast with heavy, high-resolution product photography.",
        solution:
          "We implemented responsive image loading so pages stayed fast without compromising the visual quality the brand needed.",
      },
    ],
    results: [
      "A live, production storefront with a premium boutique feel",
      "Fully responsive shopping experience across all devices",
      "A design system ready to expand as new collections are added",
    ],
  },
];

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Tell us about your business",
    description:
      "A short conversation about what you do, who your customers are, and what you want your website to achieve.",
  },
  {
    step: "02",
    title: "We design a FREE homepage preview",
    description:
      "Our team designs a real homepage mockup for your business — no payment, no commitment required.",
  },
  {
    step: "03",
    title: "You approve the design",
    description:
      "Love it? We move forward. Want changes? We refine it with you until it's right.",
  },
  {
    step: "04",
    title: "We build the complete website",
    description:
      "Our developers turn the approved design into a fast, fully responsive, production-ready website.",
  },
  {
    step: "05",
    title: "Launch and support",
    description:
      "We launch your site and stay on to support updates, fixes, and improvements as your business grows.",
  },
];

export type PricingPlan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$499",
    period: "one-time",
    description: "A clean, professional single-page site for new and small businesses.",
    features: [
      "1 page website",
      "Mobile responsive design",
      "Basic SEO setup",
      "Contact form",
      "2 rounds of revisions",
      "2 weeks delivery",
    ],
  },
  {
    name: "Business",
    price: "$1,199",
    period: "one-time",
    description: "A full multi-page website built to convert visitors into customers.",
    features: [
      "Up to 6 pages",
      "Custom modern design",
      "Mobile responsive design",
      "On-page SEO optimization",
      "Booking or contact integration",
      "4 rounds of revisions",
      "3–4 weeks delivery",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    price: "$2,499",
    period: "one-time",
    description: "A premium, animation-rich site for brands that need to stand out.",
    features: [
      "Up to 12 pages",
      "Premium animations & interactions",
      "E-commerce or booking system",
      "Advanced SEO optimization",
      "Performance optimization",
      "Unlimited revisions during build",
      "5–6 weeks delivery",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "quote",
    description: "A fully custom platform for larger businesses and complex requirements.",
    features: [
      "Unlimited pages",
      "Custom features & integrations",
      "Dedicated design & dev team",
      "Advanced e-commerce or portals",
      "Priority ongoing support",
      "Flexible timeline",
    ],
  },
];

export type FaqItem = { question: string; answer: string };

export const faqs: FaqItem[] = [
  {
    question: "How long does a website take?",
    answer:
      "Most business websites take 3–6 weeks from approved design to launch, depending on scope. Landing pages can be ready in as little as one week.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Pricing starts at $499 for a single-page site and scales based on pages, features, and complexity. Check our Pricing page for full package details, or request a custom quote.",
  },
  {
    question: "Can you redesign my website?",
    answer:
      "Yes. We regularly rebuild outdated or slow websites into modern, fast, mobile-friendly experiences without losing the content and SEO equity you've already built.",
  },
  {
    question: "Will my website work on mobile?",
    answer:
      "Every website we build is mobile-first and fully responsive, tested across phones, tablets, and desktops before launch.",
  },
  {
    question: "Do you provide hosting?",
    answer:
      "Yes, we offer managed hosting options, or we can deploy your site to a host of your choice if you'd prefer to manage it yourself.",
  },
  {
    question: "Can I edit my website later?",
    answer:
      "Yes. We can build your site on an easy-to-use content system so you can update text and images yourself, and we're always available for larger changes.",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Sample Client",
    role: "Owner, Local Restaurant (sample testimonial)",
    quote:
      "PixelForge took our vague idea and turned it into a site that actually brings in reservations. The whole process was easy to follow from start to finish.",
  },
  {
    name: "Sample Client",
    role: "Founder, Boutique Fashion Store (sample testimonial)",
    quote:
      "The free mockup completely sold us before we spent a dollar. Seeing our brand designed that well made the decision easy.",
  },
  {
    name: "Sample Client",
    role: "Manager, Neighborhood Gym (sample testimonial)",
    quote:
      "Our new site loads instantly and looks incredible on mobile, which is where most of our members find us. Exactly what we needed.",
  },
];

export const stats = [
  { label: "Websites Built", value: 120, suffix: "+" },
  { label: "Happy Clients", value: 95, suffix: "+" },
  { label: "Years of Experience", value: 6, suffix: "+" },
  { label: "Support Available", value: 24, suffix: "/7" },
];
