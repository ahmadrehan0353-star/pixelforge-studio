"use client";

import FormField from "@/components/admin/FormField";
import TagInput from "@/components/admin/TagInput";
import ImageUploader from "@/components/admin/ImageUploader";
import type { PortfolioProject } from "@/lib/admin/types";

export default function PortfolioForm({
  form,
  setForm,
}: {
  form: Omit<PortfolioProject, "id">;
  setForm: (f: Omit<PortfolioProject, "id">) => void;
}) {
  const setCase = (patch: Partial<PortfolioProject["caseStudy"]>) =>
    setForm({ ...form, caseStudy: { ...form.caseStudy, ...patch } });

  return (
    <div className="space-y-10">
      <section className="space-y-5">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-mist-500">Basics</h3>
        <FormField label="Project Title">
          <input
            className="input"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </FormField>
        <FormField label="URL Slug" hint="Used in the case study link, e.g. /portfolio/your-slug">
          <input
            className="input"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />
        </FormField>
        <FormField label="Category">
          <input
            className="input"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </FormField>
        <FormField label="Description">
          <textarea
            className="input resize-none"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </FormField>
        <FormField label="Technologies Used">
          <TagInput values={form.tech} onChange={(tech) => setForm({ ...form, tech })} />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Client Name (optional)">
            <input
              className="input"
              value={form.clientName ?? ""}
              onChange={(e) => setForm({ ...form, clientName: e.target.value })}
            />
          </FormField>
          <FormField label="Completion Date">
            <input
              type="date"
              className="input"
              value={form.completionDate ?? ""}
              onChange={(e) => setForm({ ...form, completionDate: e.target.value })}
            />
          </FormField>
          <FormField label="Live Website URL">
            <input
              className="input"
              value={form.liveUrl ?? ""}
              onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
            />
          </FormField>
          <FormField label="GitHub URL">
            <input
              className="input"
              value={form.githubUrl ?? ""}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
            />
          </FormField>
        </div>
      </section>

      <section className="space-y-5">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-mist-500">Images</h3>
        <FormField label="Thumbnail">
          <ImageUploader
            value={form.thumbnailUrl}
            onChange={(url) => setForm({ ...form, thumbnailUrl: url })}
            folder="portfolio"
          />
        </FormField>
        <FormField label="Gallery Images" hint="Upload one at a time; each upload adds to the gallery">
          <div className="space-y-3">
            {form.galleryUrls.map((url, i) => (
              <div key={i} className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-14 w-20 rounded-lg object-cover" />
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      galleryUrls: form.galleryUrls.filter((_, idx) => idx !== i),
                    })
                  }
                  className="text-xs text-red-400 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
            <ImageUploader
              onChange={(url) => setForm({ ...form, galleryUrls: [...form.galleryUrls, url] })}
              folder="portfolio"
            />
          </div>
        </FormField>
      </section>

      <section className="space-y-5">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-mist-500">Case Study</h3>
        <FormField label="Overview">
          <textarea
            className="input resize-none"
            rows={3}
            value={form.caseStudy.overview}
            onChange={(e) => setCase({ overview: e.target.value })}
          />
        </FormField>
        <FormField label="Goals">
          <TagInput values={form.caseStudy.goals} onChange={(goals) => setCase({ goals })} />
        </FormField>
        <FormField label="Design Process">
          <textarea
            className="input resize-none"
            rows={3}
            value={form.caseStudy.designProcess}
            onChange={(e) => setCase({ designProcess: e.target.value })}
          />
        </FormField>
        <FormField label="UI Decisions">
          <TagInput
            values={form.caseStudy.uiDecisions}
            onChange={(uiDecisions) => setCase({ uiDecisions })}
          />
        </FormField>
        <FormField label="Features">
          <TagInput
            values={form.caseStudy.features}
            onChange={(features) => setCase({ features })}
          />
        </FormField>
        <FormField label="Results">
          <TagInput values={form.caseStudy.results} onChange={(results) => setCase({ results })} />
        </FormField>
      </section>

      <section className="space-y-5">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-mist-500">Publishing</h3>
        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 text-sm text-mist-300">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="h-4 w-4 rounded border-white/20 bg-white/5"
            />
            Featured project
          </label>
          <FormField label="Status">
            <select
              className="input"
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as PortfolioProject["status"] })
              }
            >
              <option value="published" className="bg-ink-800">Published</option>
              <option value="draft" className="bg-ink-800">Draft</option>
            </select>
          </FormField>
        </div>
      </section>
    </div>
  );
}
