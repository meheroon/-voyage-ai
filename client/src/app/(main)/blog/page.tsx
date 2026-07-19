"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, User, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "10 Hidden Gems in Southeast Asia You Need to Visit",
    excerpt: "Discover lesser-known destinations that offer authentic experiences without the crowds. From secret beaches in Cambodia to ancient temples in Myanmar.",
    category: "Destinations",
    author: "Sarah Chen",
    date: "2024-12-15",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=600",
  },
  {
    id: 2,
    title: "How AI is Transforming Travel Planning in 2025",
    excerpt: "From personalized itineraries to real-time recommendations, explore how artificial intelligence is revolutionizing the way we plan and experience travel.",
    category: "Technology",
    author: "Alex Rivera",
    date: "2024-12-10",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600",
  },
  {
    id: 3,
    title: "Budget Travel: How to See the World for Less",
    excerpt: "Smart tips and strategies for traveling on a budget without sacrificing experiences. Learn how to find deals, save on accommodation, and eat like a local.",
    category: "Tips",
    author: "Marcus Johnson",
    date: "2024-12-05",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600",
  },
  {
    id: 4,
    title: "The Ultimate Packing Guide for Every Climate",
    excerpt: "Whether you're heading to the tropics or the Arctic, this comprehensive packing guide ensures you bring everything you need and nothing you don't.",
    category: "Tips",
    author: "Emma Larsson",
    date: "2024-11-28",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1553531384-397c80973a0b?w=600",
  },
  {
    id: 5,
    title: "Sustainable Travel: How to Explore Responsibly",
    excerpt: "Learn practical ways to minimize your environmental impact while traveling. From choosing eco-friendly accommodations to reducing carbon footprint.",
    category: "Sustainability",
    author: "Sarah Chen",
    date: "2024-11-20",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
  },
  {
    id: 6,
    title: "Solo Travel Safety: A Complete Guide",
    excerpt: "Everything you need to know about staying safe while traveling alone. Tips for solo travelers of all experience levels, from first-timers to veterans.",
    category: "Safety",
    author: "Alex Rivera",
    date: "2024-11-15",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600",
  },
];

const categories = ["All", "Destinations", "Technology", "Tips", "Sustainability", "Safety"];

export default function BlogPage() {
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
                <button key={cat} className="rounded-full border border-navy-200 px-4 py-2 text-sm font-medium text-navy-600 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700">
                  {cat}
                </button>
              ))}
            </div>

            {/* Featured Post */}
            <div className="mb-8 card overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-[16/10] lg:aspect-auto">
                  <img src={blogPosts[0].image} alt={blogPosts[0].title} className="h-full w-full object-cover" />
                </div>
                <div className="p-8">
                  <span className="mb-3 inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                    {blogPosts[0].category}
                  </span>
                  <h2 className="mb-3 text-2xl font-bold text-navy-900">{blogPosts[0].title}</h2>
                  <p className="mb-4 text-navy-500">{blogPosts[0].excerpt}</p>
                  <div className="mb-4 flex items-center gap-4 text-xs text-navy-400">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {blogPosts[0].author}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {blogPosts[0].date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {blogPosts[0].readTime}</span>
                  </div>
                  <button className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700">
                    Read More <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Post Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.slice(1).map((post) => (
                <div key={post.id} className="card group overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
