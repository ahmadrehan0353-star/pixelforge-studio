"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, LogOut, User, Menu } from "lucide-react";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/admin/useAuth";

export default function AdminTopbar({
  title,
  onMenuClick,
}: {
  title: string;
  onMenuClick?: () => void;
}) {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-white/[0.06] bg-ink-950/80 px-5 py-4 backdrop-blur-xl lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-mist-500 hover:bg-white/[0.06] hover:text-white lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="font-display text-lg font-semibold text-white sm:text-xl">{title}</h1>
      </div>

      <div className="hidden max-w-sm flex-1 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 sm:flex">
        <Search className="h-4 w-4 text-mist-700" />
        <input
          placeholder="Search dashboard..."
          className="w-full bg-transparent text-sm text-white placeholder:text-mist-700 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full text-mist-500 hover:bg-white/[0.06] hover:text-white">
          <Bell className="h-4 w-4" />
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] py-1.5 pl-1.5 pr-3 text-sm text-white"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forge-gradient">
              <User className="h-3.5 w-3.5 text-white" />
            </span>
            <span className="hidden max-w-[140px] truncate sm:inline">
              {user?.email ?? "Admin"}
            </span>
          </button>

          <AnimatePresence>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="glass-panel absolute right-0 top-12 z-50 w-48 overflow-hidden p-1.5"
                >
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-mist-300 hover:bg-white/[0.06] hover:text-white"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
