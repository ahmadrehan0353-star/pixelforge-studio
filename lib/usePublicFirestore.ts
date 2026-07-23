"use client";

import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * Fetches a published/enabled list collection for the public site, falling
 * back to static defaults if Firestore is empty or the read fails. This
 * keeps the live site always showing *something* correct, even before the
 * admin has entered any content, or if Firestore is briefly unreachable.
 */
export function usePublicCollection<T extends { id?: string; order?: number }>(
  collectionName: string,
  fallback: T[],
  publishedField?: keyof T
) {
  const [items, setItems] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const q = query(collection(db, collectionName), orderBy("order", "asc"));
        const snap = await getDocs(q);
        if (cancelled) return;
        if (snap.empty) {
          setItems(fallback);
        } else {
          let docs = snap.docs.map((d) => ({ id: d.id, ...(d.data() as object) } as T));
          if (publishedField) {
            docs = docs.filter((d) => d[publishedField] === true || d[publishedField] === "published");
          }
          setItems(docs.length ? docs : fallback);
        }
      } catch (err) {
        console.error(`Failed to load ${collectionName}, using defaults:`, err);
        if (!cancelled) setItems(fallback);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName]);

  return { items, loading };
}

/** Fetches a single settings document, falling back to static defaults. */
export function usePublicDocument<T extends object>(path: string, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDoc(doc(db, path));
        if (cancelled) return;
        setData(snap.exists() ? ({ ...fallback, ...(snap.data() as T) }) : fallback);
      } catch (err) {
        console.error(`Failed to load ${path}, using defaults:`, err);
        if (!cancelled) setData(fallback);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return { data, loading };
}

/** Looks up a single portfolio project by slug, falling back to a static match. */
export async function fetchPortfolioBySlug<T extends { slug: string }>(
  slug: string,
  fallback: T[]
): Promise<T | undefined> {
  try {
    const q = query(collection(db, "portfolio"), where("slug", "==", slug));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const d = snap.docs[0];
      return { id: d.id, ...(d.data() as object) } as unknown as T;
    }
  } catch (err) {
    console.error("Failed to load portfolio project, using defaults:", err);
  }
  return fallback.find((p) => p.slug === slug);
}
