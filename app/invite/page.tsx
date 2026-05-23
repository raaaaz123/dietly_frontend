"use client";
import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function InviteContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  useEffect(() => {
    if (ref) {
      // Try to open the app automatically via custom scheme
      const timeout = setTimeout(() => {
        window.location.href = `dietlyai://invite?ref=${ref}`;
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [ref]);

  return (
    <div className="min-h-screen bg-bg text-fg flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-accent/20">
        <span className="text-accent-ink font-black text-2xl">V</span>
      </div>
      
      <h1 className="text-3xl font-black mb-3 text-fg">You&apos;ve been invited!</h1>
      <p className="text-muted max-w-sm mx-auto mb-8">
        Download the Dietly Ai app to claim your special offer and get started on your health journey.
      </p>

      {ref && (
        <div className="bg-elevated border border-border p-5 rounded-2xl mb-8 max-w-sm w-full">
          <p className="text-xs font-bold text-muted tracking-widest mb-2">YOUR REFERRAL CODE</p>
          <code className="text-2xl font-black text-accent block">{ref}</code>
        </div>
      )}

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <a 
          href="https://apps.apple.com/app/idYOUR_APP_ID" 
          className="bg-fg text-bg font-bold py-4 rounded-xl hover:opacity-90 transition-opacity"
        >
          Download for iOS
        </a>
        <a 
          href="https://play.google.com/store/apps/details?id=com.dietlyai.app" 
          className="bg-elevated text-fg border border-border font-bold py-4 rounded-xl hover:bg-ghost transition-colors"
        >
          Download for Android
        </a>
      </div>
      
      <p className="text-xs text-muted mt-8 max-w-xs">
        If you already have the app installed, it should open automatically.
      </p>
    </div>
  );
}

export default function InvitePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <InviteContent />
    </Suspense>
  );
}
