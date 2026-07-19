"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Compass, Target, Users, Heart, Globe, Shield, Zap, Award } from "lucide-react";

const team = [
  { name: "Alex Rivera", role: "Founder & CEO", avatar: "AR", desc: "Passionate about leveraging AI to transform travel experiences." },
  { name: "Sarah Chen", role: "Head of AI", avatar: "SC", desc: "Former Google AI researcher building the future of travel planning." },
  { name: "Marcus Johnson", role: "Lead Designer", avatar: "MJ", desc: "Crafting beautiful and intuitive travel interfaces." },
  { name: "Emma Larsson", role: "Travel Expert", avatar: "EL", desc: "20+ years in the travel industry, ensuring authentic recommendations." },
];

const values = [
  { icon: Target, title: "Innovation First", desc: "We push the boundaries of AI to make travel planning effortless and personalized." },
  { icon: Heart, title: "Traveler-Centric", desc: "Every feature we build starts with a real traveler need. Your journey drives our product." },
  { icon: Shield, title: "Trust & Safety", desc: "We prioritize your privacy and security. Your data is encrypted and never shared." },
  { icon: Globe, title: "Global Perspective", desc: "We celebrate diversity in travel. Our AI understands cultures from every corner of the world." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy-900 to-primary-900 px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="container-custom mx-auto">
            <Compass className="mx-auto mb-6 h-12 w-12 text-primary-400" />
            <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">About VoyageAI</h1>
            <p className="mx-auto max-w-2xl text-lg text-navy-300">
              We&apos;re on a mission to make every trip extraordinary through the power of artificial intelligence.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="section-padding">
          <div className="container-custom mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-navy-900">Our Story</h2>
              <p className="mb-4 text-navy-600 leading-relaxed">
                VoyageAI was born from a simple frustration: planning trips takes too long, and generic travel guides miss what makes each traveler unique. We believed AI could change that.
              </p>
              <p className="mb-4 text-navy-600 leading-relaxed">
                Founded in 2024, our team of travel enthusiasts and AI engineers set out to build an intelligent travel companion that truly understands you. Today, VoyageAI helps thousands of travelers discover hidden gems, craft perfect itineraries, and make every journey unforgettable.
              </p>
              <p className="text-navy-600 leading-relaxed">
                We&apos;re not just building software — we&apos;re building the future of travel, where every trip is personalized, every recommendation is spot-on, and every traveler feels understood.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="section-padding bg-navy-50">
          <div className="container-custom mx-auto">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-navy-900">Our Mission</h2>
                <p className="mb-6 text-navy-600 leading-relaxed">
                  To democratize travel planning by making AI-powered trip design accessible to everyone. We envision a world where the perfect trip is just a conversation away.
                </p>
                <div className="space-y-4">
                  {[
                    "AI that truly understands your travel style",
                    "Personalized recommendations from real traveler data",
                    "Itineraries crafted in seconds, not days",
                    "A travel companion that learns and improves",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100">
                        <Zap className="h-3 w-3 text-primary-600" />
                      </div>
                      <span className="text-navy-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "12K+", label: "Happy Travelers" },
                  { value: "25K+", label: "Trips Planned" },
                  { value: "50+", label: "Countries" },
                  { value: "4.9", label: "User Rating" },
                ].map((stat, i) => (
                  <div key={i} className="card p-6 text-center">
                    <div className="text-3xl font-bold text-primary-600">{stat.value}</div>
                    <div className="mt-1 text-sm text-navy-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding">
          <div className="container-custom mx-auto">
            <h2 className="mb-12 text-center text-3xl font-bold text-navy-900">Our Values</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((val, i) => (
                <div key={i} className="card p-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50">
                    <val.icon className="h-7 w-7 text-primary-600" />
                  </div>
                  <h3 className="mb-2 font-bold text-navy-900">{val.title}</h3>
                  <p className="text-sm text-navy-500">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section-padding bg-navy-50">
          <div className="container-custom mx-auto">
            <h2 className="mb-12 text-center text-3xl font-bold text-navy-900">Meet the Team</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member, i) => (
                <div key={i} className="card p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-xl font-bold text-primary-700">
                    {member.avatar}
                  </div>
                  <h3 className="font-bold text-navy-900">{member.name}</h3>
                  <p className="mb-2 text-sm text-primary-600">{member.role}</p>
                  <p className="text-xs text-navy-500">{member.desc}</p>
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
