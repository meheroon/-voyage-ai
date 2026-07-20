"use client";

import Link from "next/link";
import { useMyDestinations, useDeleteDestination } from "@/hooks/use-queries";
import { Destination } from "@/types";
import toast from "react-hot-toast";
import { Plus, Eye, Trash2, MapPin, Star, DollarSign, ExternalLink } from "lucide-react";

export default function ManageItemsPage() {
  const { data: destinations = [], isLoading: loading } = useMyDestinations();
  const deleteMutation = useDeleteDestination();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this destination?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Destination deleted");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Manage Destinations</h1>
          <p className="text-navy-500">View, edit, and manage your listed destinations.</p>
        </div>
        <Link href="/dashboard/items/add" className="btn-primary">
          <Plus className="h-4 w-4" />
          Add New
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card animate-pulse p-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-lg bg-navy-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/3 rounded bg-navy-100" />
                  <div className="h-3 w-1/2 rounded bg-navy-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : destinations.length === 0 ? (
        <div className="card py-16 text-center">
          <MapPin className="mx-auto mb-4 h-16 w-16 text-navy-200" />
          <h3 className="mb-2 text-lg font-bold text-navy-900">No destinations yet</h3>
          <p className="mb-4 text-navy-500">Start by adding your first destination.</p>
          <Link href="/dashboard/items/add" className="btn-primary">
            <Plus className="h-4 w-4" /> Add Destination
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {destinations.map((dest: Destination) => (
            <div key={dest._id} className="card flex items-center gap-4 p-4 transition-all hover:shadow-md">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-navy-900">{dest.title}</h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-navy-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {dest.location.city}, {dest.location.country}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {dest.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {dest.price.toLocaleString()}
                  </span>
                  <span className="rounded-full bg-navy-100 px-2 py-0.5 text-xs capitalize">{dest.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/destinations/${dest._id}`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-navy-200 text-navy-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                  title="View"
                >
                  <Eye className="h-4 w-4" />
                </Link>
                <a
                  href={`/destinations/${dest._id}`}
                  target="_blank"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-navy-200 text-navy-600 transition-colors hover:bg-navy-50"
                  title="Open in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  onClick={() => handleDelete(dest._id)}
                  disabled={deleteMutation.isPending && deleteMutation.variables === dest._id}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-navy-200 text-navy-600 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
