"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Star } from "lucide-react";
import { useCollection } from "@/lib/admin/useCollection";
import { useToast } from "@/components/admin/Toast";
import SlideOver from "@/components/admin/SlideOver";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import FormField from "@/components/admin/FormField";
import TagInput from "@/components/admin/TagInput";
import type { PricingPlan } from "@/lib/admin/types";

const emptyPlan: Omit<PricingPlan, "id"> = {
  name: "",
  price: "",
  period: "one-time",
  description: "",
  features: [],
  buttonText: "Get Started",
  popular: false,
  enabled: true,
  order: 0,
};

export default function PricingManagerPage() {
  const { items, loading, add, update, remove, reorder } = useCollection<PricingPlan>("pricing");
  const { show } = useToast();
  const [editing, setEditing] = useState<PricingPlan | null>(null);
  const [form, setForm] = useState<Omit<PricingPlan, "id">>(emptyPlan);
  const [open, setOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<PricingPlan | null>(null);
  const [saving, setSaving] = useState(false);

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyPlan, order: items.length });
    setOpen(true);
  };

  const openEdit = (item: PricingPlan) => {
    setEditing(item);
    setForm(item);
    setOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing?.id) {
        await update(editing.id, form);
        show("Plan updated");
      } else {
        await add(form);
        show("Plan added");
      }
      setOpen(false);
    } catch (err) {
      console.error(err);
      show("Something went wrong saving this plan.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    try {
      await remove(deleteTarget.id);
      show("Plan deleted");
    } catch (err) {
      console.error(err);
      show("Couldn't delete this plan.", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  const move = async (item: PricingPlan, dir: -1 | 1) => {
    const idx = items.findIndex((i) => i.id === item.id);
    const target = items[idx + dir];
    if (!target || !item.id || !target.id) return;
    await Promise.all([reorder(item.id, target.order), reorder(target.id, item.order)]);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-mist-500">Plans shown on your Pricing page and homepage.</p>
        <button onClick={openNew} className="btn-primary">
          <Plus className="h-4 w-4" />
          Add Plan
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="card animate-pulse text-sm text-mist-700">Loading...</div>
        ) : items.length === 0 ? (
          <div className="card text-center text-sm text-mist-500">No pricing plans yet.</div>
        ) : (
          items.map((item, i) => (
            <div key={item.id} className="card flex items-center gap-4 py-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium text-white">{item.name}</p>
                  {item.popular && <Star className="h-3.5 w-3.5 flex-shrink-0 text-forge-ember" />}
                </div>
                <p className="text-xs text-mist-500">
                  {item.price} / {item.period}
                </p>
              </div>
              <span
                className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  item.enabled
                    ? "bg-emerald-400/10 text-emerald-400"
                    : "bg-white/[0.06] text-mist-500"
                }`}
              >
                {item.enabled ? "Enabled" : "Disabled"}
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
        title={editing ? "Edit Plan" : "Add Plan"}
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
          <FormField label="Plan Name">
            <input
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Business"
            />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Price">
              <input
                className="input"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="$1,199"
              />
            </FormField>
            <FormField label="Period">
              <input
                className="input"
                value={form.period}
                onChange={(e) => setForm({ ...form, period: e.target.value })}
                placeholder="one-time"
              />
            </FormField>
          </div>
          <FormField label="Description">
            <textarea
              className="input resize-none"
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </FormField>
          <FormField label="Features">
            <TagInput
              values={form.features}
              onChange={(features) => setForm({ ...form, features })}
            />
          </FormField>
          <FormField label="Button Text">
            <input
              className="input"
              value={form.buttonText}
              onChange={(e) => setForm({ ...form, buttonText: e.target.value })}
            />
          </FormField>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-mist-300">
              <input
                type="checkbox"
                checked={form.popular}
                onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                className="h-4 w-4 rounded border-white/20 bg-white/5"
              />
              Popular badge
            </label>
            <label className="flex items-center gap-2 text-sm text-mist-300">
              <input
                type="checkbox"
                checked={form.enabled}
                onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
                className="h-4 w-4 rounded border-white/20 bg-white/5"
              />
              Enabled
            </label>
          </div>
        </div>
      </SlideOver>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this plan?"
        description={`"${deleteTarget?.name}" will be permanently removed from your website.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
