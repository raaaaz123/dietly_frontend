import type { Metadata } from "next";

/**
 * `/invite` is a referral hand-off, not a page anyone should arrive at from a
 * search result: it exists to bounce someone into the app or a store. The page
 * itself is a client component, so its metadata has to live here.
 *
 * Noindexed for the same reason `/f/[code]` is — an invite is addressed to one
 * person, and a crawler following one is a crawler using it.
 */
export const metadata: Metadata = {
  title: { absolute: "You've been invited to Dietly Fit" },
  robots: { index: false, follow: false },
};

export default function InviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
