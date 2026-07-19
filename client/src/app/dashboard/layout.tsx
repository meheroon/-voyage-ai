"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import Navbar from "@/components/Navbar";
import {
  LayoutDashboard, Plus, List, MessageCircle, Wand2, Sparkles,
  BarChart3, Target, Settings, LogOut,
} from "lucide-react";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/items/add", label: "Add Destination", icon: Plus },
  { href: "/dashboard/items/manage", label: "Manage Items", icon: List },
  { divider: true },
  { href: "/dashboard/ai-chat", label: "AI Chat Assistant", icon: MessageCircle },
  { href: "/dashboard/ai-planner", label: "AI Trip Planner", icon: Wand2 },
  { href: "/dashboard/ai-generator", label: "AI Content Generator", icon: Sparkles },
  { href: "/dashboard/ai-recommendations", label: "AI Recommendations", icon: Target },
  { href: "/dashboard/ai-analyzer", label: "AI Data Analyzer", icon: BarChart3 },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-50">
      <Navbar />
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-navy-200 bg-white lg:block">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4">
            <div className="mb-6 flex items-center gap-3 rounded-xl bg-primary-50 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full" />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-navy-900">{user.name}</p>
                <p className="truncate text-xs text-navy-500">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-1">
              {sidebarLinks.map((link, i) => {
                if (link.divider) return <hr key={i} className="my-3 border-navy-100" />;
                const Icon = link.icon!;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href!}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary-50 text-primary-700"
                        : "text-navy-600 hover:bg-navy-50 hover:text-navy-900"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                );
              })}
              <hr className="my-3 border-navy-100" />
              <button
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-h-[calc(100vh-4rem)] flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
