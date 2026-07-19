"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DestinationCard from "@/components/DestinationCard";
import SkeletonCard from "@/components/SkeletonCard";
import { destinationAPI } from "@/lib/api";
import { Destination } from "@/types";
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["all", "beach", "mountain", "city", "cultural", "adventure", "luxury", "budget"];
const difficulties = ["", "easy", "moderate", "challenging"];
const sortOptions = [
  { value: "-createdAt", label: "Newest First" },
  { value: "price", label: "Price: Low to High" },
  { value: "-price", label: "Price: High to Low" },
  { value: "-rating", label: "Highest Rated" },
  { value: "-reviewCount", label: "Most Reviewed" },
];

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [difficulty, setDifficulty] = useState(searchParams.get("difficulty") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "-createdAt");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { page: String(page), limit: "12", sort };
      if (category && category !== "all") params.category = category;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (difficulty) params.difficulty = difficulty;
      if (search) params.search = search;

      const res = await destinationAPI.getAll(params);
      setDestinations(res.data.data);
      setPagination(res.data.pagination);
    } catch {
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [page, category, sort, difficulty]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchDestinations();
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setDifficulty("");
    setSort("-createdAt");
    setPage(1);
  };

  const hasFilters = category !== "all" || minPrice || maxPrice || difficulty || search;

  return (
    <div className="min-h-screen bg-navy-50">
      <Navbar />
      <div className="pt-20 pb-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-900 to-primary-900 px-4 py-12 sm:px-6 lg:px-8">
          <div className="container-custom mx-auto">
            <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl">Explore Destinations</h1>
            <p className="mb-6 text-navy-300">Discover amazing places around the world, powered by AI recommendations.</p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search destinations, countries, cities..."
                  className="w-full rounded-xl border-0 bg-white py-3 pl-12 pr-4 text-navy-900 placeholder-navy-400 shadow-sm focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <button type="submit" className="btn-accent rounded-xl !px-6">Search</button>
              <button type="button" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white hover:bg-white/20">
                <SlidersHorizontal className="h-5 w-5" />
                Filters
              </button>
            </form>
          </div>
        </div>

        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="mb-6 flex gap-2 overflow-x-auto py-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setPage(1); }}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  category === cat
                    ? "bg-primary-600 text-white"
                    : "bg-white text-navy-600 hover:bg-navy-100"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mb-6 rounded-xl border border-navy-200 bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-navy-900">Filters</h3>
                {hasFilters && (
                  <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600">
                    <X className="h-4 w-4" /> Clear all
                  </button>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-navy-700">Min Price ($)</label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="0"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-navy-700">Max Price ($)</label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="10000"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-navy-700">Difficulty</label>
                  <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="input-field">
                    <option value="">All Levels</option>
                    {difficulties.filter(Boolean).map((d) => (
                      <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-navy-700">Sort By</label>
                  <select value={sort} onChange={(e) => setSort(e.target.value)} className="input-field">
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button onClick={() => { setPage(1); fetchDestinations(); }} className="btn-primary mt-4">
                Apply Filters
              </button>
            </div>
          )}

          {/* Results */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-navy-500">
              {pagination.total} destination{pagination.total !== 1 ? "s" : ""} found
            </p>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-navy-200 bg-white px-3 py-1.5 text-sm text-navy-700">
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
              : destinations.map((d) => <DestinationCard key={d._id} destination={d} />)
            }
          </div>

          {!loading && destinations.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg font-medium text-navy-500">No destinations found</p>
              <p className="mt-1 text-sm text-navy-400">Try adjusting your filters or search terms.</p>
              <button onClick={clearFilters} className="btn-primary mt-4">Clear Filters</button>
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-navy-200 bg-white text-navy-600 hover:bg-navy-50 disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium ${
                    p === page ? "bg-primary-600 text-white" : "border border-navy-200 bg-white text-navy-600 hover:bg-navy-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(Math.min(pagination.pages, page + 1))}
                disabled={page === pagination.pages}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-navy-200 bg-white text-navy-600 hover:bg-navy-50 disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
