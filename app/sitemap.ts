import { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";
import { TOOLS } from "./lib/tools";
import { GUIDES } from "./lib/guides";

/**
 * Generated from the tool registry plus a short list of fixed pages.
 *
 * The hand-written array this replaced went stale the moment anyone added a
 * route, and it stamped every entry with `new Date()` — telling crawlers that
 * all seven pages, terms of service included, changed on every deploy. A
 * sitemap that cries wolf about freshness is one whose dates get ignored, which
 * costs us the one thing the field is for.
 *
 * Tool pages carry their own `lastModified` in `lib/tools.ts`. Update it there
 * when the page's content actually changes.
 */
type Entry = MetadataRoute.Sitemap[number];

const page = (
  path: string,
  lastModified: string,
  changeFrequency: Entry["changeFrequency"],
  priority: number,
): Entry => ({
  // `/` would make the homepage "https://dietly.life/", while its canonical
  // says "https://dietly.life". Two spellings of one URL is the whole problem
  // this file was cleaned up for.
  url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
  lastModified,
  changeFrequency,
  priority,
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    page("/", "2026-09-13", "weekly", 1.0),
    page("/tools", "2026-09-15", "monthly", 0.8),
    ...TOOLS.map((t) => page(`/${t.slug}`, t.lastModified, "monthly", 0.9)),
    page("/guides", "2026-09-15", "monthly", 0.8),
    ...GUIDES.map((g) => page(`/guides/${g.slug}`, g.updated, "monthly", 0.8)),
    page("/support", "2026-09-13", "monthly", 0.7),
    page("/privacy", "2026-09-13", "yearly", 0.4),
    page("/terms", "2026-09-13", "yearly", 0.4),
    page("/delete-account", "2026-09-15", "yearly", 0.3),
  ];
}
