/**
 * Submits the sitemap's URLs to IndexNow (`§2.2` of SEO_PLAN.md).
 *
 *   npm run indexnow          # submit every URL in the sitemap
 *   npm run indexnow -- /vs   # submit one path (and anything under it)
 *   node scripts/indexnow.mjs --live --since=3
 *                             # read the deployed sitemap, submit only URLs
 *                             # whose <lastmod> is within the last 3 days
 *
 * `--live --since` is what `.github/workflows/indexnow.yml` runs after every
 * production deploy: Bing had crawled 17 URLs in three months (Webmaster
 * Tools, 2026-11-05), so pushing changes on deploy beats remembering to.
 *
 * Why this exists: Bing's index is what ChatGPT's search grounding leans on, so
 * being slow into Bing means being absent from a large share of the AI answers
 * this whole programme is aimed at. IndexNow turns "wait for a crawl" into a
 * push, and Bing, Yandex, Seznam and Naver all consume the same endpoint.
 *
 * Ownership is proved by serving the key at `<host>/<key>.txt`. That file lives
 * in `public/` and the key is in `lib/site.ts` — both have to agree or every
 * submission 403s.
 *
 * This deliberately refuses to run when the canonical host redirects. Submitting
 * URLs on a host that 307s to somewhere else is worse than not submitting: it
 * spends the quota telling search engines to look at addresses we ourselves
 * bounce them away from. That is `§1.2`, and it has to be fixed in Vercel first.
 */
import { readFileSync } from "node:fs";

const ENDPOINT = "https://api.indexnow.org/indexnow";

const site = readFileSync("app/lib/site.ts", "utf8");
const pick = (name) => site.match(new RegExp(`${name} = "([^"]+)"`))?.[1];
const SITE_URL = pick("SITE_URL");
const KEY = pick("INDEXNOW_KEY");

if (!SITE_URL || !KEY) {
  console.error("Could not read SITE_URL / INDEXNOW_KEY from app/lib/site.ts");
  process.exit(1);
}
const host = new URL(SITE_URL).host;

// The sitemap is generated from the registries, so it is the one list that
// cannot drift from what actually exists. `--live` reads the deployed one, for
// CI, where there is no local build.
const args = process.argv.slice(2);
const live = args.includes("--live");
const sinceArg = args.find((a) => a.startsWith("--since="));
const sinceDays = sinceArg ? Number(sinceArg.split("=")[1]) : null;
const filter = args.find((a) => !a.startsWith("--"));

const sitemapPath = ".next/server/app/sitemap.xml.body";
let xml;
if (live) {
  const r = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!r.ok) {
    console.error(`${SITE_URL}/sitemap.xml returned ${r.status}`);
    process.exit(1);
  }
  xml = await r.text();
} else {
  try {
    xml = readFileSync(sitemapPath, "utf8");
  } catch {
    console.error(`No built sitemap at ${sitemapPath}. Run \`npm run build\` first.`);
    process.exit(1);
  }
}

let entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
  loc: m[1].match(/<loc>([^<]+)<\/loc>/)?.[1],
  lastmod: m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
})).filter((e) => e.loc);

if (sinceDays !== null) {
  // Resubmitting unchanged URLs on every deploy is the pattern IndexNow asks
  // publishers not to follow; only what the sitemap says changed goes out.
  const cutoff = Date.now() - sinceDays * 86_400_000;
  entries = entries.filter((e) => e.lastmod && Date.parse(e.lastmod) >= cutoff);
}

let urls = entries.map((e) => e.loc);
if (filter) urls = urls.filter((u) => new URL(u).pathname.startsWith(filter));
if (!urls.length) {
  if (sinceDays !== null) {
    console.log(`IndexNow: nothing changed in the last ${sinceDays} days; nothing submitted.`);
    process.exit(0);
  }
  console.error(filter ? `No sitemap URLs start with "${filter}".` : "Sitemap is empty.");
  process.exit(1);
}

// ── Guard: the canonical host must serve itself, not redirect (§1.2) ────────
const keyUrl = `${SITE_URL}/${KEY}.txt`;
const probe = await fetch(SITE_URL, { redirect: "manual" });
if (probe.status >= 300 && probe.status < 400) {
  console.error(
    `${SITE_URL} returns ${probe.status} -> ${probe.headers.get("location")}\n` +
      `The canonical host redirects, so these URLs would be submitted for a host we\n` +
      `bounce crawlers away from. Fix §1.2 in Vercel (make the apex primary, www 308s\n` +
      `to it) before submitting, or change SITE_URL to whichever host is primary.`,
  );
  process.exit(1);
}

const keyProbe = await fetch(keyUrl);
if (!keyProbe.ok) {
  console.error(`${keyUrl} returned ${keyProbe.status}. Deploy the key file before submitting.`);
  process.exit(1);
}
if ((await keyProbe.text()).trim() !== KEY) {
  console.error(`${keyUrl} does not contain the key in lib/site.ts.`);
  process.exit(1);
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation: keyUrl, urlList: urls }),
});

// 200 accepted, 202 accepted but key still being validated. Anything else is a
// real failure and worth a non-zero exit so CI notices.
if (res.status === 200 || res.status === 202) {
  console.log(`IndexNow: submitted ${urls.length} URLs for ${host} (HTTP ${res.status})`);
  for (const u of urls) console.log(`  ${new URL(u).pathname || "/"}`);
} else {
  console.error(`IndexNow returned HTTP ${res.status}\n${await res.text()}`);
  process.exit(1);
}
