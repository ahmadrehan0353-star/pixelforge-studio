"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/components/admin/Toast";
import PortfolioForm from "@/components/admin/PortfolioForm";
import type { PortfolioProject } from "@/lib/admin/types";

export default function EditPortfolioProjectPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { show } = useToast();
  const [form, setForm] = useState<Omit<PortfolioProject, "id"> | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(doc(db, "portfolio", id));
        if (snap.exists()) {
          setForm(snap.data() as Omit<PortfolioProject, "id">);
        } else {
          show("Project not found.", "error");
          router.push("/admin/portfolio");
        }
      } catch (err) {
        console.error(err);
        show("Failed to load this project.", "error");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "portfolio", id), {
        ...form,
        updatedAt: serverTimestamp(),
      });
      show("Project updated");
      router.push("/admin/portfolio");
    } catch (err) {
      console.error(err);
      show("Something went wrong saving this project.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) {
    return <div className="text-sm text-mist-500">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl pb-16">
      <Link href="/admin/portfolio" className="inline-flex items-center gap-2 text-sm text-mist-500 hover:text-white">
        <ArrowLeft className="h-4 w-4" />
        Back to Portfolio
      </Link>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-white">Edit Project</h2>
        <button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="mt-8">
        <PortfolioForm form={form} setForm={setForm} />
      </div>
    </div>
  );
}
