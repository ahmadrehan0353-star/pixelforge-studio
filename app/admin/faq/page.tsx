"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { useCollection } from "@/lib/admin/useCollection";
import { useToast } from "@/components/admin/Toast";
import SlideOver from "@/components/admin/SlideOver";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import FormField from "@/components/admin/FormField";
import type { FaqItem } from "@/lib/admin/types";

const emptyItem: Omit<FaqItem, "id"> = { question: "", answer: "", order: 0 };

export default function FaqManagerPage() {
  const { items, loading, add, update, remove, reorder } = useCollection<FaqItem>("faq");
  const { show } = useToast();
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const [form, setForm] = useState<Omit<FaqItem, "id">>(emptyItem);
  const [open, setOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<FaqItem | null>(null);
  const [saving, setSaving] = useState(false);

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyItem, order: items.length });
    setOpen(true);
  };

  const openEdit = (item: FaqItem) => {
    setEditing(item);
    setForm(item);
    setOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing?.id) {
        await update(editing.id, form);
        show("FAQ updated");
      } else {
        await add(form);
        show("FAQ added");
      }
      setOpen(false);
    } catch (err) {
      console.error(err);
      show("Something went wrong saving this FAQ.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    try {
      await remove(deleteTarget.id);
      show("FAQ deleted");
    } catch (err) {
      console.error(err);
      show("Couldn't delete this FAQ.", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  const move = async (item: FaqItem, dir: -1 | 1) => {
    const idx = items.findIndex((i) => i.id === item.id);
    const target = items[idx + dir];
    if (!target || !item.id || !target.id) return;
    await Promise.all([reorder(item.id, target.order), reorder(target.id, item.order)]);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-mist-500">Frequently asked questions shown on your website.</p>
        <button onClick={openNew} className="btn-primary">
          <Plus className="h-4 w-4" />
          Add FAQ
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="card animate-pulse text-sm text-mist-700">Loading...</div>
        ) : items.length === 0 ? (
          <div className="card text-center text-sm text-mist-500">No FAQs yet.</div>
        ) : (
          items.map((item, i) => (
            <div key={item.id} className="card flex items-center gap-4 py-4">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-white">{item.question}</p>
                <p className="truncate text-xs text-mist-500">{item.answer}</p>
              </div>
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
        title={editing ? "Edit FAQ" : "Add FAQ"}
        footer={
          <>
            <button onClick={() => setOpen(false)} className="btn-secondary px-5 py-2 text-sm">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !form.question}
              className="btn-primary px-5 py-2 text-sm disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </>
        }
      >
        <div className="space-y-5">
          <FormField label="Question">
            <input
              className="input"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
            />
          </FormField>
          <FormField label="Answer">
            <textarea
              className="input resize-none"
              rows={5}
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
            />
          </FormField>
        </div>
      </SlideOver>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this FAQ?"
        description={`"${deleteTarget?.question}" will be permanently removed.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
