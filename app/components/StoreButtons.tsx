import { APP_STORE_URL, PLAY_STORE_URL } from "../lib/site";

/* Re-exported so the existing importers (MobileCTA) keep working while the
   URLs themselves live in one place. The App Store link used to be the old
   "dietly-ai-snap-calories" slug — Apple redirects a stale slug on the same id,
   but it is the pre-pivot name sitting in every share sheet and preview card. */
export { APP_STORE_URL, PLAY_STORE_URL };

/**
 * The official store badges.
 *
 * This replaces a pair of hand-drawn buttons — our own Apple glyph, our own
 * "DOWNLOAD ON / App Store" lockup, our own radius. They were competent and
 * they were also the one thing on the page a store reviewer is entitled to
 * object to: both Apple and Google publish the artwork and both sets of brand
 * guidelines say to use it as supplied, unaltered.
 *
 * The two assets do not agree about their own bounds, which is the whole
 * reason this file needs a comment:
 *
 * - Apple ships `download-on-the-app-store.svg` at 119.66 × 40 with no
 *   padding. Its ratio is 2.992.
 * - Google ships a 646 × 250 PNG with 41px of mandatory clear space baked into
 *   every edge. Its *content* is 564 × 168, ratio 3.357.
 *
 * Rendered at the same box height those two look nothing alike — Google's sits
 * visibly smaller inside its own margin. So `public/badges/google-play.png` is
 * the asset cropped to its content box, and both are then drawn to the same
 * content height via `--badge-h`. The clear space Google asks for still exists;
 * it is the flex `gap` and the surrounding layout rather than transparent
 * pixels inside the file.
 *
 * Neither badge is recoloured, outlined or rounded — only scaled, which is what
 * both guidelines permit.
 */

const APPLE_RATIO = 119.66407 / 40;
const GOOGLE_RATIO = 564 / 168;

type Props = {
  /** Content height of both badges, in px. */
  height?: number;
  /** Stretch to full width on mobile (default true) */
  fullWidthMobile?: boolean;
  className?: string;
};

export default function StoreButtons({
  height = 44,
  fullWidthMobile = true,
  className = "",
}: Props) {
  const style = { "--badge-h": `${height}px` } as React.CSSProperties;

  return (
    <div
      className={`flex flex-wrap items-center gap-3 ${
        fullWidthMobile ? "" : "justify-center"
      } ${className}`}
      style={style}
    >
      <a
        href={APP_STORE_URL}
        className="store-badge"
        aria-label="Download Dietly on the App Store"
      >
        {/* Plain <img>: next/image refuses SVG without `dangerouslyAllowSVG`,
            and turning that on site-wide to render one trusted vendor asset is
            a bad trade. The explicit width/height reserve the box, so this
            costs no layout shift. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/badges/app-store.svg"
          alt="Download on the App Store"
          width={Math.round(height * APPLE_RATIO)}
          height={height}
        />
      </a>
      <a
        href={PLAY_STORE_URL}
        className="store-badge"
        aria-label="Get Dietly on Google Play"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/badges/google-play.png"
          alt="Get it on Google Play"
          width={Math.round(height * GOOGLE_RATIO)}
          height={height}
        />
      </a>
    </div>
  );
}
