"use client";

import { useCallback, useEffect, useState } from "react";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * Generic hook for list-style Firestore collections used throughout the
 * admin dashboard (portfolio, services, pricing, testimonials, faq, team).
 * Fetch-on-mount + manual refetch, rather than a live snapshot listener,
 * keeps reads (and therefore Firestore cost) predictable for a small
 * single-admin CMS like this one.
 */
export function useCollection<T extends { id?: string; order?: number }>(
  collectionName: string,
  orderField = "order"
) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const q = query(collection(db, collectionName), orderBy(orderField, "asc"));
      const snap = await getDocs(q);
      setItems(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as object) } as T))
      );
    } catch (err) {
      console.error(`Failed to load ${collectionName}:`, err);
      setError("Failed to load data. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [collectionName, orderField]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const add = useCallback(
    async (data: Omit<T, "id">) => {
      await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
      });
      await refetch();
    },
    [collectionName, refetch]
  );

  const update = useCallback(
    async (id: string, data: Partial<T>) => {
      await updateDoc(doc(db, collectionName, id), {
        ...data,
        updatedAt: serverTimestamp(),
      });
      await refetch();
    },
    [collectionName, refetch]
  );

  const remove = useCallback(
    async (id: string) => {
      await deleteDoc(doc(db, collectionName, id));
      await refetch();
    },
    [collectionName, refetch]
  );

  const reorder = useCallback(
    async (id: string, newOrder: number) => {
      await updateDoc(doc(db, collectionName, id), { order: newOrder });
      await refetch();
    },
    [collectionName, refetch]
  );

  return { items, loading, error, refetch, add, update, remove, reorder };
}
