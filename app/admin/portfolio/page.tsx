"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Copy, Star } from "lucide-react";
import { useCollection } from "@/lib/admin/useCollection";
import { useToast } from "@/components/admin/Toast";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import type { PortfolioProject } from "@/lib/admin/types";

export default function PortfolioManagerPage() {
  const { items, loading, add, remove, reorder } = useCollection<PortfolioProject>("portfolio");
  const { show } = useToast();
  const [deleteTarget, setDeleteTarget] = useState<PortfolioProject | null>(null);

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    try {
      await remove(deleteTarget.id);
      show("Project deleted");
    } catch (err) {
      console.error(err);
      show("Couldn't delete this project.", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  const duplicate = async (item: PortfolioProject) => {
    const { id, ...rest } = item;
    void id;
    try {
      await add({ ...rest, title: `${rest.title} (Copy)`, slug: `${rest.slug}-copy`, order: items.length });
      show("Project duplicated");
    } catch (err) {
      console.error(err);
      show("Couldn't duplicate this project.", "error");
    }
  };

  const move = async (item: PortfolioProject, dir: -1 | 1) => {
    const idx = items.findIndex((i) => i.id === item.id);
    const target = items[idx + dir];
    if (!target || !item.id || !target.id) return;
    await Promise.all([reorder(item.id, target.order), reorder(target.id, item.order)]);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-mist-500">Projects shown on your Portfolio page.</p>
        <Link href="/admin/portfolio/new" className="btn-primary">
          <Plus className="h-4 w-4" />
          Add Portfolio Project
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="card animate-pulse text-sm text-mist-700">Loading...</div>
        ) : items.length === 0 ? (
          <div className="card text-center text-sm text-mist-500">
            No projects yet. Click &quot;Add Portfolio Project&quot; to create your first one.
          </div>
        ) : (
          items.map((item, i) => (
            <div key={item.id} className="card flex items-center gap-4 py-4">
              {item.thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.thumbnailUrl}
                  alt=""
                  className="h-12 w-16 flex-shrink-0 rounded-lg object-cover"
                />
              ) : (
                <div className="h-12 w-16 flex-shrink-0 rounded-lg bg-white/[0.04]" />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium text-white">{item.title}</p>
                  {item.featured && <Star className="h-3.5 w-3.5 flex-shrink-0 text-forge-ember" />}
                </div>
                <p className="truncate text-xs text-mist-500">{item.category}</p>
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
                <button onClick={() => move(item, -1)} disabled={i === 0} className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-500 hover:bg-white/[0.06] hover:text-white disabled:opacity-30">
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => move(item, 1)} disabled={i === items.length - 1} className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-500 hover:bg-white/[0.06] hover:text-white disabled:opacity-30">
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => duplicate(item)} className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-500 hover:bg-white/[0.06] hover:text-white">
                  <Copy className="h-3.5 w-3.5" />
                </button>
                <Link href={`/admin/portfolio/${item.id}`} className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-500 hover:bg-white/[0.06] hover:text-white">
                  <Pencil className="h-3.5 w-3.5" />
                </Link>
                <button onClick={() => setDeleteTarget(item)} className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-500 hover:bg-red-400/10 hover:text-red-400">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this project?"
        description={`"${deleteTarget?.title}" and its case study will be permanently removed.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
