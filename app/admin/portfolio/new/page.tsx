"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/components/admin/Toast";
import PortfolioForm from "@/components/admin/PortfolioForm";
import type { PortfolioProject } from "@/lib/admin/types";

const emptyProject: Omit<PortfolioProject, "id"> = {
  title: "",
  category: "",
  description: "",
  tech: [],
  clientName: "",
  completionDate: "",
  liveUrl: "",
  githubUrl: "",
  caseStudy: {
    overview: "",
    goals: [],
    designProcess: "",
    uiDecisions: [],
    features: [],
    challenges: [],
    results: [],
  },
  thumbnailUrl: "",
  galleryUrls: [],
  featured: false,
  status: "draft",
  order: 0,
  slug: "",
};

export default function NewPortfolioProjectPage() {
  const router = useRouter();
  const { show } = useToast();
  const [form, setForm] = useState<Omit<PortfolioProject, "id">>(emptyProject);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      show("Title and URL slug are required.", "error");
      return;
    }
    setSaving(true);
    try {
      await addDoc(collection(db, "portfolio"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      show("Project created");
      router.push("/admin/portfolio");
    } catch (err) {
      console.error(err);
      show("Something went wrong saving this project.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl pb-16">
      <Link href="/admin/portfolio" className="inline-flex items-center gap-2 text-sm text-mist-500 hover:text-white">
        <ArrowLeft className="h-4 w-4" />
        Back to Portfolio
      </Link>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-white">New Project</h2>
        <button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving..." : "Save Project"}
        </button>
      </div>

      <div className="mt-8">
        <PortfolioForm form={form} setForm={setForm} />
      </div>
    </div>
  );
}
