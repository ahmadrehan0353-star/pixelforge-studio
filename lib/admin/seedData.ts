import { collection, getDocs, doc, getDoc, setDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  defaultServices,
  defaultPortfolio,
  defaultPricing,
  defaultTestimonials,
  defaultFaqs,
  defaultContactInfo,
  defaultSeo,
  defaultSiteSettings,
  defaultSiteContent,
} from "@/lib/admin/defaultContent";

type SeedResult = {
  imported: string[];
  skipped: string[];
};

async function seedCollectionIfEmpty(
  name: string,
  items: object[],
  label: string,
  result: SeedResult
) {
  const snap = await getDocs(collection(db, name));
  if (!snap.empty) {
    result.skipped.push(label);
    return;
  }
  await Promise.all(
    items.map((item) => addDoc(collection(db, name), { ...item, createdAt: serverTimestamp() }))
  );
  result.imported.push(label);
}

async function seedDocIfMissing(path: string, data: object, label: string, result: SeedResult) {
  const snap = await getDoc(doc(db, path));
  if (snap.exists()) {
    result.skipped.push(label);
    return;
  }
  await setDoc(doc(db, path), { ...data, updatedAt: serverTimestamp() });
  result.imported.push(label);
}

/**
 * Imports the website's existing hardcoded content into Firestore, so it
 * shows up as real, editable entries in the dashboard. Safe to run more
 * than once — anything that already has data in Firestore is left alone,
 * only genuinely empty collections/documents get filled in.
 */
export async function seedInitialContent(): Promise<SeedResult> {
  const result: SeedResult = { imported: [], skipped: [] };

  await Promise.all([
    seedCollectionIfEmpty("services", defaultServices, "Services", result),
    seedCollectionIfEmpty("portfolio", defaultPortfolio, "Portfolio", result),
    seedCollectionIfEmpty("pricing", defaultPricing, "Pricing Plans", result),
    seedCollectionIfEmpty("testimonials", defaultTestimonials, "Testimonials", result),
    seedCollectionIfEmpty("faq", defaultFaqs, "FAQ", result),
    seedDocIfMissing("settings/contact", defaultContactInfo, "Contact Information", result),
    seedDocIfMissing("settings/seo", defaultSeo, "SEO Settings", result),
    seedDocIfMissing("settings/site", defaultSiteSettings, "Site Settings", result),
    seedDocIfMissing("settings/content", defaultSiteContent, "Website Content", result),
  ]);

  return result;
}
