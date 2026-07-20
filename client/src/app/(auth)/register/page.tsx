"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import dynamic from "next/dynamic";
import { Compass, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const GoogleLoginButton = dynamic(
  () => import("@react-oauth/google").then((mod) => {
    const { GoogleLogin } = mod;
    return function GoogleLoginWrapper({ onSuccess, onError }: { onSuccess: (cr: any) => void; onError: () => void }) {
      return <GoogleLogin onSuccess={onSuccess} onError={onError} theme="outline" size="large" width="100%" text="signup_with" shape="rectangular" />;
    };
  }),
  { ssr: false }
);

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, googleLogin } = useAuth();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await register(name, email, password);
      toast.success("Account created! Welcome to VoyageAI!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden bg-gradient-to-br from-accent-500 to-navy-900 lg:flex lg:flex-1 lg:items-center lg:justify-center">
        <div className="max-w-md px-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm">
            <Compass className="h-10 w-10 text-white" />
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white">Start Your Journey Today</h2>
          <p className="text-lg text-accent-200">
            Join thousands of travelers planning smarter with AI-powered insights.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 flex items-center justify-center gap-2 lg:justify-start">
            <Compass className="h-8 w-8 text-primary-600" strokeWidth={2.5} />
            <span className="text-2xl font-bold text-navy-900">
              Voyage<span className="text-primary-600">AI</span>
            </span>
          </Link>

          <h1 className="mb-2 text-2xl font-bold text-navy-900">Create your account</h1>
          <p className="mb-8 text-navy-500">Join VoyageAI and start exploring the world.</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field pl-10"
                  placeholder="John Doe"
                  autoComplete="name"
                />
              </div>
            </div>
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
                  autoComplete="email"
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
                  placeholder="Min. 6 characters"
                  autoComplete="new-password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full !py-3">
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-navy-200" />
            <span className="text-xs text-navy-400">or</span>
            <div className="h-px flex-1 bg-navy-200" />
          </div>

          <div className="flex justify-center">
            <GoogleLoginButton
              onSuccess={async (credentialResponse: any) => {
                if (credentialResponse.credential) {
                  try {
                    await googleLogin(credentialResponse.credential);
                    toast.success("Welcome via Google!");
                    router.push("/dashboard");
                  } catch (err: any) {
                    toast.error(err.response?.data?.message || "Google login failed");
                  }
                }
              }}
              onError={() => {
                toast.error("Google login failed. Please try again.");
              }}
            />
          </div>

          <p className="mt-6 text-center text-sm text-navy-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary-600 hover:text-primary-700">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
