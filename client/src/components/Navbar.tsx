"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { Menu, X, Compass, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const loggedOutLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const loggedInLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/ai-chat", label: "AI Chat" },
    { href: "/dashboard/ai-planner", label: "Trip Planner" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const links = user ? loggedInLinks : loggedOutLinks;

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-navy-100 bg-white/95 backdrop-blur-md">
      <div className="container-custom mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Compass className="h-7 w-7 text-primary-600" strokeWidth={2.5} />
          <span className="text-xl font-bold text-navy-900">
            Voyage<span className="text-primary-600">AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-navy-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <span className="max-w-[120px] truncate">{user.name}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-navy-100 bg-white py-2 shadow-lg">
                  <div className="border-b border-navy-100 px-4 py-2">
                    <p className="text-sm font-medium text-navy-900">{user.name}</p>
                    <p className="text-xs text-navy-500">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-navy-700 hover:bg-navy-50"
                    onClick={() => setProfileOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/items/add"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-navy-700 hover:bg-navy-50"
                    onClick={() => setProfileOpen(false)}
                  >
                    Add Destination
                  </Link>
                  <hr className="my-1 border-navy-100" />
                  <button
                    onClick={() => { logout(); setProfileOpen(false); }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="btn-outline !py-2 !px-4 text-sm">
                Sign In
              </Link>
              <Link href="/register" className="btn-primary !py-2 !px-4 text-sm">
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-navy-700">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-navy-100 bg-white px-4 pb-4 pt-2 lg:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-navy-600 hover:bg-primary-50 hover:text-primary-600"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr className="my-2 border-navy-100" />
          {user ? (
            <button
              onClick={() => { logout(); setMobileOpen(false); }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="btn-outline !py-2 flex-1" onClick={() => setMobileOpen(false)}>
                Sign In
              </Link>
              <Link href="/register" className="btn-primary !py-2 flex-1" onClick={() => setMobileOpen(false)}>
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
