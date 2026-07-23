"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { useCollection } from "@/lib/admin/useCollection";
import { useToast } from "@/components/admin/Toast";
import SlideOver from "@/components/admin/SlideOver";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import FormField from "@/components/admin/FormField";
import ImageUploader from "@/components/admin/ImageUploader";
import type { TeamMember } from "@/lib/admin/types";

const emptyItem: Omit<TeamMember, "id"> = {
  name: "",
  role: "",
  bio: "",
  photoUrl: "",
  social: {},
  order: 0,
};

export default function TeamManagerPage() {
  const { items, loading, add, update, remove, reorder } = useCollection<TeamMember>("team");
  const { show } = useToast();
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<Omit<TeamMember, "id">>(emptyItem);
  const [open, setOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);
  const [saving, setSaving] = useState(false);

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyItem, order: items.length });
    setOpen(true);
  };

  const openEdit = (item: TeamMember) => {
    setEditing(item);
    setForm(item);
    setOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing?.id) {
        await update(editing.id, form);
        show("Team member updated");
      } else {
        await add(form);
        show("Team member added");
      }
      setOpen(false);
    } catch (err) {
      console.error(err);
      show("Something went wrong saving this profile.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    try {
      await remove(deleteTarget.id);
      show("Team member removed");
    } catch (err) {
      console.error(err);
      show("Couldn't remove this team member.", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  const move = async (item: TeamMember, dir: -1 | 1) => {
    const idx = items.findIndex((i) => i.id === item.id);
    const target = items[idx + dir];
    if (!target || !item.id || !target.id) return;
    await Promise.all([reorder(item.id, target.order), reorder(target.id, item.order)]);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-mist-500">Team profiles shown on your About page.</p>
        <button onClick={openNew} className="btn-primary">
          <Plus className="h-4 w-4" />
          Add Team Member
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="card animate-pulse text-sm text-mist-700">Loading...</div>
        ) : items.length === 0 ? (
          <div className="card text-center text-sm text-mist-500">No team members yet.</div>
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
                <p className="truncate text-xs text-mist-500">{item.role}</p>
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
        title={editing ? "Edit Team Member" : "Add Team Member"}
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
              folder="team"
            />
          </FormField>
          <FormField label="Name">
            <input
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </FormField>
          <FormField label="Role">
            <input
              className="input"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
          </FormField>
          <FormField label="Bio">
            <textarea
              className="input resize-none"
              rows={4}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Instagram">
              <input
                className="input"
                value={form.social.instagram ?? ""}
                onChange={(e) =>
                  setForm({ ...form, social: { ...form.social, instagram: e.target.value } })
                }
              />
            </FormField>
            <FormField label="LinkedIn">
              <input
                className="input"
                value={form.social.linkedin ?? ""}
                onChange={(e) =>
                  setForm({ ...form, social: { ...form.social, linkedin: e.target.value } })
                }
              />
            </FormField>
            <FormField label="GitHub">
              <input
                className="input"
                value={form.social.github ?? ""}
                onChange={(e) =>
                  setForm({ ...form, social: { ...form.social, github: e.target.value } })
                }
              />
            </FormField>
            <FormField label="Twitter / X">
              <input
                className="input"
                value={form.social.twitter ?? ""}
                onChange={(e) =>
                  setForm({ ...form, social: { ...form.social, twitter: e.target.value } })
                }
              />
            </FormField>
          </div>
        </div>
      </SlideOver>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Remove this team member?"
        description={`"${deleteTarget?.name}" will be removed from your About page.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
