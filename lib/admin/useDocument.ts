"use client";

import { useCallback, useEffect, useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * Generic hook for single-document settings collections (contact info, SEO,
 * site settings, site content). Each of these lives at a fixed path like
 * settings/contact so there's exactly one record, not a list.
 */
export function useDocument<T extends object>(path: string, defaults: T) {
  const [data, setData] = useState<T>(defaults);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const snap = await getDoc(doc(db, path));
      if (snap.exists()) {
        setData({ ...defaults, ...(snap.data() as T) });
      } else {
        setData(defaults);
      }
    } catch (err) {
      console.error(`Failed to load ${path}:`, err);
      setError("Failed to load this data. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const save = useCallback(
    async (next: T) => {
      await setDoc(doc(db, path), { ...next, updatedAt: serverTimestamp() }, { merge: true });
      setData(next);
    },
    [path]
  );

  return { data, setData, loading, error, save, refetch };
}
