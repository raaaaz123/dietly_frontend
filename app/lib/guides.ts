/**
 * The editorial pages, described once — same pattern as `lib/tools.ts`.
 *
 * These exist because the homepage sells a Form Score and nothing on the site
 * explains what one is. A term you coined and never defined is a term nobody
 * can search for and no model can describe, so the cluster below is the
 * definitional work the product positioning has been missing.
 *
 * `updated` is a real date and it is rendered on the page. Health content
 * without a visible review date is content Google's raters are told to
 * distrust, and the date being honest is the only version of that worth having.
 */

export type Guide = {
  slug: string;
  title: string;
  /** The <h1>. Allowed to differ from the SERP title. */
  heading: string;
  description: string;
  blurb: string;
  keywords: string[];
  published: string;
  updated: string;
  /** Minutes, rounded. Rendered, so it should be roughly true. */
  readingMinutes: number;
  related: string[];
};

export const GUIDES: Guide[] = [
  {
    slug: "what-is-a-physique-score",
    title: "What Is a Physique Score? How Photo Scoring Works",
    heading: "What is a physique score?",
    description:
      "What a physique score measures, how photo-based scoring actually works, what it can and cannot tell you, and how it differs from BMI, body fat percentage and a DEXA scan.",
    blurb:
      "What the number means, how it is produced, and the four things it cannot see.",
    keywords: [
      "physique score",
      "body scan app",
      "ai physique analysis",
      "photo body fat estimate",
    ],
    published: "2026-09-15",
    updated: "2026-09-15",
    readingMinutes: 7,
    related: ["progress-photos-guide", "body-recomposition"],
  },
  {
    slug: "progress-photos-guide",
    title: "How to Take Progress Photos That Are Actually Comparable",
    heading: "How to take progress photos worth comparing",
    description:
      "Lighting, distance, pose, time of day and the small things that make two photos comparable. A repeatable setup so the difference you see is a real change, not a change in conditions.",
    blurb: "A repeatable setup, so week-to-week differences mean something.",
    keywords: [
      "progress photos",
      "how to take progress pictures",
      "body transformation photos",
      "fitness progress tracking",
    ],
    published: "2026-09-15",
    updated: "2026-09-15",
    readingMinutes: 6,
    related: ["what-is-a-physique-score", "body-recomposition"],
  },
  {
    slug: "body-recomposition",
    title: "Body Recomposition: Why the Scale Stops Being Useful",
    heading: "Body recomposition, and why the scale stops being useful",
    description:
      "How losing fat and building muscle at the same time hides from a bathroom scale, who can actually recomp, how long it takes, and what to measure instead of bodyweight.",
    blurb: "Losing fat and gaining muscle at once — and why weight barely moves.",
    keywords: [
      "body recomposition",
      "lose fat gain muscle",
      "scale not moving",
      "recomp",
    ],
    published: "2026-09-15",
    updated: "2026-09-15",
    readingMinutes: 8,
    related: ["what-is-a-physique-score", "training-around-a-weak-point"],
  },
  {
    slug: "training-around-a-weak-point",
    title: "How to Train Around a Weak Point",
    heading: "How to train around a weak point",
    description:
      "How to find the lagging muscle group that is actually holding your physique back, how to prioritise it without losing everything else, and how long to give it before judging.",
    blurb: "Finding the lagging area, and prioritising it without losing the rest.",
    keywords: [
      "lagging muscle group",
      "weak point training",
      "specialization phase",
      "bring up weak body part",
    ],
    published: "2026-09-15",
    updated: "2026-09-15",
    readingMinutes: 7,
    related: ["what-is-a-physique-score", "body-recomposition"],
  },
];

export const GUIDE_BY_SLUG = new Map(GUIDES.map((g) => [g.slug, g]));

export function guide(slug: string): Guide {
  const found = GUIDE_BY_SLUG.get(slug);
  if (!found) throw new Error(`Unknown guide slug: ${slug}`);
  return found;
}

export function guideMetadata(slug: string) {
  const g = guide(slug);
  return {
    title: g.title,
    description: g.description,
    keywords: g.keywords,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: {
      title: g.title,
      description: g.description,
      url: `/guides/${g.slug}`,
      type: "article" as const,
      publishedTime: g.published,
      modifiedTime: g.updated,
    },
  };
}
