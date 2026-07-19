"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  googleLogin: (name: string, email: string, avatar: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("voyageai_token");
    const savedUser = localStorage.getItem("voyageai_user");

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("voyageai_token");
        localStorage.removeItem("voyageai_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authAPI.login({ email, password });
    const { user: userData, token } = res.data.data;
    localStorage.setItem("voyageai_token", token);
    localStorage.setItem("voyageai_user", JSON.stringify(userData));
    setUser(userData);
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await authAPI.register({ name, email, password });
    const { user: userData, token } = res.data.data;
    localStorage.setItem("voyageai_token", token);
    localStorage.setItem("voyageai_user", JSON.stringify(userData));
    setUser(userData);
  };

  const googleLogin = async (name: string, email: string, avatar: string) => {
    const res = await authAPI.googleLogin({ name, email, avatar, googleId: "google_" + email });
    const { user: userData, token } = res.data.data;
    localStorage.setItem("voyageai_token", token);
    localStorage.setItem("voyageai_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("voyageai_token");
    localStorage.removeItem("voyageai_user");
    setUser(null);
    router.push("/");
  };

  const updateUser = (updatedUser: User) => {
    localStorage.setItem("voyageai_user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
