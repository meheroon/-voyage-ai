"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export default function GoogleProvider({ children }: { children: React.ReactNode }) {
  if (!clientId) {
    // Still wrap in provider so child components don't crash
    // They just won't function without a valid client ID
    return <GoogleOAuthProvider clientId="missing">{children}</GoogleOAuthProvider>;
  }
  return <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>;
}
