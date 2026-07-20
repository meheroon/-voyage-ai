"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DestinationCard from "@/components/DestinationCard";
import SkeletonCard from "@/components/SkeletonCard";
import { useFeaturedDestinations } from "@/hooks/use-queries";
import { Destination } from "@/types";
import {
  Compass, Sparkles, Map, MessageCircle, BarChart3, Wand2, Shield,
  Globe, Users, Star, TrendingUp, ArrowRight, ChevronLeft, ChevronRight,
  Plane, Heart, Zap, CheckCircle2, Quote,
} from "lucide-react";

const testimonials = [
  { name: "Sarah Chen", role: "Solo Traveler", avatar: "SC", text: "VoyageAI completely changed how I plan trips. The AI chat understood exactly what I wanted and created a perfect 2-week Japan itinerary in minutes.", rating: 5 },
  { name: "Marcus Rivera", role: "Adventure Seeker", avatar: "MR", text: "The recommendations are eerily accurate. It suggested a hidden waterfall hike in Costa Rica that wasn't in any guidebook. Absolutely life-changing!", rating: 5 },
  { name: "Emma Johansson", role: "Family Vacationer", avatar: "EJ", text: "Planning family trips used to take weeks. With VoyageAI's trip planner, I got a kid-friendly Bali itinerary with budget breakdowns in under 5 minutes.", rating: 5 },
];

const stats = [
  { icon: Globe, value: "50+", label: "Countries Covered" },
  { icon: Users, value: "12K+", label: "Happy Travelers" },
  { icon: Star, value: "4.9", label: "Average Rating" },
  { icon: TrendingUp, value: "25K+", label: "Trips Planned" },
];

const faqs = [
  { q: "How does the AI trip planner work?", a: "Our AI analyzes your preferences, budget, travel dates, and interests to generate personalized itineraries with specific activities, restaurants, and accommodations for each day of your trip." },
  { q: "Is VoyageAI free to use?", a: "VoyageAI offers a free tier with basic AI chat and destination browsing. Premium features like advanced trip planning, content generation, and data analysis are available with our Pro plan." },
  { q: "Can I customize AI-generated itineraries?", a: "Absolutely! All AI-generated content serves as a starting point. You can modify, add, or remove any part of the itinerary to match your exact preferences." },
  { q: "How accurate are the AI recommendations?", a: "Our AI is trained on millions of travel reviews, local insights, and real traveler experiences. It continuously improves based on user feedback and updated travel data." },
  { q: "Can I save and share my travel plans?", a: "Yes! You can save unlimited trip plans, share them with travel companions, and access them from any device. Plans are automatically synced to your account." },
];

