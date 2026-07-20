"use client";

import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { useMyDestinations, useConversations } from "@/hooks/use-queries";
import {
  Plus, Map, MessageCircle, Wand2, TrendingUp, Star, Globe,
  ArrowRight, Sparkles,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0ea5e9", "#f97316", "#10b981", "#8b5cf6", "#ec4899"];

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: myDestinations = [], isLoading: destLoading } = useMyDestinations();
  const { data: conversations = [] } = useConversations();

  const recentDestinations = myDestinations.slice(0, 5);

  const categoryData = [
    { name: "Beach", value: 35 },
    { name: "Mountain", value: 25 },
    { name: "City", value: 20 },
    { name: "Adventure", value: 15 },
    { name: "Cultural", value: 5 },
  ];

  const monthlyData = [
    { month: "Jan", trips: 2 },
    { month: "Feb", trips: 1 },
    { month: "Mar", trips: 3 },
    { month: "Apr", trips: 4 },
    { month: "May", trips: 2 },
    { month: "Jun", trips: 5 },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy-900">
          Welcome back, {user?.name?.split(" ")[0]}!
        </h1>
        <p className="text-navy-500">Here&apos;s what&apos;s happening with your travel plans.</p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "My Destinations", value: myDestinations.length, icon: Map, color: "bg-primary-50 text-primary-600" },
          { label: "AI Conversations", value: conversations.length, icon: MessageCircle, color: "bg-accent-50 text-accent-600" },
          { label: "Total Reviews", value: 0, icon: Star, color: "bg-amber-50 text-amber-600" },
          { label: "Countries Visited", value: 0, icon: Globe, color: "bg-emerald-50 text-emerald-600" },
        ].map((stat, i) => (
          <div key={i} className="card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-navy-500">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-navy-900">{stat.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "AI Chat", desc: "Ask travel questions", href: "/dashboard/ai-chat", icon: MessageCircle, color: "from-primary-500 to-primary-600" },
          { label: "Trip Planner", desc: "Plan your next trip", href: "/dashboard/ai-planner", icon: Wand2, color: "from-accent-500 to-accent-600" },
          { label: "Content Gen", desc: "Generate travel content", href: "/dashboard/ai-generator", icon: Sparkles, color: "from-purple-500 to-purple-600" },
          { label: "Recommendations", desc: "Get AI suggestions", href: "/dashboard/ai-recommendations", icon: TrendingUp, color: "from-emerald-500 to-emerald-600" },
        ].map((action, i) => (
          <Link key={i} href={action.href} className="group">
            <div className={`rounded-xl bg-gradient-to-r ${action.color} p-5 text-white transition-transform hover:scale-[1.02]`}>
              <action.icon className="mb-3 h-8 w-8 opacity-90" />
              <h3 className="font-bold">{action.label}</h3>
              <p className="mt-1 text-sm text-white/80">{action.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Charts */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="mb-4 font-bold text-navy-900">Travel Activity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="trips" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-6">
          <h3 className="mb-4 font-bold text-navy-900">Destination Categories</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent */}
      <div className="card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-navy-900">Recent Destinations</h3>
          <Link href="/dashboard/items/manage" className="flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {destLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex animate-pulse items-center gap-4 rounded-lg p-3">
                <div className="h-12 w-12 rounded-lg bg-navy-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/3 rounded bg-navy-100" />
                  <div className="h-3 w-1/2 rounded bg-navy-100" />
                </div>
              </div>
            ))}
          </div>
        ) : recentDestinations.length === 0 ? (
          <div className="py-8 text-center">
            <Map className="mx-auto mb-3 h-12 w-12 text-navy-300" />
            <p className="text-navy-500">No destinations yet</p>
            <Link href="/dashboard/items/add" className="btn-primary mt-3 inline-flex">
              <Plus className="h-4 w-4" /> Add Your First
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {recentDestinations.map((dest: any) => (
              <div key={dest._id} className="flex items-center gap-4 rounded-lg p-3 hover:bg-navy-50">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50">
                  <Map className="h-5 w-5 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-navy-900">{dest.title}</p>
                  <p className="text-xs text-navy-500">{dest.location?.city}, {dest.location?.country}</p>
                </div>
                <span className="text-sm font-semibold text-navy-900">${dest.price?.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
