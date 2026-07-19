"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { Compass, Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, googleLogin } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      await login("demo@voyageai.com", "demo123");
      toast.success("Welcome to VoyageAI!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Demo login failed. Please register first.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    // Simulated Google login for demo
    try {
      await googleLogin("Google User", "user@gmail.com", "");
      toast.success("Welcome via Google!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 flex items-center justify-center gap-2 lg:justify-start">
            <Compass className="h-8 w-8 text-primary-600" strokeWidth={2.5} />
            <span className="text-2xl font-bold text-navy-900">
              Voyage<span className="text-primary-600">AI</span>
            </span>
          </Link>

          <h1 className="mb-2 text-2xl font-bold text-navy-900">Welcome back</h1>
          <p className="mb-8 text-navy-500">Sign in to continue your travel journey.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full !py-3">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-navy-200" />
            <span className="text-xs text-navy-400">or continue with</span>
            <div className="h-px flex-1 bg-navy-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleGoogleLogin} className="btn-outline !py-2.5">
              <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
              Google
            </button>
            <button onClick={handleDemoLogin} disabled={loading} className="btn-primary !bg-accent-500 hover:!bg-accent-600 !py-2.5">
              <LogIn className="h-4 w-4" />
              Demo Login
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-navy-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-primary-600 hover:text-primary-700">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden bg-gradient-to-br from-primary-600 to-navy-900 lg:flex lg:flex-1 lg:items-center lg:justify-center">
        <div className="max-w-md px-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm">
            <Compass className="h-10 w-10 text-white" />
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white">Plan Smarter, Travel Better</h2>
          <p className="text-lg text-primary-200">
            Let our AI assistant craft the perfect itinerary for your next adventure.
          </p>
        </div>
      </div>
    </div>
  );
}