export default function HomePage() {
  const { data: featured = [], isLoading: loading } = useFeaturedDestinations();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-gradient-to-br from-navy-900 via-primary-900 to-navy-950 pt-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary-400 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-accent-400 blur-3xl" />
        </div>
        <div className="container-custom relative mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-400/20 bg-primary-500/10 px-4 py-1.5 text-sm font-medium text-primary-300">
                <Sparkles className="h-4 w-4" />
                AI-Powered Travel Planning
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Discover Your Next
                <span className="block bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                  Adventure
                </span>
              </h1>
              <p className="mb-8 max-w-lg text-lg text-navy-300">
                Let AI craft your perfect trip. From personalized itineraries to smart recommendations, VoyageAI transforms how you explore the world.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/explore" className="btn-accent !px-8 !py-3 text-base">
                  <Compass className="h-5 w-5" />
                  Explore Destinations
                </Link>
                <Link href="/dashboard/ai-planner" className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/20 px-8 py-3 text-base font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5">
                  <Wand2 className="h-5 w-5" />
                  Plan My Trip
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {["bg-primary-400", "bg-accent-400", "bg-emerald-400", "bg-purple-400"].map((bg, i) => (
                    <div key={i} className={`flex h-9 w-9 items-center justify-center rounded-full ${bg} border-2 border-navy-900 text-xs font-bold text-white`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">12,000+ travelers</p>
                  <p className="text-xs text-navy-400">already planning their next trip</p>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl">
                <Image src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800" alt="Tropical Beach" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
                    <Sparkles className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-900">AI Generated</p>
                    <p className="text-xs text-navy-500">Perfect itinerary ready</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 top-8 rounded-2xl bg-white p-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-100">
                    <Star className="h-4 w-4 fill-accent-500 text-accent-500" />
                  </div>
                  <span className="text-sm font-bold text-navy-900">4.9 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="section-padding bg-white">
        <div className="container-custom mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-navy-900 sm:text-4xl">Why Choose VoyageAI?</h2>
            <p className="mx-auto max-w-2xl text-navy-500">
              Powered by advanced AI, designed for modern travelers. Here&apos;s what makes us different.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Wand2, title: "AI Trip Planner", desc: "Generate complete day-by-day itineraries based on your preferences, budget, and travel dates in seconds." },
              { icon: MessageCircle, title: "AI Travel Chat", desc: "Ask anything about your destination. Our AI assistant provides real-time, context-aware travel advice." },
              { icon: Sparkles, title: "Smart Recommendations", desc: "Get personalized destination suggestions that match your travel style and past experiences." },
              { icon: Map, title: "Curated Destinations", desc: "Explore hand-picked destinations with detailed descriptions, photos, and traveler reviews." },
              { icon: BarChart3, title: "Travel Analytics", desc: "Analyze your travel data and spending patterns with AI-powered insights and visual reports." },
              { icon: Shield, title: "Secure & Private", desc: "Your data is encrypted and protected. We never share your personal information with third parties." },
            ].map((feature, i) => (
              <div key={i} className="card group p-6 transition-all hover:border-primary-200 hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-navy-900">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-navy-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="section-padding bg-navy-50">
        <div className="container-custom mx-auto">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="mb-3 text-3xl font-bold text-navy-900 sm:text-4xl">Popular Destinations</h2>
              <p className="text-navy-500">Hand-picked adventures loved by travelers worldwide.</p>
            </div>
            <Link href="/explore" className="hidden items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 sm:flex">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
              : featured.slice(0, 4).map((d: Destination) => <DestinationCard key={d._id} destination={d} />)
            }
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/explore" className="btn-primary">View All Destinations</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-padding bg-white">
        <div className="container-custom mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-navy-900 sm:text-4xl">How It Works</h2>
            <p className="mx-auto max-w-2xl text-navy-500">
              Three simple steps to your perfect trip.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "01", icon: Compass, title: "Tell Us Your Vision", desc: "Share your dream destination, travel dates, budget, and what excites you about travel." },
              { step: "02", icon: Sparkles, title: "AI Crafts Your Trip", desc: "Our AI analyzes thousands of data points to create a personalized itinerary tailored to you." },
              { step: "03", icon: Plane, title: "Travel With Confidence", desc: "Follow your AI-generated plan, make adjustments on the fly, and create unforgettable memories." },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="mb-6 text-5xl font-black text-navy-100">{item.step}</div>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-navy-900">{item.title}</h3>
                <p className="text-sm text-navy-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="mx-auto mb-3 h-8 w-8 text-primary-200" />
                <div className="text-3xl font-bold text-white sm:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-primary-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding bg-white">
        <div className="container-custom mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-navy-900 sm:text-4xl">What Travelers Say</h2>
            <p className="text-navy-500">Real stories from real travelers.</p>
          </div>
          <div className="mx-auto max-w-2xl">
            <div className="card p-8 text-center">
              <Quote className="mx-auto mb-4 h-10 w-10 text-primary-200" />
              <p className="mb-6 text-lg leading-relaxed text-navy-700">
                &ldquo;{testimonials[currentTestimonial].text}&rdquo;
              </p>
              <div className="mb-2 flex items-center justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold mb-2">
                {testimonials[currentTestimonial].avatar}
              </div>
              <p className="font-bold text-navy-900">{testimonials[currentTestimonial].name}</p>
              <p className="text-sm text-navy-500">{testimonials[currentTestimonial].role}</p>
              <div className="mt-4 flex justify-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`h-2.5 w-2.5 rounded-full transition-colors ${i === currentTestimonial ? "bg-primary-600" : "bg-navy-200"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section-padding bg-navy-900">
        <div className="container-custom mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Ready to Start Your Journey?</h2>
          <p className="mx-auto mb-8 max-w-xl text-navy-400">
            Join thousands of travelers who plan smarter with VoyageAI. Start your adventure today.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register" className="btn-accent !px-8 !py-3 text-base">
              <Zap className="h-5 w-5" />
              Get Started Free
            </Link>
            <Link href="/explore" className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 px-8 py-3 text-base font-semibold text-white transition-all hover:border-white/40">
              Browse Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-custom mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-navy-900 sm:text-4xl">Frequently Asked Questions</h2>
            <p className="text-navy-500">Everything you need to know about VoyageAI.</p>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-navy-900">{faq.q}</span>
                  <ChevronRight className={`h-5 w-5 shrink-0 text-navy-400 transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="border-t border-navy-100 px-5 pb-5 pt-4 text-sm text-navy-600">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
