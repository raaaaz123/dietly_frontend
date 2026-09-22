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

// Comparison pages are a dynamic route, but every slug is prerendered by
// `generateStaticParams`, so the built HTML lands beside the others.
const VS_SLUGS = readFileSync("app/lib/competitors.ts", "utf8")
  .matchAll(/^\s{4}slug: "([a-z0-9-]+)",$/gm);
EXPECTED["vs"] = "/vs";
EXPECTED["best-ai-body-scan-apps"] = "/best-ai-body-scan-apps";
EXPECTED["best-workout-apps"] = "/best-workout-apps";
for (const [, slug] of VS_SLUGS) EXPECTED[`vs/${slug}`] = `/vs/${slug}`;

// The exercise cluster. Only the hubs and facets are asserted indexable — the
// individual movement pages are deliberately `noindex, follow` until somebody
// authors written coaching for them (see `isIndexable` in lib/exercises), so
// asserting a canonical on 507 of them would assert the opposite of the design.
const EX = JSON.parse(readFileSync("app/lib/exercises.generated.json", "utf8"));
const exSlugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const exCategories = [...new Set(EX.exercises.map((e) => e.category))]
  .filter(Boolean)
  .filter((n) => EX.exercises.filter((e) => e.category === n).length >= 8);
// The workout cluster. Registered from the source file so a new plan is
// covered by the canonical, title-length and og:image guards automatically —
// the same reason the tool and guide registries are read rather than listed.
const WORKOUT_SLUGS = [
  ...readFileSync("app/lib/workouts.ts", "utf8").matchAll(/^    slug: "([a-z0-9-]+)",$/gm),
].map((m) => m[1]);
EXPECTED["workouts"] = "/workouts";
for (const slug of WORKOUT_SLUGS) {
  EXPECTED[`workouts/${slug}`] = `/workouts/${slug}`;
}

EXPECTED["exercises"] = "/exercises";
for (const name of exCategories) {
  EXPECTED[`exercises/muscle/${exSlugify(name)}`] = `/exercises/muscle/${exSlugify(name)}`;
}
for (const k of ["bodyweight", "minimal", "gym"]) {
  EXPECTED[`exercises/equipment/${k}`] = `/exercises/equipment/${k}`;
}

