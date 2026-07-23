# PixelForge Studio

A premium web design agency website built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> Note: the build fetches Inter, Outfit, and JetBrains Mono from Google Fonts at build time via `next/font/google`, so an internet connection is required for `npm run build` / `npm run dev`.

## Project Structure

```
app/
  layout.tsx            Root layout, fonts, global SEO metadata, JSON-LD
  page.tsx               Home page
  portfolio/
    page.tsx              Portfolio listing
    [slug]/page.tsx        Dynamic case-study template (Karvo, Ameer Clothing)
  services/page.tsx
  pricing/page.tsx
  about/page.tsx
  contact/page.tsx
  privacy-policy/page.tsx
  terms/page.tsx
  sitemap.ts / robots.ts  SEO
components/
  sections/               Homepage/section-level building blocks
  Navbar.tsx, Footer.tsx, PageHeader.tsx, ContactForm.tsx, etc.
lib/
  data.ts                 All site content (services, projects, pricing, FAQ, testimonials)
```

## Editing Content

Nearly all text content — services, pricing plans, FAQs, testimonials, and the two portfolio case studies — lives in `lib/data.ts`. Update it there and it flows through every page automatically.

## Replacing Sample Content

- **Testimonials** in `lib/data.ts` are clearly labeled as samples — swap in real client reviews when available.
- **Contact form** (`components/ContactForm.tsx`) currently simulates a submission. Wire the `handleSubmit` function to your email service, form endpoint, or CRM.
- **Social links** (WhatsApp, email, Instagram, GitHub) live in `components/Footer.tsx` and `app/contact/page.tsx` — update with real handles/numbers.
- **Device mockup previews** (`components/DeviceMockup.tsx`) use abstract placeholder UI. Swap in real screenshots of Karvo and Ameer Clothing using `next/image` for a more literal preview if you'd like.

## Deployment

This project deploys cleanly to Vercel:

```bash
npm run build
npm run start
```

Or connect the repository to Vercel for automatic builds on push.
