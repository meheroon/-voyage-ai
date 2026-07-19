"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DestinationCard from "@/components/DestinationCard";
import { destinationAPI } from "@/lib/api";
import { Destination, Review } from "@/types";
import { useAuth } from "@/providers/AuthProvider";
import toast from "react-hot-toast";
import {
  MapPin, Clock, Star, DollarSign, Check, Calendar, Users,
  Shield, Mountain, ArrowLeft, Heart, Share2,
} from "lucide-react";

export default function DestinationDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "", pros: "", cons: "" });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (params.id) {
      destinationAPI.getById(params.id as string).then((res) => {
        setDestination(res.data.data.destination);
        setReviews(res.data.data.reviews);
        setRelated(res.data.data.relatedDestinations);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [params.id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error("Please login to leave a review"); return; }
    if (!reviewForm.comment.trim()) { toast.error("Please write a review"); return; }
    setSubmittingReview(true);
    try {
      const res = await destinationAPI.addReview(params.id as string, {
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        pros: reviewForm.pros ? reviewForm.pros.split(",").map((s) => s.trim()) : [],
        cons: reviewForm.cons ? reviewForm.cons.split(",").map((s) => s.trim()) : [],
      });
      setReviews([res.data.data, ...reviews]);
      setReviewForm({ rating: 5, comment: "", pros: "", cons: "" });
      toast.success("Review submitted!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-50">
        <Navbar />
        <div className="flex items-center justify-center pt-32">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-navy-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center pt-32">
          <p className="text-lg text-navy-500">Destination not found</p>
          <Link href="/explore" className="btn-primary mt-4">Back to Explore</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-50">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-navy-500">
            <Link href="/explore" className="flex items-center gap-1 hover:text-primary-600">
              <ArrowLeft className="h-4 w-4" />
              Explore
            </Link>
            <span>/</span>
            <span className="text-navy-700">{destination.title}</span>
          </div>

          {/* Image Gallery */}
          <div className="mb-8 grid gap-4 lg:grid-cols-3">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl lg:col-span-2">
              <Image
                src={destination.images[selectedImage] || destination.images[0]}
                alt={destination.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
              {destination.images.slice(1, 3).map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(i + 1)}
                  className="relative aspect-[16/10] cursor-pointer overflow-hidden rounded-2xl"
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="33vw" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title & Info */}
              <div>
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700 capitalize">
                    {destination.category}
                  </span>
                  <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold text-navy-600 capitalize">
                    {destination.difficulty}
                  </span>
                </div>
                <h1 className="mb-3 text-3xl font-bold text-navy-900 sm:text-4xl">{destination.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-navy-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-primary-500" />
                    {destination.location.city}, {destination.location.country}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-accent-500" />
                    {destination.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {destination.rating} ({destination.reviewCount} reviews)
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="card p-6">
                <h2 className="mb-3 text-xl font-bold text-navy-900">About This Destination</h2>
                <p className="leading-relaxed text-navy-600 whitespace-pre-line">{destination.description}</p>
              </div>

              {/* Highlights */}
              <div className="card p-6">
                <h2 className="mb-4 text-xl font-bold text-navy-900">Highlights</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {destination.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-navy-600">
                      <Check className="h-4 w-4 text-primary-500" />
                      {h}
                    </div>
                  ))}
                </div>
              </div>

              {/* Included */}
              <div className="card p-6">
                <h2 className="mb-4 text-xl font-bold text-navy-900">What&apos;s Included</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {destination.included.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-navy-600">
                      <Shield className="h-4 w-4 text-emerald-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="card p-6">
                <h2 className="mb-4 text-xl font-bold text-navy-900">Reviews ({reviews.length})</h2>
                {reviews.length === 0 ? (
                  <p className="text-navy-500">No reviews yet. Be the first to review!</p>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review._id} className="border-b border-navy-100 pb-4 last:border-0">
                        <div className="mb-2 flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                            {review.user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-navy-900">{review.user.name}</p>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-navy-200"}`} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-navy-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Review Form */}
                {user && (
                  <form onSubmit={handleReviewSubmit} className="mt-6 border-t border-navy-100 pt-6">
                    <h3 className="mb-3 font-semibold text-navy-900">Write a Review</h3>
                    <div className="mb-3">
                      <label className="mb-1 block text-sm text-navy-600">Rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((r) => (
                          <button key={r} type="button" onClick={() => setReviewForm({ ...reviewForm, rating: r })}>
                            <Star className={`h-6 w-6 ${r <= reviewForm.rating ? "fill-amber-400 text-amber-400" : "text-navy-200"}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      placeholder="Share your experience..."
                      className="input-field mb-3 h-24 resize-none"
                    />
                    <input
                      value={reviewForm.pros}
                      onChange={(e) => setReviewForm({ ...reviewForm, pros: e.target.value })}
                      placeholder="Pros (comma separated)"
                      className="input-field mb-3"
                    />
                    <input
                      value={reviewForm.cons}
                      onChange={(e) => setReviewForm({ ...reviewForm, cons: e.target.value })}
                      placeholder="Cons (comma separated)"
                      className="input-field mb-3"
                    />
                    <button type="submit" disabled={submittingReview} className="btn-primary">
                      {submittingReview ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <div className="card sticky top-24 p-6">
                <div className="mb-4 flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-bold text-navy-900">${destination.price.toLocaleString()}</span>
                    <span className="ml-1 text-sm text-navy-500">/ person</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-navy-900">{destination.rating}</span>
                  </div>
                </div>

                <div className="mb-4 space-y-3 rounded-xl bg-navy-50 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-navy-500">Duration</span>
                    <span className="font-medium text-navy-900">{destination.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-navy-500">Difficulty</span>
                    <span className="font-medium capitalize text-navy-900">{destination.difficulty}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-navy-500">Best Seasons</span>
                    <span className="font-medium capitalize text-navy-900">{destination.season.join(", ")}</span>
                  </div>
                </div>

                <button className="btn-primary mb-3 w-full">
                  <Calendar className="h-4 w-4" />
                  Book Now
                </button>
                <div className="flex gap-2">
                  <button className="btn-outline flex-1 !py-2">
                    <Heart className="h-4 w-4" />
                    Save
                  </button>
                  <button className="btn-outline flex-1 !py-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                </div>
              </div>

              {/* Best For */}
              <div className="card p-6">
                <h3 className="mb-3 font-bold text-navy-900">Best For</h3>
                <div className="flex flex-wrap gap-2">
                  {destination.bestFor.map((tag, i) => (
                    <span key={i} className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 capitalize">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Destinations */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-navy-900">Related Destinations</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((d) => <DestinationCard key={d._id} destination={d} />)}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
