import { hubOgImage, size, contentType } from "../components/hubOg";

export { size, contentType };
export const alt = "Support — Dietly";

/**
 * /support was the only page on the site with no share card at all.
 *
 * Not an oversight in the usual sense: it declares its own `openGraph` block,
 * and in Next's App Router declaring `openGraph` without an `images` key
 * suppresses the root `app/opengraph-image.tsx` that /privacy, /terms and
 * /delete-account all inherit. So the pages that said nothing about themselves
 * got a card and this one did not. `check-seo.mjs` now asserts an og:image on
 * every indexable route.
 */
export default function Image() {
  return hubOgImage({
    kicker: "Support",
    heading: "Help with Dietly",
    footnote: "Subscriptions, account deletion, billing · dietly.life",
  });
}