// A registry that stops matching the regex above would silently check nothing,
// and a check that silently checks nothing is worse than no check.
const toolCount = Object.keys(EXPECTED).filter(
  (k) => k.endsWith("-calculator"),
).length;
const guideCount = Object.keys(EXPECTED).filter((k) => k.startsWith("guides/")).length;
const vsCount = Object.keys(EXPECTED).filter((k) => k.startsWith("vs/")).length;
const exCount = Object.keys(EXPECTED).filter((k) => k.startsWith("exercises/")).length;
if (toolCount < 8 || guideCount < 4 || vsCount < 5 || exCount < 10) {
  console.error(
    `Found ${toolCount} tools, ${guideCount} guides, ${vsCount} comparisons and ` +
      `${exCount} exercise hubs in the registries — a slug pattern in this script has drifted.`,
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
  // The title template appends " | Dietly Fit"; a page title that also ends in it
  // rendered "… | Dietly Fit | Dietly Fit" on every sub-page for months.
  if ((title.match(/\| Dietly Fit/g) ?? []).length > 1) {
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

// A comparison page's whole defence is that its claims about someone else's
// product are dated and sourced. Both of those are easy to lose by editing the
// shell, and losing them turns the page from "checkable" into "assertion".
for (const name of Object.keys(EXPECTED).filter((k) => k.startsWith("vs/"))) {
  const file = `${DIR}/${name}.html`;
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  if (!/<time datetime="\d{4}-\d{2}-\d{2}"/i.test(html)) {
    failures.push(`${name}: missing the machine-readable "facts checked" date`);
  }
  if (!html.includes("is not affiliated with")) {
    failures.push(`${name}: missing the trademark / non-affiliation notice`);
  }
  if (!/Where these .* facts came from/.test(html)) {
    failures.push(`${name}: missing the rendered sources list`);
  }
  // The rival has to win somewhere. See the note at the top of
  // `app/lib/competitors.ts` for why this is a build failure and not a
  // stylistic preference.
  if (!/Where .* is better/.test(html)) {
    failures.push(`${name}: missing the section on where the competitor is better`);
  }
}

// The roundup names our own app among the products it ranks. Saying so is the
// only thing that makes the format honest, so it is not optional.
{
  const file = `${DIR}/best-ai-body-scan-apps.html`;
  if (existsSync(file)) {
    const html = readFileSync(file, "utf8");
    if (!html.includes("We make one of these")) {
      failures.push("best-ai-body-scan-apps: missing the conflict-of-interest disclosure");
    }
  }
}

// Every indexable page needs its own share card. /tools, /guides and /vs each
// shipped without one and silently fell back to the homepage image, so a share
// of the calculator hub said nothing about calculators.
for (const [name, expected] of Object.entries(EXPECTED)) {
  if (expected === null) continue;
  const file = `${DIR}/${name}.html`;
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  if (!/<meta property="og:image"/.test(html)) {
    failures.push(`${name}: no og:image — add an opengraph-image.tsx for this route`);
  }
}

// A calculator that renders an FAQ must emit the matching `FAQPage`, and every
// answer in that markup must be visible on the page. /macro-calculator and
// /body-fat-calculator predate the tool registry and were the two that rendered
// questions while emitting nothing; the reverse mistake — markup describing
// answers a visitor cannot see — is the one that earns a manual action.
for (const name of Object.keys(EXPECTED).filter((k) => k.endsWith("-calculator"))) {
  const file = `${DIR}/${name}.html`;
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  const faq = blocks
    .map(([, j]) => { try { return JSON.parse(j); } catch { return null; } })
    .find((d) => d && d["@type"] === "FAQPage");
  if (!faq) {
    failures.push(`${name}: renders an FAQ but emits no FAQPage schema`);
    continue;
  }
  // Compare decoded text, not raw HTML. React escapes an apostrophe to
  // `&#x27;`, so a raw substring match reported /protein-calculator's "anabolic
  // window" answer as missing when it was rendered perfectly well.
  const decode = (t) =>
    t
      .replace(/&#x27;|&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ");
  const visible = decode(html.replace(/<script.*?<\/script>/gs, " ").replace(/<[^>]+>/g, " "));
  for (const entry of faq.mainEntity ?? []) {
    const answer = decode(entry.acceptedAnswer?.text ?? "");
    if (!visible.includes(answer.slice(0, 40))) {
      failures.push(`${name}: FAQPage answer not visible on the page — "${entry.name}"`);
    }
  }
}

// A movement page with no written coaching must not be indexable, and the
// sitemap must not list it. Both are easy to undo by "fixing" the robots tag.
//
// This reads the *rendered page* rather than the generated JSON. It used to
// read the JSON, which was right while the snapshot was the only source of
// prose — but coaching is now authored in `app/lib/coaching.ts` and merged
// over the snapshot, so the JSON says "thin" about pages that render a full
// set of steps. Asking the HTML is both correct across that change and a
// stricter question: it checks what we actually published, not what we meant
// to. A page may only be indexable if a reader can see steps on it.
{
  const pages = EX.exercises
    .map((e) => `${DIR}/exercises/${e.slug}.html`)
    .filter((f) => existsSync(f));
  for (const file of pages) {
    const html = readFileSync(file, "utf8");
    const slug = file.slice(`${DIR}/exercises/`.length, -".html".length);
    const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? "";
    const hasSteps = /<h2[^>]*>\s*How to do it\s*<\/h2>/.test(html);
    if (!hasSteps && !robots.includes("noindex")) {
      failures.push(
        `exercises/${slug}: has no written steps but is indexable — thin pages must be noindex`,
      );
    }
    // The other direction matters too: authoring steps and leaving the page
    // noindex is silent wasted work, and nothing else would ever report it.
    if (hasSteps && robots.includes("noindex")) {
      failures.push(
        `exercises/${slug}: has written steps but is still noindex — it should be allowed to rank`,
      );
    }
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
