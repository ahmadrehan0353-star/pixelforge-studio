"use client";

import { useState } from "react";
import { ref, deleteObject } from "firebase/storage";
import { LayoutGrid, List, Search, Copy, Trash2, Upload } from "lucide-react";
import { storage } from "@/lib/firebase";
import { useCollection } from "@/lib/admin/useCollection";
import { useToast } from "@/components/admin/Toast";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImageUploader from "@/components/admin/ImageUploader";
import type { MediaItem } from "@/lib/admin/types";

export default function MediaLibraryPage() {
  const { items, loading, remove, refetch } = useCollection<MediaItem>("media", "createdAt");
  const { show } = useToast();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);
  const [uploaderOpen, setUploaderOpen] = useState(false);

  const filtered = items
    .filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))
    .reverse();

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    show("URL copied to clipboard");
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    try {
      if (deleteTarget.path) {
        await deleteObject(ref(storage, deleteTarget.path)).catch(() => {
          // File may already be gone from storage; still remove the index entry.
        });
      }
      await remove(deleteTarget.id);
      show("File deleted");
    } catch (err) {
      console.error(err);
      show("Couldn't delete this file.", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 sm:max-w-sm">
          <Search className="h-4 w-4 text-mist-700" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search files..."
            className="w-full bg-transparent text-sm text-white placeholder:text-mist-700 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 rounded-full border border-white/[0.08] bg-white/[0.02] p-1">
            <button
              onClick={() => setView("grid")}
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                view === "grid" ? "bg-forge-gradient text-white" : "text-mist-500 hover:text-white"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                view === "list" ? "bg-forge-gradient text-white" : "text-mist-500 hover:text-white"
              }`}
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
          <button onClick={() => setUploaderOpen((o) => !o)} className="btn-primary">
            <Upload className="h-4 w-4" />
            Upload
          </button>
        </div>
      </div>

      {uploaderOpen && (
        <div className="card mt-4">
          <ImageUploader
            onChange={() => {
              refetch();
              setUploaderOpen(false);
            }}
            folder="media"
          />
        </div>
      )}

      <div className="mt-6">
        {loading ? (
          <div className="card animate-pulse text-sm text-mist-700">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="card text-center text-sm text-mist-500">
            No media uploaded yet. Files you upload anywhere in the dashboard also appear here.
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((item) => (
              <div key={item.id} className="card p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.name}
                  className="aspect-square w-full rounded-lg object-cover"
                />
                <p className="mt-2 truncate px-1 text-xs text-mist-300">{item.name}</p>
                <div className="mt-1 flex items-center gap-1 px-1">
                  <button
                    onClick={() => copyUrl(item.url)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-mist-500 hover:bg-white/[0.06] hover:text-white"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-mist-500 hover:bg-red-400/10 hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((item) => (
              <div key={item.id} className="card flex items-center gap-4 py-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt={item.name} className="h-10 w-10 flex-shrink-0 rounded-lg object-cover" />
                <p className="min-w-0 flex-1 truncate text-sm text-white">{item.name}</p>
                <span className="flex-shrink-0 text-xs text-mist-700">
                  {(item.size / 1024).toFixed(0)} KB
                </span>
                <button onClick={() => copyUrl(item.url)} className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-500 hover:bg-white/[0.06] hover:text-white">
                  <Copy className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => setDeleteTarget(item)} className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-500 hover:bg-red-400/10 hover:text-red-400">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this file?"
        description={`"${deleteTarget?.name}" will be permanently removed from storage.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
