"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "10 Hidden Gems in Southeast Asia You Need to Visit",
    excerpt: "Discover lesser-known destinations that offer authentic experiences without the crowds. From secret beaches in Cambodia to ancient temples in Myanmar, these spots will transform your travel bucket list.",
    category: "Destinations",
    author: "Sarah Chen",
    date: "Dec 15, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=600",
    content: "Southeast Asia is a treasure trove of hidden gems waiting to be explored. Beyond the well-trodden paths of Bangkok and Bali lie destinations that offer authentic cultural experiences, breathtaking natural beauty, and warm hospitality — all without the overwhelming crowds. In Cambodia, the ancient temples of Banteay Chhmar provide a serene alternative to Angkor Wat, while Myanmar's Hpa-An offers stunning limestone karsts and cave systems. The Philippines' Kalanggaman Island boasts crystal-clear waters and pristine sandbars that rival any Maldivian resort. These hidden gems remind us that the best travel experiences often lie just off the beaten path.",
  },
  {
    id: 2,
    title: "How AI is Transforming Travel Planning in 2025",
    excerpt: "From personalized itineraries to real-time recommendations, explore how artificial intelligence is revolutionizing the way we plan and experience travel.",
    category: "Technology",
    author: "Alex Rivera",
    date: "Dec 10, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600",
    content: "Artificial intelligence is fundamentally changing how we approach travel planning. Modern AI assistants can analyze thousands of data points — from weather patterns and local events to personal preferences and budget constraints — to create hyper-personalized itineraries in seconds. These systems learn from each interaction, continuously improving their recommendations. Voice-activated AI guides provide real-time cultural context as you explore, while predictive algorithms help travelers find the best deals on flights and accommodation. The future of travel is intelligent, personalized, and more accessible than ever before.",
  },
  {
    id: 3,
    title: "Budget Travel: How to See the World for Less",
    excerpt: "Smart tips and strategies for traveling on a budget without sacrificing experiences. Learn how to find deals, save on accommodation, and eat like a local.",
    category: "Tips",
    author: "Marcus Johnson",
    date: "Dec 5, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600",
    content: "Traveling on a budget doesn't mean settling for less — it means traveling smarter. Start by being flexible with your dates; midweek flights and shoulder-season travel can save you hundreds. Embrace local transportation like buses and trains instead of taxis. Stay in hostels, guesthouses, or local homestays for authentic experiences at a fraction of hotel prices. Eat where the locals eat — street food markets and family-run restaurants offer incredible meals for a few dollars. Use fare comparison tools and set price alerts to snag the best deals. With the right strategies, even the most budget-conscious traveler can explore the world.",
  },
  {
    id: 4,
    title: "The Ultimate Packing Guide for Every Climate",
    excerpt: "Whether you're heading to the tropics or the Arctic, this comprehensive packing guide ensures you bring everything you need and nothing you don't.",
    category: "Tips",
    author: "Emma Larsson",
    date: "Nov 28, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1553531384-397c80973a0b?w=600",
    content: "Packing is both an art and a science. The key to packing well is layering — choose versatile pieces that can be mixed and matched across multiple outfits. For tropical destinations, pack lightweight, breathable fabrics and don't forget sunscreen and insect repellent. Cold-weather travel calls for thermal base layers, a quality down jacket, and waterproof outer shells. Always pack a small first-aid kit, universal power adapter, and important documents in your carry-on. Rolling clothes instead of folding saves space and reduces wrinkles. And remember: the best packing tip is to pack half of what you think you need.",
  },
  {
    id: 5,
    title: "Sustainable Travel: How to Explore Responsibly",
    excerpt: "Learn practical ways to minimize your environmental impact while traveling. From choosing eco-friendly accommodations to reducing carbon footprint.",
    category: "Sustainability",
    author: "Sarah Chen",
    date: "Nov 20, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    content: "Sustainable travel is about making conscious choices that minimize our impact on the environment and support local communities. Start by choosing eco-certified accommodations that use renewable energy and practice waste reduction. Offset your carbon emissions by investing in verified carbon offset programs. Travel slowly — spending more time in fewer places reduces your carbon footprint while allowing deeper cultural immersion. Support local businesses, eat locally sourced food, and respect wildlife and natural habitats. Carry a reusable water bottle, shop bag, and utensils to reduce single-use plastic. Every small action adds up to make a meaningful difference.",
  },
  {
    id: 6,
    title: "Solo Travel Safety: A Complete Guide",
    excerpt: "Everything you need to know about staying safe while traveling alone. Tips for solo travelers of all experience levels, from first-timers to veterans.",
    category: "Safety",
    author: "Alex Rivera",
    date: "Nov 15, 2024",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600",
    content: "Solo travel is one of the most rewarding experiences you can have, but safety should always be a priority. Research your destination thoroughly before arriving — understand local customs, know which areas to avoid, and learn a few key phrases in the local language. Keep digital copies of all important documents and share your itinerary with someone back home. Trust your instincts — if a situation feels wrong, remove yourself from it. Stay connected by getting a local SIM card or international data plan. Meet other travelers at hostels and group tours, but always maintain awareness of your surroundings. With proper preparation, solo travel can be both safe and transformative.",
  },
];

const categories = ["All", "Destinations", "Technology", "Tips", "Sustainability", "Safety"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy-900 to-primary-900 px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="container-custom mx-auto">
            <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">Travel Blog</h1>
            <p className="mx-auto max-w-2xl text-lg text-navy-300">
              Insights, tips, and stories to inspire your next adventure.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="section-padding">
          <div className="container-custom mx-auto">
            {/* Category Filter */}
            <div className="mb-8 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-primary-600 text-white"
                      : "border border-navy-200 text-navy-600 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Featured Post (first when showing all) */}
            {activeCategory === "All" && filtered.length > 0 && (
              <div className="mb-8 card overflow-hidden">
                <div className="grid lg:grid-cols-2">
                  <div className="relative aspect-[16/10] lg:aspect-auto bg-navy-100">
                    <img src={filtered[0].image} alt={filtered[0].title} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-8">
                    <span className="mb-3 inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                      {filtered[0].category}
                    </span>
                    <h2 className="mb-3 text-2xl font-bold text-navy-900">{filtered[0].title}</h2>
                    <p className="mb-4 text-navy-500">{filtered[0].excerpt}</p>
                    <div className="mb-4 flex items-center gap-4 text-xs text-navy-400">
                      <span className="flex items-center gap-1"><User className="h-3 w-3" /> {filtered[0].author}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {filtered[0].date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {filtered[0].readTime}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700">
                      Read More <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Post Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(activeCategory === "All" ? filtered.slice(1) : filtered).map((post) => (
                <Link key={post.id} href={`/blog#${post.id}`} className="card group overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden bg-navy-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy-700 backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 text-lg font-bold text-navy-900 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="mb-3 line-clamp-2 text-sm text-navy-500">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-navy-400">
                      <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-lg font-medium text-navy-500">No posts found in this category.</p>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
