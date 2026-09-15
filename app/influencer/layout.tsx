import type { Metadata } from "next";
import { InfluencerAuthProvider } from "../lib/influencer-auth";

/**
 * The creator dashboard and its login.
 *
 * Two jobs. It supplies the auth context both pages under it read via
 * `useInfluencerAuth`, and it marks the section `noindex`: these are signed-in
 * surfaces with nothing to offer a search result, and while
 * `/influencer/login` was already disallowed in robots.ts, the dashboard
 * itself was not. robots.txt stops a crawl and `noindex` stops an index — they
 * are different mechanisms, and a page linked from anywhere needs both.
 *
 * This file is a server component so it can export `metadata`.
 * `InfluencerAuthProvider` carries its own "use client", so rendering it from
 * here keeps the client boundary where it already was.
 */
export const metadata: Metadata = {
  title: "Creator Dashboard",
  robots: { index: false, follow: false },
};

export default function InfluencerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <InfluencerAuthProvider>{children}</InfluencerAuthProvider>;
}
