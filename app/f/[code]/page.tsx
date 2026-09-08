import type { Metadata } from "next";
import { APP_STORE_URL, PLAY_STORE_URL, SITE_URL } from "@/app/lib/site";
import InviteOpener from "./InviteOpener";

/**
 * A friend invite link.
 *
 * Reached two ways, and the difference matters. On a phone with the app
 * installed, iOS opens the app directly and this page is never drawn — that is
 * what the apple-app-site-association file buys. Everywhere else (a desktop, an
 * Android phone, an iPhone without the app) this is what they get, and its only
 * job is to show the code and point at a store.
 *
 * The code is shown large and on its own, because it is the mechanism that
 * always works: whatever happens with deep links, somebody can read eight
 * characters and type them into the app.
 */

const CODE = /^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{8}$/;

type Props = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const clean = code.toUpperCase();
  return {
    title: "You've been invited to Dietly",
    description:
      "Join their ladder. Ranked by what you actually lift for your bodyweight — not by who posts the most.",
    alternates: { canonical: `${SITE_URL}/f/${clean}` },
    openGraph: {
      title: "You've been invited to Dietly",
      description: "Join their ladder — ranked by what you actually lift.",
      url: `${SITE_URL}/f/${clean}`,
    },
    // An invite is for one person. It should never turn up in search results,
    // and a crawler following it would be one more "use" of a live code.
    robots: { index: false, follow: false },
  };
}

export default async function FriendInvite({ params }: Props) {
  const { code } = await params;
  const clean = (code || "").toUpperCase();
  const valid = CODE.test(clean);

  return (
    <main className="min-h-screen bg-bg text-fg flex flex-col items-center justify-center p-6 text-center">
      {valid && <InviteOpener code={clean} />}

      <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-accent/20">
        <span className="text-accent-ink font-black text-2xl">D</span>
      </div>

      <h1 className="text-3xl font-black mb-3 text-fg">
        {valid ? "You've been invited" : "That link isn't valid"}
      </h1>

      <p className="text-muted max-w-sm mx-auto mb-8">
        {valid
          ? "Join their ladder. It's ranked by what you actually lift for your bodyweight — so more time in the gym doesn't move you up on its own."
          : "Invite codes are eight characters. Ask them to send theirs again."}
      </p>

      {valid && (
        <div className="bg-elevated border border-border p-5 rounded-2xl mb-8 max-w-sm w-full">
          <p className="text-xs font-bold text-muted tracking-widest mb-2">
            THEIR INVITE CODE
          </p>
          <code className="text-3xl font-black text-accent block tracking-[0.2em]">
            {clean.slice(0, 4)} {clean.slice(4)}
          </code>
          <p className="text-xs text-muted mt-3">
            Already have Dietly? Training → Friends → Add a friend, and type this in.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <a
          href={APP_STORE_URL}
          className="bg-fg text-bg font-bold py-4 rounded-xl hover:opacity-90 transition-opacity"
        >
          Get it on the App Store
        </a>
        <a
          href={PLAY_STORE_URL}
          className="border border-border text-fg font-bold py-4 rounded-xl hover:bg-elevated transition-colors"
        >
          Get it on Google Play
        </a>
      </div>
    </main>
  );
}
