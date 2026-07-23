"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Star } from "lucide-react";
import { useCollection } from "@/lib/admin/useCollection";
import { useToast } from "@/components/admin/Toast";
import SlideOver from "@/components/admin/SlideOver";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import FormField from "@/components/admin/FormField";
import ImageUploader from "@/components/admin/ImageUploader";
import type { Testimonial } from "@/lib/admin/types";

const emptyItem: Omit<Testimonial, "id"> = {
  name: "",
  company: "",
  review: "",
  rating: 5,
  photoUrl: "",
  published: true,
  order: 0,
};

export default function TestimonialsManagerPage() {
  const { items, loading, add, update, remove, reorder } =
    useCollection<Testimonial>("testimonials");
  const { show } = useToast();
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<Omit<Testimonial, "id">>(emptyItem);
  const [open, setOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyItem, order: items.length });
    setOpen(true);
  };

  const openEdit = (item: Testimonial) => {
    setEditing(item);
    setForm(item);
    setOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing?.id) {
        await update(editing.id, form);
        show("Testimonial updated");
      } else {
        await add(form);
        show("Testimonial added");
      }
      setOpen(false);
    } catch (err) {
      console.error(err);
      show("Something went wrong saving this testimonial.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    try {
      await remove(deleteTarget.id);
      show("Testimonial deleted");
    } catch (err) {
      console.error(err);
      show("Couldn't delete this testimonial.", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  const move = async (item: Testimonial, dir: -1 | 1) => {
    const idx = items.findIndex((i) => i.id === item.id);
    const target = items[idx + dir];
    if (!target || !item.id || !target.id) return;
    await Promise.all([reorder(item.id, target.order), reorder(target.id, item.order)]);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-mist-500">Client reviews shown in the homepage slider.</p>
        <button onClick={openNew} className="btn-primary">
          <Plus className="h-4 w-4" />
          Add Testimonial
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="card animate-pulse text-sm text-mist-700">Loading...</div>
        ) : items.length === 0 ? (
          <div className="card text-center text-sm text-mist-500">No testimonials yet.</div>
        ) : (
          items.map((item, i) => (
            <div key={item.id} className="card flex items-center gap-4 py-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.photoUrl || "https://api.dicebear.com/7.x/initials/svg?seed=" + item.name}
                alt=""
                className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-white">{item.name}</p>
                <p className="truncate text-xs text-mist-500">
                  {item.company} · {"★".repeat(item.rating)}
                </p>
              </div>
              <span
                className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  item.published
                    ? "bg-emerald-400/10 text-emerald-400"
                    : "bg-white/[0.06] text-mist-500"
                }`}
              >
                {item.published ? "Published" : "Hidden"}
              </span>
              <div className="flex flex-shrink-0 items-center gap-1">
                <button onClick={() => move(item, -1)} disabled={i === 0} className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-500 hover:bg-white/[0.06] hover:text-white disabled:opacity-30">
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => move(item, 1)} disabled={i === items.length - 1} className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-500 hover:bg-white/[0.06] hover:text-white disabled:opacity-30">
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => openEdit(item)} className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-500 hover:bg-white/[0.06] hover:text-white">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => setDeleteTarget(item)} className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-500 hover:bg-red-400/10 hover:text-red-400">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <SlideOver
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit Testimonial" : "Add Testimonial"}
        footer={
          <>
            <button onClick={() => setOpen(false)} className="btn-secondary px-5 py-2 text-sm">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !form.name}
              className="btn-primary px-5 py-2 text-sm disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </>
        }
      >
        <div className="space-y-5">
          <FormField label="Profile Photo">
            <ImageUploader
              value={form.photoUrl}
              onChange={(url) => setForm({ ...form, photoUrl: url })}
              folder="testimonials"
            />
          </FormField>
          <FormField label="Client Name">
            <input
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </FormField>
          <FormField label="Company">
            <input
              className="input"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
          </FormField>
          <FormField label="Review">
            <textarea
              className="input resize-none"
              rows={4}
              value={form.review}
              onChange={(e) => setForm({ ...form, review: e.target.value })}
            />
          </FormField>
          <FormField label="Rating">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm({ ...form, rating: n })}
                  className="p-0.5"
                >
                  <Star
                    className={`h-6 w-6 ${
                      n <= form.rating ? "fill-forge-ember text-forge-ember" : "text-mist-700"
                    }`}
                  />
                </button>
              ))}
            </div>
          </FormField>
          <label className="flex items-center gap-2 text-sm text-mist-300">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="h-4 w-4 rounded border-white/20 bg-white/5"
            />
            Published
          </label>
        </div>
      </SlideOver>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this testimonial?"
        description={`The review from "${deleteTarget?.name}" will be permanently removed.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
