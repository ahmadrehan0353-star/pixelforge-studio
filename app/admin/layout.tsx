"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { ToastProvider } from "@/components/admin/Toast";
import { useAuth } from "@/lib/admin/useAuth";
import { useInactivityLogout } from "@/lib/admin/useInactivityLogout";

const titles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/content": "Website Content",
  "/admin/portfolio": "Portfolio",
  "/admin/services": "Services",
  "/admin/pricing": "Pricing",
  "/admin/testimonials": "Testimonials",
  "/admin/faq": "FAQ",
  "/admin/team": "Team",
  "/admin/contact": "Contact Information",
  "/admin/leads": "Leads",
  "/admin/seo": "SEO",
  "/admin/media": "Media Library",
  "/admin/settings": "Settings",
};

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  useInactivityLogout();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-ink-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-forge-cyan" />
      </div>
    );
  }

  return <>{children}</>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return (
      <ToastProvider>
        <div className="min-h-screen bg-ink-950">{children}</div>
      </ToastProvider>
    );
  }

  const title =
    titles[pathname] ??
    (pathname?.startsWith("/admin/portfolio") ? "Portfolio" : "Dashboard");

  return (
    <ToastProvider>
      <AuthGuard>
        <div className="flex h-screen overflow-hidden bg-ink-950">
          <AdminSidebar />

          <AnimatePresence>
            {mobileOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                  onClick={() => setMobileOpen(false)}
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "tween", duration: 0.25 }}
                  className="fixed left-0 top-0 z-50 h-full lg:hidden"
                >
                  <AdminSidebar />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className="flex flex-1 flex-col overflow-hidden">
            <AdminTopbar title={title} onMenuClick={() => setMobileOpen(true)} />
            <main className="flex-1 overflow-y-auto px-5 py-6 lg:px-8 lg:py-8">
              {children}
            </main>
          </div>
        </div>
      </AuthGuard>
    </ToastProvider>
  );
}
