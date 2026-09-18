/**
 * Asserts the site has one canonical host (`§1.2` of SEO_PLAN.md).
 *
 *   npm run check:host
 *
 * This is the one Phase 1 item that cannot be fixed from the repo — it is a
 * Vercel domain setting — so this script exists to say, in one command, whether
 * somebody has done it yet.
 *
 * What "done" looks like:
 *   - the host in `SITE_URL` answers 200 directly, no redirect
 *   - the other host answers 308 (permanent) to it, not 307
 *   - `robots.txt` on the canonical host returns the file, not "Redirecting..."
 *
 * 307 matters as much as the direction: a temporary redirect tells Google not to
 * pass authority to the target, so a split host on 307s leaks the value of every
 * link the site has ever earned.
 */
import { readFileSync } from "node:fs";

const SITE_URL = readFileSync("app/lib/site.ts", "utf8").match(/SITE_URL = "([^"]+)"/)?.[1];
const canonical = new URL(SITE_URL);
const other = new URL(SITE_URL);
other.host = canonical.host.startsWith("www.")
  ? canonical.host.slice(4)
  : `www.${canonical.host}`;

const failures = [];
const note = (s) => console.log("  " + s);

console.log(`canonical host: ${canonical.origin}`);
const main = await fetch(canonical.origin, { redirect: "manual" });
note(`${canonical.origin} -> HTTP ${main.status}${main.headers.get("location") ? ` -> ${main.headers.get("location")}` : ""}`);
if (main.status !== 200) {
  failures.push(`${canonical.origin} should answer 200, got ${main.status}. Every canonical, sitemap entry and llms.txt link names this host.`);
}

console.log(`other host: ${other.origin}`);
const alt = await fetch(other.origin, { redirect: "manual" });
note(`${other.origin} -> HTTP ${alt.status}${alt.headers.get("location") ? ` -> ${alt.headers.get("location")}` : ""}`);
if (alt.status === 307 || alt.status === 302) {
  failures.push(`${other.origin} redirects with ${alt.status} (temporary). It must be 308 or 301, or authority is not passed.`);
} else if (alt.status !== 308 && alt.status !== 301) {
  failures.push(`${other.origin} should 308 to the canonical host, got ${alt.status}.`);
}

// `redirect: "manual"` is load-bearing. fetch follows redirects by default, so
// without it this fetched the apex, silently followed the 307 to www, got the
// real file and reported a pass — which is the exact bug it is meant to catch.
const robots = await fetch(`${canonical.origin}/robots.txt`, { redirect: "manual" });
const body = await robots.text();
note(`${canonical.origin}/robots.txt -> HTTP ${robots.status}, ${body.length} bytes`);
if (robots.status !== 200) {
  failures.push(`robots.txt on the canonical host returns ${robots.status} instead of the file. Crawlers that only hit the apex never read our rules.`);
} else if (!body.includes("Sitemap:")) {
  failures.push(`robots.txt on the canonical host has no Sitemap line — it is probably a redirect stub.`);
}

if (failures.length) {
  console.error("\nHost check failed:\n" + failures.map((f) => `  ✗ ${f}`).join("\n"));
  console.error("\nFix: in Vercel → Project → Settings → Domains, set " +
    `${canonical.host} as primary and let ${other.host} redirect to it.`);
  process.exit(1);
}
console.log("\nHost check passed: one canonical host, permanent redirect, robots.txt served.");
