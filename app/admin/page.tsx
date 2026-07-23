"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import {
  Briefcase,
  Inbox,
  Users,
  FileCheck2,
  Plus,
  Image as ImageIcon,
  Pencil,
  Download,
  Sparkles,
  X,
} from "lucide-react";
import { db } from "@/lib/firebase";
import StatCard from "@/components/admin/StatCard";
import { useToast } from "@/components/admin/Toast";
import { seedInitialContent } from "@/lib/admin/seedData";
import type { Lead } from "@/lib/admin/types";

export default function AdminDashboardHome() {
  const [counts, setCounts] = useState({ portfolio: 0, leads: 0, pages: 6 });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const { show } = useToast();

  const loadStats = async () => {
    setLoading(true);
    try {
      const [portfolioSnap, leadsSnap, recentSnap] = await Promise.all([
        getDocs(collection(db, "portfolio")),
        getDocs(collection(db, "leads")),
        getDocs(query(collection(db, "leads"), orderBy("createdAt", "desc"), limit(5))),
      ]);
      setCounts({
        portfolio: portfolioSnap.size,
        leads: leadsSnap.size,
        pages: 6,
      });
      setRecentLeads(
        recentSnap.docs.map((d) => ({ id: d.id, ...(d.data() as object) } as Lead))
      );
    } catch (err) {
      console.error("Failed to load dashboard stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImport = async () => {
    setImporting(true);
    try {
      const result = await seedInitialContent();
      if (result.imported.length > 0) {
        show(`Imported: ${result.imported.join(", ")}`, "success");
      } else {
        show("Everything is already imported — nothing new to add.", "info");
      }
      await loadStats();
      setBannerDismissed(true);
    } catch (err) {
      console.error("Import failed:", err);
      show("Something went wrong importing your content. Please try again.", "error");
    } finally {
      setImporting(false);
    }
  };

  const showBanner = !loading && counts.portfolio === 0 && !bannerDismissed;

  return (
    <div className="space-y-8">
      {showBanner && (
        <div className="glass-panel flex flex-col items-start justify-between gap-4 border-forge-cyan/20 p-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-forge-gradient/20 ring-1 ring-white/[0.08]">
              <Sparkles className="h-5 w-5 text-forge-cyan" />
            </div>
            <div>
              <p className="font-medium text-white">Your dashboard is empty, but your website isn&apos;t</p>
              <p className="mt-1 text-sm text-mist-500">
                Import your existing portfolio, services, pricing, testimonials, FAQ, and page
                text as real, editable entries — takes a few seconds.
              </p>
            </div>
          </div>
          <div className="flex flex-shrink-0 items-center gap-2">
            <button
              onClick={handleImport}
              disabled={importing}
              className="btn-primary whitespace-nowrap disabled:opacity-60"
            >
              <Download className="h-4 w-4" />
              {importing ? "Importing..." : "Import Existing Content"}
            </button>
            <button
              onClick={() => setBannerDismissed(true)}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-mist-500 hover:bg-white/[0.06] hover:text-white"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Briefcase}
          label="Total Portfolio Projects"
          value={loading ? "—" : counts.portfolio}
        />
        <StatCard
          icon={Inbox}
          label="Total Contact Form Submissions"
          value={loading ? "—" : counts.leads}
        />
        <StatCard
          icon={Users}
          label="Total Website Visitors"
          value="—"
          hint="Connect analytics to see this"
        />
        <StatCard icon={FileCheck2} label="Published Pages" value={counts.pages} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-lg font-semibold text-white">Recent Activity</h2>
          <div className="mt-4 space-y-2">
            {loading ? (
              <div className="card animate-pulse text-sm text-mist-700">Loading...</div>
            ) : recentLeads.length === 0 ? (
              <div className="card text-sm text-mist-500">
                No activity yet. New leads and content changes will show up here.
              </div>
            ) : (
              recentLeads.map((lead) => (
                <div key={lead.id} className="card flex items-center justify-between py-4">
                  <div>
                    <p className="text-sm font-medium text-white">
                      New lead from {lead.name || "a website visitor"}
                    </p>
                    <p className="text-xs text-mist-500">{lead.email}</p>
                  </div>
                  <Link href="/admin/leads" className="text-xs text-forge-cyan hover:underline">
                    View
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-white">Quick Actions</h2>
          <div className="mt-4 space-y-2">
            <QuickAction href="/admin/portfolio/new" icon={Plus} label="Add Portfolio Project" />
            <QuickAction href="/admin/services" icon={Plus} label="Add Service" />
            <QuickAction href="/admin/content" icon={Pencil} label="Edit Homepage" />
            <QuickAction href="/admin/media" icon={ImageIcon} label="Upload Image" />
            <button
              onClick={handleImport}
              disabled={importing}
              className="card flex w-full items-center gap-3 py-4 text-left transition-colors hover:border-forge-cyan/30 disabled:opacity-60"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forge-gradient/20 ring-1 ring-white/[0.08]">
                <Download className="h-4 w-4 text-forge-cyan" />
              </div>
              <span className="text-sm font-medium text-white">
                {importing ? "Importing..." : "Import Existing Content"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof Plus;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="card flex items-center gap-3 py-4 transition-colors hover:border-forge-cyan/30"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forge-gradient/20 ring-1 ring-white/[0.08]">
        <Icon className="h-4 w-4 text-forge-cyan" />
      </div>
      <span className="text-sm font-medium text-white">{label}</span>
    </Link>
  );
}
