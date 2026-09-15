/**
 * Asserts the SEO invariants that broke silently once already.
 *
 * Run against `.next/server/app` after a build. The canonical bug that took
 * /macro-calculator and /body-fat-calculator out of the index was invisible in
 * review — the pages looked fine, and the wrong tag came from metadata
 * inherited from the root layout, which is not written anywhere near them. The
 * only place it is visible is the rendered HTML, so that is what this reads.
 *
 *   node scripts/check-seo.mjs
 */
import { readFileSync, existsSync } from "node:fs";

const SITE = "https://dietly.life";
const DIR = ".next/server/app";

// Tool slugs come from the registry, so a calculator added there is checked
// here automatically rather than being remembered about.
const TOOL_SLUGS = readFileSync("app/lib/tools.ts", "utf8")
  .matchAll(/^\s{4}slug: "([a-z0-9-]+)",$/gm);

// path on disk → the canonical it must declare, or null for "must be noindex"
const EXPECTED = {
  index: "/",
  tools: "/tools",
  support: "/support",
  privacy: "/privacy",
  terms: "/terms",
  "delete-account": "/delete-account",
  invite: null,
  influencer: null,
  "influencer/login": null,
};

for (const [, slug] of TOOL_SLUGS) EXPECTED[slug] = `/${slug}`;

// Guides live one level down, so their built HTML does too.
const GUIDE_SLUGS = readFileSync("app/lib/guides.ts", "utf8")
  .matchAll(/^\s{4}slug: "([a-z0-9-]+)",$/gm);
EXPECTED["guides"] = "/guides";
for (const [, slug] of GUIDE_SLUGS) EXPECTED[`guides/${slug}`] = `/guides/${slug}`;

// A registry that stops matching the regex above would silently check nothing,
// and a check that silently checks nothing is worse than no check.
const toolCount = Object.keys(EXPECTED).filter(
  (k) => k.endsWith("-calculator"),
).length;
const guideCount = Object.keys(EXPECTED).filter((k) => k.startsWith("guides/")).length;
if (toolCount < 8 || guideCount < 4) {
  console.error(
    `Found ${toolCount} tools and ${guideCount} guides in the registries — the slug pattern in this script has drifted.`,
  );
  process.exit(1);
}

const failures = [];

for (const [name, expected] of Object.entries(EXPECTED)) {
  const file = `${DIR}/${name}.html`;
  if (!existsSync(file)) {
    failures.push(`${name}: no built HTML at ${file}`);
    continue;
  }
  const html = readFileSync(file, "utf8");
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? "";
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";

  if (expected === null) {
    if (!robots.includes("noindex")) {
      failures.push(`${name}: expected noindex, got robots="${robots}"`);
    }
    continue;
  }

  const want = expected === "/" ? SITE : `${SITE}${expected}`;
  if (canonical !== want) {
    failures.push(`${name}: canonical is "${canonical}", expected "${want}"`);
  }
  if (robots.includes("noindex")) {
    failures.push(`${name}: is noindex but should be indexable`);
  }
  // The title template appends " | Dietly"; a page title that also ends in it
  // rendered "… | Dietly | Dietly" on every sub-page for months.
  if ((title.match(/\| Dietly/g) ?? []).length > 1) {
    failures.push(`${name}: brand appears twice in title "${title}"`);
  }
  if (title.length > 65) {
    failures.push(`${name}: title is ${title.length} chars, will truncate: "${title}"`);
  }
}

// Every guide must carry the medical disclaimer and a machine-readable review
// date. Both are structural trust signals for health content, and both are easy
// to drop by editing the shell without noticing.
for (const name of Object.keys(EXPECTED).filter((k) => k.startsWith("guides/"))) {
  const file = `${DIR}/${name}.html`;
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  if (!html.includes("Not medical advice")) {
    failures.push(`${name}: missing the medical disclaimer`);
  }
  // Case-insensitive: React's server renderer emits `dateTime`, and HTML
  // attribute names are case-insensitive, so both spellings are correct output.
  if (!/<time datetime="\d{4}-\d{2}-\d{2}"/i.test(html)) {
    failures.push(`${name}: missing a machine-readable updated date`);
  }
}

// Structured data must parse. A malformed ld+json block is invisible in the
// browser and silently ignored by every consumer it was written for.
for (const name of Object.keys(EXPECTED)) {
  const file = `${DIR}/${name}.html`;
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  const blocks = [
    ...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs),
  ];
  for (const [, json] of blocks) {
    try {
      JSON.parse(json);
    } catch (e) {
      failures.push(`${name}: unparseable JSON-LD (${e.message})`);
    }
  }
}

if (failures.length) {
  console.error("SEO checks failed:\n" + failures.map((f) => `  ✗ ${f}`).join("\n"));
  process.exit(1);
}
console.log(`SEO checks passed (${Object.keys(EXPECTED).length} routes).`);
