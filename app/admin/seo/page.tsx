"use client";

import { useEffect, useState } from "react";
import { useDocument } from "@/lib/admin/useDocument";
import { useToast } from "@/components/admin/Toast";
import FormField from "@/components/admin/FormField";
import ImageUploader from "@/components/admin/ImageUploader";
import { defaultSeo as defaults } from "@/lib/admin/defaultContent";
import type { SeoSettings } from "@/lib/admin/types";

export default function SeoManagerPage() {
  const { data, loading, save } = useDocument<SeoSettings>("settings/seo", defaults);
  const { show } = useToast();
  const [form, setForm] = useState<SeoSettings>(data);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading) setForm(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await save(form);
      show("SEO settings updated");
    } catch (err) {
      console.error(err);
      show("Something went wrong saving this.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-sm text-mist-500">Loading...</div>;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-mist-500">
          Controls how your site appears in search results and link previews.
        </p>
        <button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="mt-6 space-y-5">
        <FormField label="Website Title">
          <input
            className="input"
            value={form.websiteTitle}
            onChange={(e) => setForm({ ...form, websiteTitle: e.target.value })}
          />
        </FormField>
        <FormField label="Meta Description" hint="Shown under your title in search results">
          <textarea
            className="input resize-none"
            rows={3}
            value={form.metaDescription}
            onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
          />
        </FormField>
        <FormField label="Keywords" hint="Comma-separated">
          <input
            className="input"
            value={form.keywords}
            onChange={(e) => setForm({ ...form, keywords: e.target.value })}
          />
        </FormField>
        <FormField label="Open Graph Image" hint="Shown when your site is shared on social media">
          <ImageUploader
            value={form.ogImageUrl}
            onChange={(url) => setForm({ ...form, ogImageUrl: url })}
            folder="seo"
          />
        </FormField>
        <FormField label="Favicon">
          <ImageUploader
            value={form.faviconUrl}
            onChange={(url) => setForm({ ...form, faviconUrl: url })}
            folder="seo"
          />
        </FormField>
        <FormField label="Google Analytics ID" hint="e.g. G-XXXXXXXXXX">
          <input
            className="input"
            value={form.googleAnalyticsId}
            onChange={(e) => setForm({ ...form, googleAnalyticsId: e.target.value })}
          />
        </FormField>
      </div>
    </div>
  );
}
