"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from "lucide-react";
import { contactAPI } from "@/lib/api";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      await contactAPI.submit(form);
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy-900 to-primary-900 px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="container-custom mx-auto">
            <MessageCircle className="mx-auto mb-6 h-12 w-12 text-primary-400" />
            <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">Get in Touch</h1>
            <p className="mx-auto max-w-2xl text-lg text-navy-300">
              Have a question, suggestion, or partnership inquiry? We&apos;d love to hear from you.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom mx-auto">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Contact Info */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-navy-900">Contact Information</h2>
                <p className="text-navy-500">Reach out to us through any of these channels.</p>

                {[
                  { icon: Mail, label: "Email", value: "hello@voyageai.com", href: "mailto:hello@voyageai.com" },
                  { icon: Phone, label: "Phone", value: "+1 (234) 567-890", href: "tel:+1234567890" },
                  { icon: MapPin, label: "Address", value: "123 Travel Street, Adventure City, AC 12345", href: "https://maps.google.com" },
                  { icon: Clock, label: "Hours", value: "Mon - Fri, 9:00 AM - 6:00 PM" },
                ].map((info, i) => (
                  <a key={i} href={info.href || "#"} target={info.href?.startsWith("http") ? "_blank" : undefined} rel={info.href?.startsWith("http") ? "noopener noreferrer" : undefined} className="flex items-start gap-4 group">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-navy-500">{info.label}</p>
                      <p className="text-navy-900">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="card p-8">
                  {submitted ? (
                    <div className="flex flex-col items-center py-12 text-center">
                      <CheckCircle className="mb-4 h-16 w-16 text-emerald-500" />
                      <h3 className="mb-2 text-xl font-bold text-navy-900">Message Sent!</h3>
                      <p className="text-navy-500">We&apos;ll get back to you within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-sm font-medium text-navy-700">Name *</label>
                          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Your name" />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-navy-700">Email *</label>
                          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="your@email.com" />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-navy-700">Subject</label>
                        <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-field" placeholder="What's this about?" />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-navy-700">Message *</label>
                        <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-field h-36 resize-none" placeholder="Tell us more..." />
                      </div>
                      <button type="submit" disabled={loading} className="btn-primary">
                        <Send className="h-4 w-4" />
                        {loading ? "Sending..." : "Send Message"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
