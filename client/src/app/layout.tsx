import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import GoogleProvider from "@/providers/GoogleProvider";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VoyageAI - AI-Powered Travel Planning",
  description: "Discover your next adventure with AI-powered travel recommendations, smart itinerary planning, and personalized travel guides.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleProvider>
          <QueryProvider>
            <AuthProvider>
              {children}
              <ScrollToTop />
              <Toaster position="top-right" toastOptions={{ duration: 3000, style: { borderRadius: "10px", background: "#1e293b", color: "#f8fafc" } }} />
            </AuthProvider>
          </QueryProvider>
        </GoogleProvider>
      </body>
    </html>
  );
}
