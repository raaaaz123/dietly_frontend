"use client";
import { InfluencerAuthProvider } from "../lib/influencer-auth";

export default function InfluencerLayout({ children }: { children: React.ReactNode }) {
  return (
    <InfluencerAuthProvider>
      {children}
    </InfluencerAuthProvider>
  );
}
