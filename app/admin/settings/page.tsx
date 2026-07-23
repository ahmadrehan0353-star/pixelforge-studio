"use client";

import { useEffect, useState } from "react";
import { useDocument } from "@/lib/admin/useDocument";
import { useToast } from "@/components/admin/Toast";
import FormField from "@/components/admin/FormField";
import ImageUploader from "@/components/admin/ImageUploader";
import type { SiteSettings } from "@/lib/admin/types";

const defaults: SiteSettings = {
  websiteName: "PixelForge Studio",
  logoUrl: "",
  primaryColor: "#6D5EF5",
  secondaryColor: "#4CD9E8",
  accentColor: "#FF7A45",
  defaultTheme: "dark",
};

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <FormField label={label}>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-14 cursor-pointer rounded-lg border border-white/[0.08] bg-transparent"
        />
        <input className="input" value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </FormField>
  );
}

export default function SettingsPage() {
  const { data, loading, save } = useDocument<SiteSettings>("settings/site", defaults);
  const { show } = useToast();
  const [form, setForm] = useState<SiteSettings>(data);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading) setForm(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await save(form);
      show("Settings updated");
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
        <p className="text-sm text-mist-500">Branding and theme for your website.</p>
        <button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="mt-6 space-y-5">
        <FormField label="Website Name">
          <input
            className="input"
            value={form.websiteName}
            onChange={(e) => setForm({ ...form, websiteName: e.target.value })}
          />
        </FormField>
        <FormField label="Logo">
          <ImageUploader
            value={form.logoUrl}
            onChange={(url) => setForm({ ...form, logoUrl: url })}
            folder="branding"
          />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-3">
          <ColorField
            label="Primary Color"
            value={form.primaryColor}
            onChange={(v) => setForm({ ...form, primaryColor: v })}
          />
          <ColorField
            label="Secondary Color"
            value={form.secondaryColor}
            onChange={(v) => setForm({ ...form, secondaryColor: v })}
          />
          <ColorField
            label="Accent Color"
            value={form.accentColor}
            onChange={(v) => setForm({ ...form, accentColor: v })}
          />
        </div>

        <FormField label="Default Theme">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setForm({ ...form, defaultTheme: "dark" })}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                form.defaultTheme === "dark"
                  ? "border-forge-cyan/50 bg-forge-cyan/10 text-white"
                  : "border-white/[0.08] text-mist-500 hover:text-white"
              }`}
            >
              Dark Mode
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, defaultTheme: "light" })}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                form.defaultTheme === "light"
                  ? "border-forge-cyan/50 bg-forge-cyan/10 text-white"
                  : "border-white/[0.08] text-mist-500 hover:text-white"
              }`}
            >
              Light Mode
            </button>
          </div>
        </FormField>

        <p className="text-xs text-mist-700">
          Note: theme colors are stored here for reference and future use. The current site
          template uses a fixed dark palette — applying these values live across the site is a
          further step we can wire up if you&apos;d like it.
        </p>
      </div>
    </div>
  );
}
