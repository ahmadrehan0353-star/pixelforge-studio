"use client";

import { useEffect, useState } from "react";
import { useDocument } from "@/lib/admin/useDocument";
import { useToast } from "@/components/admin/Toast";
import FormField from "@/components/admin/FormField";
import type { ContactInfo } from "@/lib/admin/types";

const defaults: ContactInfo = {
  phone: "",
  whatsapp: "",
  email: "",
  address: "",
  googleMapsUrl: "",
  instagram: "",
  facebook: "",
  linkedin: "",
  github: "",
  workingHours: "",
};

export default function ContactInfoPage() {
  const { data, loading, save } = useDocument<ContactInfo>("settings/contact", defaults);
  const { show } = useToast();
  const [form, setForm] = useState<ContactInfo>(data);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading) setForm(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await save(form);
      show("Contact information updated");
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
        <p className="text-sm text-mist-500">Shown in your footer and Contact page.</p>
        <button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <FormField label="Phone">
          <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </FormField>
        <FormField label="WhatsApp">
          <input className="input" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
        </FormField>
        <FormField label="Email">
          <input className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </FormField>
        <FormField label="Working Hours">
          <input className="input" value={form.workingHours} onChange={(e) => setForm({ ...form, workingHours: e.target.value })} placeholder="Mon–Fri, 9am–6pm" />
        </FormField>
        <FormField label="Business Address" hint="Full address">
          <input className="input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </FormField>
        <FormField label="Google Maps URL">
          <input className="input" value={form.googleMapsUrl} onChange={(e) => setForm({ ...form, googleMapsUrl: e.target.value })} />
        </FormField>
        <FormField label="Instagram">
          <input className="input" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} />
        </FormField>
        <FormField label="Facebook">
          <input className="input" value={form.facebook} onChange={(e) => setForm({ ...form, facebook: e.target.value })} />
        </FormField>
        <FormField label="LinkedIn">
          <input className="input" value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
        </FormField>
        <FormField label="GitHub">
          <input className="input" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} />
        </FormField>
      </div>
    </div>
  );
}
