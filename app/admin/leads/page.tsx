"use client";

import { useMemo, useState } from "react";
import { Search, Trash2, Archive, MailOpen, Download, Mail } from "lucide-react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useCollection } from "@/lib/admin/useCollection";
import { useToast } from "@/components/admin/Toast";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import type { Lead } from "@/lib/admin/types";

const statusFilters = ["all", "unread", "read", "archived"] as const;

function formatDate(ts: unknown): string {
  if (!ts) return "—";
  const anyTs = ts as { toDate?: () => Date };
  if (typeof anyTs.toDate === "function") {
    return anyTs.toDate().toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return "—";
}

export default function LeadsManagerPage() {
  const { items, loading, refetch } = useCollection<Lead>("leads", "createdAt");
  const { show } = useToast();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<(typeof statusFilters)[number]>("all");
  const [deleteTarget, setDeleteTarget] = useState<Lead | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return items
      .filter((l) => (filter === "all" ? true : (l.status ?? "unread") === filter))
      .filter((l) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          l.name?.toLowerCase().includes(q) ||
          l.business?.toLowerCase().includes(q) ||
          l.email?.toLowerCase().includes(q)
        );
      })
      .reverse(); // most recent first, since useCollection orders ascending by createdAt
  }, [items, filter, search]);

  const setStatus = async (lead: Lead, status: Lead["status"]) => {
    if (!lead.id) return;
    try {
      await updateDoc(doc(db, "leads", lead.id), { status });
      show(status === "archived" ? "Lead archived" : "Marked as read");
      refetch();
    } catch (err) {
      console.error(err);
      show("Couldn't update this lead.", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    try {
      await deleteDoc(doc(db, "leads", deleteTarget.id));
      show("Lead deleted");
      refetch();
    } catch (err) {
      console.error(err);
      show("Couldn't delete this lead.", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  const exportCsv = () => {
    const headers = [
      "Name",
      "Business",
      "Email",
      "Phone",
      "Website Type",
      "Budget",
      "Timeline",
      "Description",
      "Status",
    ];
    const rows = filtered.map((l) => [
      l.name,
      l.business,
      l.email,
      l.phone,
      l.websiteType,
      l.budget,
      l.timeline,
      (l.description || "").replace(/\n/g, " "),
      l.status ?? "unread",
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${(cell ?? "").toString().replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 sm:max-w-sm">
          <Search className="h-4 w-4 text-mist-700" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, business, email..."
            className="w-full bg-transparent text-sm text-white placeholder:text-mist-700 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1 rounded-full border border-white/[0.08] bg-white/[0.02] p-1">
            {statusFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  filter === f ? "bg-forge-gradient text-white" : "text-mist-500 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button onClick={exportCsv} className="btn-secondary px-4 py-2 text-sm">
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="card animate-pulse text-sm text-mist-700">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="card text-center text-sm text-mist-500">
            No leads match this view yet.
          </div>
        ) : (
          filtered.map((lead) => {
            const isExpanded = expanded === lead.id;
            const status = lead.status ?? "unread";
            return (
              <div key={lead.id} className="card py-4">
                <div
                  className="flex cursor-pointer items-center gap-4"
                  onClick={() => setExpanded(isExpanded ? null : lead.id ?? null)}
                >
                  <div
                    className={`h-2 w-2 flex-shrink-0 rounded-full ${
                      status === "unread" ? "bg-forge-cyan" : "bg-transparent"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-white">
                      {lead.name || "Unnamed"}{" "}
                      {lead.business && (
                        <span className="text-mist-500">— {lead.business}</span>
                      )}
                    </p>
                    <p className="truncate text-xs text-mist-500">{lead.email}</p>
                  </div>
                  <span className="hidden flex-shrink-0 text-xs text-mist-700 sm:block">
                    {formatDate(lead.createdAt)}
                  </span>
                  <span
                    className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${
                      status === "unread"
                        ? "bg-forge-cyan/10 text-forge-cyan"
                        : status === "archived"
                        ? "bg-white/[0.06] text-mist-500"
                        : "bg-emerald-400/10 text-emerald-400"
                    }`}
                  >
                    {status}
                  </span>
                  <div
                    className="flex flex-shrink-0 items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {status !== "read" && (
                      <button
                        onClick={() => setStatus(lead, "read")}
                        title="Mark as read"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-500 hover:bg-white/[0.06] hover:text-white"
                      >
                        <MailOpen className="h-3.5 w-3.5" />
                      </button>
                    )}
                    {status !== "archived" && (
                      <button
                        onClick={() => setStatus(lead, "archived")}
                        title="Archive"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-500 hover:bg-white/[0.06] hover:text-white"
                      >
                        <Archive className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => setDeleteTarget(lead)}
                      title="Delete"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-500 hover:bg-red-400/10 hover:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 grid gap-3 border-t border-white/[0.06] pt-4 sm:grid-cols-2">
                    <Detail label="Phone" value={lead.phone} />
                    <Detail label="Website Type" value={lead.websiteType} />
                    <Detail label="Budget" value={lead.budget} />
                    <Detail label="Timeline" value={lead.timeline} />
                    <div className="sm:col-span-2">
                      <p className="text-xs uppercase tracking-wide text-mist-700">
                        Project Description
                      </p>
                      <p className="mt-1 text-sm text-mist-300">
                        {lead.description || "—"}
                      </p>
                    </div>
                    <a
                      href={`mailto:${lead.email}`}
                      className="btn-secondary mt-1 inline-flex w-fit px-4 py-2 text-xs"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      Reply by email
                    </a>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this lead?"
        description={`The submission from "${deleteTarget?.name}" will be permanently removed.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

function Detail({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-mist-700">{label}</p>
      <p className="mt-1 text-sm text-mist-300">{value || "—"}</p>
    </div>
  );
}
