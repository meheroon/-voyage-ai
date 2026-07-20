"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import Navbar from "@/components/Navbar";
import {
  LayoutDashboard, Plus, List, MessageCircle, Wand2, Sparkles,
  BarChart3, Target, LogOut, Menu, X,
} from "lucide-react";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  const SidebarContent = () => (
    <>
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
    </>
  );

  return (
    <div className="min-h-screen bg-navy-50">
      <Navbar />
      <div className="flex pt-16">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-navy-200 bg-white lg:block">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4">
            <SidebarContent />
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-navy-200 bg-white pt-16 transition-transform duration-300 lg:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-navy-100 p-4">
            <span className="font-bold text-navy-900">Menu</span>
            <button onClick={() => setSidebarOpen(false)} className="text-navy-400 hover:text-navy-600">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="overflow-y-auto p-4">
            <SidebarContent />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Mobile menu toggle */}
          <div className="sticky top-16 z-30 flex items-center border-b border-navy-200 bg-white px-4 py-2 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 text-sm font-medium text-navy-600 hover:text-navy-900"
            >
              <Menu className="h-5 w-5" />
              Menu
            </button>
          </div>

          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
