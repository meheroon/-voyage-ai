"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateDestination, useGenerateDescription } from "@/hooks/use-queries";
import toast from "react-hot-toast";
import { Plus, Sparkles, MapPin, DollarSign, Clock, Tag, Image } from "lucide-react";

export default function AddDestinationPage() {
  const router = useRouter();
  const createMutation = useCreateDestination();
  const aiDescMutation = useGenerateDescription();
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    description: "",
    category: "beach",
    country: "",
    city: "",
    region: "",
    price: "",
    duration: "",
    difficulty: "moderate",
    images: "",
    highlights: "",
    included: "",
    season: "",
    bestFor: "",
  });

  const update = (field: string, value: string) => setForm({ ...form, [field]: value });

  const handleAIGenerate = async () => {
    if (!form.title || !form.country) {
      toast.error("Please enter a title and country first");
      return;
    }
    try {
      const res = await aiDescMutation.mutateAsync({
        title: form.title,
        location: `${form.city || form.country}, ${form.country}`,
        category: form.category,
        highlights: form.highlights ? form.highlights.split(",").map((s) => s.trim()) : [],
      });
      setForm({
        ...form,
        description: res.data.data.description,
        shortDescription: res.data.data.shortDescription,
      });
      toast.success("AI generated the description!");
    } catch {
      toast.error("AI generation failed. Please write manually.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.country || !form.city || !form.price) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      await createMutation.mutateAsync({
        title: form.title,
        shortDescription: form.shortDescription || form.description.substring(0, 150),
        description: form.description,
        category: form.category,
        location: { country: form.country, city: form.city, region: form.region },
        price: Number(form.price),
        duration: form.duration || "3 days",
        difficulty: form.difficulty,
        images: form.images ? form.images.split(",").map((s) => s.trim()) : [],
        highlights: form.highlights ? form.highlights.split(",").map((s) => s.trim()) : [],
        included: form.included ? form.included.split(",").map((s) => s.trim()) : [],
        season: form.season ? form.season.split(",").map((s) => s.trim()) : [],
        bestFor: form.bestFor ? form.bestFor.split(",").map((s) => s.trim()) : [],
      });
      toast.success("Destination added successfully!");
      router.push("/dashboard/items/manage");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add destination");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy-900">Add New Destination</h1>
        <p className="text-navy-500">Share your travel discovery with the world.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6">
          <h2 className="mb-4 text-lg font-bold text-navy-900">Basic Information</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-navy-700">Title *</label>
              <input value={form.title} onChange={(e) => update("title", e.target.value)} className="input-field" placeholder="e.g., Santorini Sunset Retreat" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy-700">Category *</label>
              <select value={form.category} onChange={(e) => update("category", e.target.value)} className="input-field">
                {["beach", "mountain", "city", "cultural", "adventure", "luxury", "budget"].map((c) => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy-700">Difficulty</label>
              <select value={form.difficulty} onChange={(e) => update("difficulty", e.target.value)} className="input-field">
                {["easy", "moderate", "challenging"].map((d) => (
                  <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy-700">Price ($) *</label>
              <input type="number" value={form.price} onChange={(e) => update("price", e.target.value)} className="input-field" placeholder="2500" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy-700">Duration</label>
              <input value={form.duration} onChange={(e) => update("duration", e.target.value)} className="input-field" placeholder="e.g., 7 days" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="mb-4 text-lg font-bold text-navy-900">Location</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-navy-700">Country *</label>
              <input value={form.country} onChange={(e) => update("country", e.target.value)} className="input-field" placeholder="Greece" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy-700">City *</label>
              <input value={form.city} onChange={(e) => update("city", e.target.value)} className="input-field" placeholder="Santorini" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy-700">Region</label>
              <input value={form.region} onChange={(e) => update("region", e.target.value)} className="input-field" placeholder="Cyclades" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-navy-900">Description</h2>
            <button type="button" onClick={handleAIGenerate} disabled={aiDescMutation.isPending} className="flex items-center gap-2 rounded-lg bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-100 disabled:opacity-50">
              <Sparkles className="h-4 w-4" />
              {aiDescMutation.isPending ? "Generating..." : "AI Generate"}
            </button>
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-navy-700">Short Description</label>
            <input value={form.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} className="input-field" placeholder="Brief description of the destination" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy-700">Full Description *</label>
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} className="input-field h-40 resize-none" placeholder="Detailed description of the destination..." />
          </div>
        </div>

        <div className="card p-6">
          <h2 className="mb-4 text-lg font-bold text-navy-900">Details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-navy-700">Image URLs (comma separated)</label>
              <input value={form.images} onChange={(e) => update("images", e.target.value)} className="input-field" placeholder="https://..." />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy-700">Seasons (comma separated)</label>
              <input value={form.season} onChange={(e) => update("season", e.target.value)} className="input-field" placeholder="spring, summer" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy-700">Highlights (comma separated)</label>
              <input value={form.highlights} onChange={(e) => update("highlights", e.target.value)} className="input-field" placeholder="Sunset views, Beach access" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy-700">Included (comma separated)</label>
              <input value={form.included} onChange={(e) => update("included", e.target.value)} className="input-field" placeholder="Hotel, Tours, Meals" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-navy-700">Best For (comma separated)</label>
              <input value={form.bestFor} onChange={(e) => update("bestFor", e.target.value)} className="input-field" placeholder="couples, adventure, photography" />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={createMutation.isPending} className="btn-primary !px-8">
            <Plus className="h-4 w-4" />
            {createMutation.isPending ? "Adding..." : "Add Destination"}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-outline">Cancel</button>
        </div>
      </form>
    </div>
  );
}
