"use client";

import { ReactNode } from "react";
import { storeUrl, STORE_NAME } from "../lib/platform";
import { usePlatform } from "../lib/usePlatform";
import StoreButtons from "./StoreButtons";

/**
 * Install calls to action that know which phone the visitor is holding.
 *
 * Before this, every page showed both store badges side by side and left the
 * visitor to pick, and tool pages converted almost nothing. Now a phone gets
 * one big button straight to its own store, and a computer gets a QR code.
 *
 * The server render links to `/get`, which redirects by User-Agent, so the
 * button works before hydration and without JavaScript. After hydration the
 * href becomes the store URL itself, so the `store_click` tracking in
 * lib/analytics.tsx (which matches store hosts) still sees the click.
 */

export { usePlatform };

function AppleGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" aria-hidden className={className} fill="currentColor">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" aria-hidden className={className} fill="currentColor">
      <path d="M325.3 234.3 104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
    </svg>
  );
}

/** One button to the visitor's own store. `size="lg"` for result cards, `"md"` for bars. */
export function GetAppButton({
  label,
  size = "lg",
  from,
  className = "",
}: {
  label?: string;
  size?: "md" | "lg";
  from: string;
  className?: string;
}) {
  const p = usePlatform();
  const mobile = p === "ios" || p === "android";
  const href = mobile ? storeUrl(p) : `/get?from=${from}`;
  const text =
    label ?? (p === "ios" ? "Install on iPhone" : p === "android" ? "Install on Android" : "Get the app on your phone");
  return (
    <a
      href={href}
      aria-label={mobile ? `Get Dietly Fit on ${STORE_NAME[p]}` : "Get Dietly Fit"}
      className={`get-app-btn whitespace-nowrap ${size === "lg" ? "get-app-btn-lg" : ""} ${className}`}
    >
      {p === "android" ? <PlayGlyph className="h-[18px] w-[18px]" /> : <AppleGlyph className="h-[19px] w-[19px] -mt-0.5" />}
      <span>{text}</span>
      <span aria-hidden className="get-app-arrow">→</span>
    </a>
  );
}

/**
 * The numbered install card used under every tool result and on content pages.
 * Phones: three steps and one button. Computers: a QR code to `/get`.
 */
export function InstallSteps({
  title,
  body,
  payoff,
  placement,
  className = "",
  compact = false,
}: {
  title: string;
  body?: ReactNode;
  /** Step 3, what the visitor gets once the app is open. */
  payoff: string;
  placement: string;
  className?: string;
  compact?: boolean;
}) {
  const p = usePlatform();
  const desktop = p === "desktop";
  const store = p === "android" ? "Google Play" : p === "ios" ? "the App Store" : "your app store";
  const steps = [
    { t: `Tap the button below`, d: `It opens Dietly Fit in ${store}.` },
    { t: "Install and open", d: "The download takes about 20 seconds." },
    { t: payoff, d: "Setup asks a few questions, then builds your plan." },
  ];

  return (
    <div
      data-placement={placement}
      className={`${compact ? "install-inline pt-5 border-t border-border" : "install-card p-6 md:p-8"} ${className}`}
    >
      <div className="flex items-center gap-2 mb-3 whitespace-nowrap">
        <span className="install-pill">Free download</span>
        <span className="text-[12px] text-fg-faint">iPhone and Android</span>
      </div>
      <h2 className={`${compact ? "text-[19px]" : "text-[22px] md:text-[26px]"} font-bold text-fg leading-tight tracking-tight`}>
        {title}
      </h2>
      {body ? <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{body}</p> : null}

      {desktop ? (
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="shrink-0 rounded-2xl bg-white p-3 shadow-[0_10px_40px_-10px_rgba(200,245,96,0.35)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/qr-get.svg" alt="QR code that opens Dietly Fit in your phone's app store" width={132} height={132} />
          </div>
          <div className="text-left">
            <ol className="space-y-2 text-[14px] text-fg-muted">
              <li><strong className="text-fg">1.</strong> Point your phone camera at the code</li>
              <li><strong className="text-fg">2.</strong> Tap the link. It opens your app store</li>
              <li><strong className="text-fg">3.</strong> {payoff}</li>
            </ol>
            <StoreButtons className="mt-4" height={36} />
          </div>
        </div>
      ) : (
        <>
          <ol className="mt-5 space-y-3">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className={`step-dot ${i === 0 ? "step-dot-on" : ""}`}>{i + 1}</span>
                <span className="pt-0.5">
                  <span className="block text-[15px] font-semibold text-fg leading-snug">{s.t}</span>
                  <span className="block text-[13px] text-fg-muted leading-snug mt-0.5">{s.d}</span>
                </span>
              </li>
            ))}
          </ol>
          <GetAppButton from={placement} className="mt-5 w-full" />
          {p ? (
            <p className="mt-3 text-center text-[12px] text-fg-faint">
              {p === "android" ? "On an iPhone? " : "On Android? "}
              <a
                href={p === "android" ? storeUrl("ios") : storeUrl("android")}
                className="underline hover:text-fg"
              >
                {p === "android" ? "Get it on the App Store" : "Get it on Google Play"}
              </a>
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}
