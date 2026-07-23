"use client";

import { useEffect, useState } from "react";
import { useDocument } from "@/lib/admin/useDocument";
import { useToast } from "@/components/admin/Toast";
import FormField from "@/components/admin/FormField";
import TagInput from "@/components/admin/TagInput";
import { defaultSiteContent as defaults } from "@/lib/admin/defaultContent";
import type { SiteContent } from "@/lib/admin/types";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "stats", label: "Statistics" },
  { id: "about", label: "About Section" },
  { id: "why", label: "Why Choose Us" },
  { id: "process", label: "Process Steps" },
  { id: "cta", label: "CTA Section" },
  { id: "footer", label: "Footer" },
] as const;

export default function WebsiteContentPage() {
  const { data, loading, save } = useDocument<SiteContent>("settings/content", defaults);
  const { show } = useToast();
  const [form, setForm] = useState<SiteContent>(data);
  const [saving, setSaving] = useState(false);
  const [active, setActive] = useState<(typeof sections)[number]["id"]>("hero");

  useEffect(() => {
    if (!loading) setForm(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await save(form);
      show("Website content updated");
    } catch (err) {
      console.error(err);
      show("Something went wrong saving this.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-sm text-mist-500">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-mist-500">
          Edits here update automatically across your live website.
        </p>
        <button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === s.id
                ? "bg-forge-gradient text-white"
                : "border border-white/[0.08] text-mist-500 hover:text-white"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-6 max-w-2xl space-y-5">
        {active === "hero" && (
          <>
            <FormField label="Headline">
              <input
                className="input"
                value={form.hero.headline}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, headline: e.target.value } })}
              />
            </FormField>
            <FormField label="Subheadline">
              <textarea
                className="input resize-none"
                rows={3}
                value={form.hero.subheadline}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, subheadline: e.target.value } })}
              />
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Primary Button Text">
                <input
                  className="input"
                  value={form.hero.primaryButtonText}
                  onChange={(e) =>
                    setForm({ ...form, hero: { ...form.hero, primaryButtonText: e.target.value } })
                  }
                />
              </FormField>
              <FormField label="Secondary Button Text">
                <input
                  className="input"
                  value={form.hero.secondaryButtonText}
                  onChange={(e) =>
                    setForm({ ...form, hero: { ...form.hero, secondaryButtonText: e.target.value } })
                  }
                />
              </FormField>
            </div>
          </>
        )}

        {active === "stats" && (
          <div className="space-y-4">
            {form.stats.map((stat, i) => (
              <div key={i} className="card grid grid-cols-3 gap-3 py-4">
                <FormField label="Label">
                  <input
                    className="input"
                    value={stat.label}
                    onChange={(e) => {
                      const stats = [...form.stats];
                      stats[i] = { ...stat, label: e.target.value };
                      setForm({ ...form, stats });
                    }}
                  />
                </FormField>
                <FormField label="Value">
                  <input
                    type="number"
                    className="input"
                    value={stat.value}
                    onChange={(e) => {
                      const stats = [...form.stats];
                      stats[i] = { ...stat, value: Number(e.target.value) };
                      setForm({ ...form, stats });
                    }}
                  />
                </FormField>
                <FormField label="Suffix">
                  <input
                    className="input"
                    value={stat.suffix}
                    onChange={(e) => {
                      const stats = [...form.stats];
                      stats[i] = { ...stat, suffix: e.target.value };
                      setForm({ ...form, stats });
                    }}
                  />
                </FormField>
              </div>
            ))}
          </div>
        )}

        {active === "about" && (
          <>
            <FormField label="Mission">
              <textarea className="input resize-none" rows={2} value={form.about.mission} onChange={(e) => setForm({ ...form, about: { ...form.about, mission: e.target.value } })} />
            </FormField>
            <FormField label="Vision">
              <textarea className="input resize-none" rows={2} value={form.about.vision} onChange={(e) => setForm({ ...form, about: { ...form.about, vision: e.target.value } })} />
            </FormField>
            <FormField label="Values">
              <textarea className="input resize-none" rows={2} value={form.about.values} onChange={(e) => setForm({ ...form, about: { ...form.about, values: e.target.value } })} />
            </FormField>
            <FormField label="Design Philosophy">
              <textarea className="input resize-none" rows={2} value={form.about.designPhilosophy} onChange={(e) => setForm({ ...form, about: { ...form.about, designPhilosophy: e.target.value } })} />
            </FormField>
            <FormField label="Our Story">
              <textarea className="input resize-none" rows={4} value={form.about.story} onChange={(e) => setForm({ ...form, about: { ...form.about, story: e.target.value } })} />
            </FormField>
          </>
        )}

        {active === "why" && (
          <FormField label="Why Choose Us Items">
            <TagInput
              values={form.whyChooseUs}
              onChange={(whyChooseUs) => setForm({ ...form, whyChooseUs })}
            />
          </FormField>
        )}

        {active === "process" && (
          <div className="space-y-4">
            {form.process.map((step, i) => (
              <div key={i} className="card space-y-3 py-4">
                <FormField label={`Step ${i + 1} Title`}>
                  <input
                    className="input"
                    value={step.title}
                    onChange={(e) => {
                      const process = [...form.process];
                      process[i] = { ...step, title: e.target.value };
                      setForm({ ...form, process });
                    }}
                  />
                </FormField>
                <FormField label="Description">
                  <textarea
                    className="input resize-none"
                    rows={2}
                    value={step.description}
                    onChange={(e) => {
                      const process = [...form.process];
                      process[i] = { ...step, description: e.target.value };
                      setForm({ ...form, process });
                    }}
                  />
                </FormField>
              </div>
            ))}
          </div>
        )}

        {active === "cta" && (
          <>
            <FormField label="Headline">
              <input
                className="input"
                value={form.ctaFreeMockup.headline}
                onChange={(e) =>
                  setForm({ ...form, ctaFreeMockup: { ...form.ctaFreeMockup, headline: e.target.value } })
                }
              />
            </FormField>
            <FormField label="Text">
              <textarea
                className="input resize-none"
                rows={3}
                value={form.ctaFreeMockup.text}
                onChange={(e) =>
                  setForm({ ...form, ctaFreeMockup: { ...form.ctaFreeMockup, text: e.target.value } })
                }
              />
            </FormField>
            <FormField label="Button Text">
              <input
                className="input"
                value={form.ctaFreeMockup.buttonText}
                onChange={(e) =>
                  setForm({
                    ...form,
                    ctaFreeMockup: { ...form.ctaFreeMockup, buttonText: e.target.value },
                  })
                }
              />
            </FormField>
          </>
        )}

        {active === "footer" && (
          <FormField label="Footer Tagline">
            <textarea
              className="input resize-none"
              rows={3}
              value={form.footer.tagline}
              onChange={(e) => setForm({ ...form, footer: { ...form.footer, tagline: e.target.value } })}
            />
          </FormField>
        )}
      </div>
    </div>
  );
}
