"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Wrench,
  Tag,
  MessageSquareQuote,
  HelpCircle,
  Users,
  Phone,
  Inbox,
  Search,
  Image as ImageIcon,
  Settings as SettingsIcon,
  Hexagon,
} from "lucide-react";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/content", label: "Website Content", icon: FileText },
  { href: "/admin/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/pricing", label: "Pricing", icon: Tag },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/contact", label: "Contact Information", icon: Phone },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/seo", label: "SEO", icon: Search },
  { href: "/admin/media", label: "Media Library", icon: ImageIcon },
  { href: "/admin/settings", label: "Settings", icon: SettingsIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-64 flex-shrink-0 flex-col border-r border-white/[0.06] bg-ink-900 lg:flex">
      <div className="flex items-center gap-2 px-6 py-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forge-gradient">
          <Hexagon className="h-4 w-4 text-white" strokeWidth={2.5} />
        </span>
        <span className="font-display text-base font-semibold text-white">
          PixelForge Admin
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-white/[0.08] text-white"
                      : "text-mist-500 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" strokeWidth={1.75} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/[0.06] px-6 py-4">
        <Link href="/" className="text-xs text-mist-700 hover:text-mist-300">
          &larr; Back to website
        </Link>
      </div>
    </aside>
  );
}
