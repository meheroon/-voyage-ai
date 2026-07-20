import Link from "next/link";
import { Star, MapPin, Clock, ArrowRight } from "lucide-react";
import { Destination } from "@/types";

const categoryColors: Record<string, string> = {
  beach: "bg-blue-100 text-blue-700",
  mountain: "bg-emerald-100 text-emerald-700",
  city: "bg-purple-100 text-purple-700",
  cultural: "bg-amber-100 text-amber-700",
  adventure: "bg-red-100 text-red-700",
  luxury: "bg-pink-100 text-pink-700",
  budget: "bg-teal-100 text-teal-700",
};

const fallbackImage = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800";

export default function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <div className="card group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
        <img
          src={destination.images?.[0] || fallbackImage}
          alt={destination.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
        />
        <div className="absolute left-3 top-3">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${categoryColors[destination.category] || "bg-navy-100 text-navy-700"}`}>
            {destination.category}
          </span>
        </div>
        <div className="absolute right-3 top-3">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-navy-900 backdrop-blur-sm">
            ${destination.price.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="mb-2 text-lg font-bold text-navy-900 group-hover:text-primary-600 transition-colors">
          {destination.title}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm text-navy-500">{destination.shortDescription}</p>
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-navy-500">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-primary-500" />
            {destination.location.city}, {destination.location.country}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-accent-500" />
            {destination.duration}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {destination.rating} ({destination.reviewCount})
          </span>
        </div>
        <Link
          href={`/destinations/${destination._id}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
        >
          View Details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
