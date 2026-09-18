/**
 * Submits the sitemap's URLs to IndexNow (`§2.2` of SEO_PLAN.md).
 *
 *   npm run indexnow          # submit every URL in the sitemap
 *   npm run indexnow -- /vs   # submit one path (and anything under it)
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
// cannot drift from what actually exists.
const sitemapPath = ".next/server/app/sitemap.xml.body";
let urls;
try {
  urls = [...readFileSync(sitemapPath, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
} catch {
  console.error(`No built sitemap at ${sitemapPath}. Run \`npm run build\` first.`);
  process.exit(1);
}

const filter = process.argv[2];
if (filter) urls = urls.filter((u) => new URL(u).pathname.startsWith(filter));
if (!urls.length) {
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
