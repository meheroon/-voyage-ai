import Link from "next/link";
import { Compass, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-300">
      <div className="container-custom mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Compass className="h-7 w-7 text-primary-400" strokeWidth={2.5} />
              <span className="text-xl font-bold text-white">
                Voyage<span className="text-primary-400">AI</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-navy-400">
              AI-powered travel planning that transforms your dream destinations into perfectly crafted itineraries.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-800 text-navy-400 transition-colors hover:bg-primary-600 hover:text-white">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-800 text-navy-400 transition-colors hover:bg-primary-600 hover:text-white">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-800 text-navy-400 transition-colors hover:bg-primary-600 hover:text-white">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-800 text-navy-400 transition-colors hover:bg-primary-600 hover:text-white">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h3>
            <ul className="mt-4 space-y-2">
              {[
                { href: "/explore", label: "All Destinations" },
                { href: "/explore?category=beach", label: "Beach Getaways" },
                { href: "/explore?category=adventure", label: "Adventures" },
                { href: "/explore?category=cultural", label: "Cultural Trips" },
                { href: "/explore?category=luxury", label: "Luxury Escapes" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-navy-400 transition-colors hover:text-primary-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Tools */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">AI Tools</h3>
            <ul className="mt-4 space-y-2">
              {[
                { href: "/dashboard/ai-chat", label: "AI Travel Chat" },
                { href: "/dashboard/ai-planner", label: "Trip Planner" },
                { href: "/dashboard/ai-generator", label: "Content Generator" },
                { href: "/dashboard/ai-recommendations", label: "Recommendations" },
                { href: "/dashboard/ai-analyzer", label: "Data Analyzer" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-navy-400 transition-colors hover:text-primary-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contact Us</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3 text-sm text-navy-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                <span>123 Travel Street, Adventure City, AC 12345</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-navy-400">
                <Mail className="h-4 w-4 shrink-0 text-primary-400" />
                <a href="mailto:hello@voyageai.com" className="hover:text-primary-400">hello@voyageai.com</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-navy-400">
                <Phone className="h-4 w-4 shrink-0 text-primary-400" />
                <a href="tel:+1234567890" className="hover:text-primary-400">+1 (234) 567-890</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-800">
        <div className="container-custom mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-navy-500">
            &copy; {new Date().getFullYear()} VoyageAI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/about" className="text-xs text-navy-500 hover:text-primary-400">About Us</Link>
            <Link href="/contact" className="text-xs text-navy-500 hover:text-primary-400">Support</Link>
            <Link href="/blog" className="text-xs text-navy-500 hover:text-primary-400">Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
