"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Wrench } from "lucide-react";
import { useCollection } from "@/lib/admin/useCollection";
import { useToast } from "@/components/admin/Toast";
import SlideOver from "@/components/admin/SlideOver";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import FormField from "@/components/admin/FormField";
import TagInput from "@/components/admin/TagInput";
import type { Service } from "@/lib/admin/types";

const emptyService: Omit<Service, "id"> = {
  title: "",
  description: "",
  icon: "Briefcase",
  features: [],
  price: "",
  order: 0,
  status: "published",
};

export default function ServicesManagerPage() {
  const { items, loading, add, update, remove, reorder } = useCollection<Service>("services");
  const { show } = useToast();
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<Omit<Service, "id">>(emptyService);
  const [open, setOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyService, order: items.length });
    setOpen(true);
  };

  const openEdit = (item: Service) => {
    setEditing(item);
    setForm(item);
    setOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing?.id) {
        await update(editing.id, form);
        show("Service updated");
      } else {
        await add(form);
        show("Service added");
      }
      setOpen(false);
    } catch (err) {
      console.error(err);
      show("Something went wrong saving this service.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    try {
      await remove(deleteTarget.id);
      show("Service deleted");
    } catch (err) {
      console.error(err);
      show("Couldn't delete this service.", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  const move = async (item: Service, dir: -1 | 1) => {
    const idx = items.findIndex((i) => i.id === item.id);
    const target = items[idx + dir];
    if (!target || !item.id || !target.id) return;
    await Promise.all([reorder(item.id, target.order), reorder(target.id, item.order)]);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-mist-500">
          These appear on your Services page and homepage, in this order.
        </p>
        <button onClick={openNew} className="btn-primary">
          <Plus className="h-4 w-4" />
          Add Service
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="card animate-pulse text-sm text-mist-700">Loading...</div>
        ) : items.length === 0 ? (
          <div className="card text-center text-sm text-mist-500">
            No services yet. Click &quot;Add Service&quot; to create your first one.
          </div>
        ) : (
          items.map((item, i) => (
            <div key={item.id} className="card flex items-center gap-4 py-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-forge-gradient/20 ring-1 ring-white/[0.08]">
                <Wrench className="h-4 w-4 text-forge-cyan" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-white">{item.title}</p>
                <p className="truncate text-xs text-mist-500">{item.description}</p>
              </div>
              <span
                className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  item.status === "published"
                    ? "bg-emerald-400/10 text-emerald-400"
                    : "bg-white/[0.06] text-mist-500"
                }`}
              >
                {item.status}
              </span>
              <div className="flex flex-shrink-0 items-center gap-1">
                <button
                  onClick={() => move(item, -1)}
                  disabled={i === 0}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-500 hover:bg-white/[0.06] hover:text-white disabled:opacity-30"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => move(item, 1)}
                  disabled={i === items.length - 1}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-500 hover:bg-white/[0.06] hover:text-white disabled:opacity-30"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => openEdit(item)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-500 hover:bg-white/[0.06] hover:text-white"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setDeleteTarget(item)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-500 hover:bg-red-400/10 hover:text-red-400"
                >
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
        title={editing ? "Edit Service" : "Add Service"}
        footer={
          <>
            <button onClick={() => setOpen(false)} className="btn-secondary px-5 py-2 text-sm">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !form.title}
              className="btn-primary px-5 py-2 text-sm disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </>
        }
      >
        <div className="space-y-5">
          <FormField label="Title">
            <input
              className="input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Business Websites"
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
          <FormField
            label="Icon name"
            hint="Any Lucide icon name, e.g. Briefcase, ShoppingBag, Search"
          >
            <input
              className="input"
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
            />
          </FormField>
          <FormField label="Features">
            <TagInput
              values={form.features}
              onChange={(features) => setForm({ ...form, features })}
            />
          </FormField>
          <FormField label="Price (optional)">
            <input
              className="input"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="Starting at $499"
            />
          </FormField>
          <FormField label="Status">
            <select
              className="input"
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as Service["status"] })
              }
            >
              <option value="published" className="bg-ink-800">Published</option>
              <option value="draft" className="bg-ink-800">Draft</option>
            </select>
          </FormField>
        </div>
      </SlideOver>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this service?"
        description={`"${deleteTarget?.title}" will be permanently removed from your website.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
