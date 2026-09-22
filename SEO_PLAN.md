# Dietly SEO & AI-Visibility Plan

Goal: grow two channels that now send us close to nothing — classic organic search,
and citations inside LLM answers (ChatGPT, Claude, Perplexity, Google AI Overviews).
The single conversion that matters is an App Store / Play Store click.

Status of every claim below: audited against the live site on 2026-09-15. Where a
number is unverified (search volumes, current rankings) it is marked **unverified** —
those need Search Console and a keyword tool before we act on them.

---

## Status — 2026-09-22 (rev 3)

Audited against the **live** site and the **live store listings**, not against this
file. The picture has changed since rev 2 in one good way and one bad one: the
technical foundation is now essentially sound, and the store listings turn out to be
the weakest link in the whole funnel — a channel rev 1 and rev 2 never looked at.

### What got fixed since rev 2

`§1.2` **the host split is resolved.** The apex is primary and serves its own
robots.txt:

```
https://dietly.life/            200
https://www.dietly.life/        307 -> https://dietly.life/
https://dietly.life/robots.txt  200, 759 bytes
```

Canonicals, the sitemap and llms.txt all now name a host that answers rather than
one that bounces. **One flag is left:** the www redirect is still **307 (temporary)**,
which tells Google not to pass authority through it. `npm run check:host` fails on
exactly that and prints the Vercel fix. It is a dashboard toggle, not a code change.

**The whole content surface is deployed.** `/vs/*`, `/best-ai-body-scan-apps`, the
guides, the eight calculators and the exercise hubs all return 200 on the apex. The
sitemap carries 43 URLs — rev 2 was written while the comparison cluster was still
repo-only.

**Vercel Analytics is live** (`/_vercel/insights/script.js` returns 200), so raw
traffic is finally visible. PostHog is still dark — `POSTHOG_KEY` is unset, so
`store_click` fires nowhere and the organic→install number rev 2 called "the one to
run the programme on" still does not exist.

### Shipped in this pass

**The exercise cluster can now rank.** It was deployed but inert: all 507 published
movements arrived with empty prose, so `isIndexable` returned false for every one of
them and all 507 detail pages rendered `noindex, follow`. 507 pages of crawl budget,
zero entry points.

- `app/lib/coaching.ts` — hand-authored coaching for **16 movements**: overview,
  four-plus steps, form cues and a *Common mistakes* section, written per movement.
  It is a separate file because `npm run fetch:exercises` rewrites the generated JSON
  wholesale, and prose written into that file would vanish on the next catalogue
  refresh — pulling those pages back out of the index with nothing in the diff to
  say why. `exercises.ts` merges it over the snapshot by slug.
- Those 16 flip to indexable and enter the sitemap automatically (**43 → 59 URLs**),
  and each now emits `HowTo` because it has real steps to describe.
- **A *Common mistakes* section renders on the detail page.** This is the section
  almost every competing exercise page omits, and it is the most quotable thing on
  the page — which is what §4.3 is asking for.
- **Hub ordering fixed.** Every catalogue row ships at `priority: 0`, so the app's
  "popular" sort silently degraded to alphabetical: every hub led with `3/4 Sit-up`
  and `45 Degree Bicycle Twisting Crunch`, and the barbell squat sat 300 rows down.
  Those hubs are the cluster's main internal links, so alphabetical order was
  spending our crawl budget and our link equity on the least useful pages we own.
  `rankOf` supplies a fallback rank — authored coaching first, then compound lifts,
  demoting stretches and articulation drills. A real priority from the API still wins.
- **Machine-written names cleaned up.** The catalogue spells it `Bycicle`, writes
  `3 4 Sit up` and `All Fours Squad Stretch`. The name is the `<h1>`, the `<title>`
  and the anchor text on every link in, so a misspelling is the string we are asking
  to rank for. Nobody searches for `Bycicle`.
- **The Safari smart app banner** (`apple-itunes-app`) now renders sitewide. It was
  absent entirely, which meant every organic landing page — the whole point of this
  programme — had no native path to an install. This is the shortest route that
  exists from a search result to the App Store.
- **`tests/coaching.test.ts`** (4 tests) asserts every rule in the `coaching.ts`
  header: slugs resolve, overviews clear 180 characters, four-plus steps, three-plus
  cues and mistakes, and no two entries share a twelve-word run. It caught two of my
  own entries that stated a mistake without saying why it mattered.
- **`check-seo.mjs`'s thin-content guard now reads the rendered HTML**, not the
  generated JSON. It had to: coaching lives outside the snapshot now, so the JSON
  called pages "thin" that render a full set of steps. Reading the HTML is also the
  stricter question — it checks what we published rather than what we intended — and
  it now fails in **both** directions, including the silent one where somebody
  authors steps and the page stays `noindex`.

`npm test` is 30 tests green; `npm run build` compiles 619 static pages and
`check:seo` passes 46 routes.

### The finding that matters most — we ship under three different names

This is new, it is not a code problem, and it is probably costing more installs than
everything else in this file combined. Measured today from the iTunes lookup API and
the Play listing:

| Surface | Name |
|---|---|
| Website | **Dietly Fit** |
| App Store (iOS) | **Dietly: Body Scan & Workout** |
| Play Store (Android) | **Dietly AI: Snap Calories** |

The Play listing is still selling the **pre-pivot product**. "Snap Calories" is photo
calorie logging — the thing the app moved away from, the same drift `§4.1` found in
`llms.txt` and fixed there. Anyone who follows a Play badge from this site lands on a
listing for a different app than the one the page described.

Three consequences, in order of cost:

1. **Brand search is split three ways.** Nobody can build search authority for a name
   that is never written the same way twice, and store search is a *brand-name-heavy*
   channel.
2. **It is the single biggest blocker to AI citation.** §4.4 is explicit that models
   weight cross-source agreement — "Keep the App Store and Play listings' wording
   consistent with `lib/site.ts`. Cross-source agreement is what makes a model
   confident enough to name us." Right now the three sources a model can check about
   us disagree about what we are called and what we do.
3. It makes the `/vs/*` pages harder to trust: they compare "Dietly Fit" against
   rivals whose store listings are internally consistent.

**Other store facts, measured:**

- **iOS: 0 ratings, 0 reviews.** Ratings are a direct input to both store ranking and
  conversion, and zero is the worst possible starting position — it reads as
  abandoned. `dietly-rating-prompt-placement` already records where the prompt belongs.
- **Play: 10+ downloads.** Effectively a dead listing.
- **No app preview video** on iOS (7 screenshots, 5 iPad, no video).
- **Seller shows as "Rasheed Maliyekkal"**, not Rexatech — while the site's
  `Organization` schema, `authors`, `creator` and `publisher` all say Rexatech. That
  is the entity signal §4.2 exists to build, contradicted on the store page.
- Localised EN/DE/ES, which matches the app. Good, and worth keeping in step.

### Still needs a human — in priority order

1. **Rename the Play listing.** It sells a product we do not make. Everything else in
   this file is an optimisation; this is a correction. Align all three surfaces on one
   name — `Dietly Fit` is the one the site and `lib/site.ts` already use.
2. **`§1.2` the last flag.** Vercel → Domains: make `www.dietly.life` a **308**, not a
   307. `npm run check:host` goes green when it is done.
3. **`§2.1/2.2` GSC + Bing.** Still not verified — no verification meta tag is served,
   so `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` are unset in Vercel. We
   still cannot see a single query we rank for. This has been the top unfinished item
   since rev 1 and it blocks every prioritisation decision below §3.
4. **`§2.3` set `POSTHOG_KEY`.** Until then there is no organic→install number.
   Confirm the privacy wording first.
5. **Get the first ratings.** See §7.2.
6. **Change the App Store seller name** to Rexatech, so the entity matches the site.
7. Consider a credentialed reviewer for the guides (carried from rev 2).

---

## Status — 2026-09-18 (rev 2)

### Phase 1 — shipped

`§1.1` every public page declares its own canonical, root layout declares none ·
`§1.3` brand no longer doubled in titles · `§1.4` "Free SEO Tool" label gone ·
`§4.1` llms.txt + llms-full.txt generated from the registries ·
`§2.3` PostHog wired, gated on `POSTHOG_KEY` · robots/sitemap derived from
`SITE_URL` · `/invite` and `/influencer` noindexed.

### Phases 2 & 3 — shipped

**Six new calculators** — `/tdee-calculator`, `/protein-calculator`,
`/calorie-deficit-calculator`, `/lean-body-mass-calculator`,
`/one-rep-max-calculator`, `/ideal-weight-calculator` — each with metric and
imperial input, bespoke explanatory prose, and its own FAQ. Plus a `/tools` hub.

**Four guides** — `/guides/what-is-a-physique-score`,
`/guides/progress-photos-guide`, `/guides/body-recomposition`,
`/guides/training-around-a-weak-point` — with `Article` + `BreadcrumbList`
markup, cited references, visible review dates and a medical disclaimer. Plus a
`/guides` hub.

**Supporting work**: `app/lib/formulas.ts` holds every equation, unit-tested
(`npm test`, 17 cases) — the tests caught a real bug before it shipped, described
below. `FAQPage` + `Organization` schema on the homepage, built from the array
`FAQ.tsx` renders. `WebApplication` schema on tools, `HowTo` on the photo guide.
Per-page OG images for all twelve new pages. Sitemap generated from
`lib/tools.ts` and `lib/guides.ts` — **7 URLs → 19**. `/tools` and `/guides` in
the nav and footer so nothing is orphaned. `scripts/check-seo.mjs` now covers 22
routes and additionally asserts that JSON-LD parses and that every guide carries
its disclaimer and review date.

**The bug the tests caught.** The US Navy body-fat formula is quoted in two
forms. The widely cited one — `86.010·log10(waist − neck) − …` — is for
**inches**; the metric form is `495 / (1.0324 − 0.19077·log10(waist − neck) + …) − 450`.
Feeding centimetres to the inch version returns 22.6% where the truth is 16.1%:
plausible-looking and wrong by six points. `formulas.ts` was first written with
the inch constants. The shipped `BodyFatCalculator.tsx` has always been correct;
the new shared module now matches it, and a test pins both.

### Phase 3.4 — shipped 2026-09-18

**Five comparison pages plus a roundup** — `/vs/fitbod`, `/vs/macrofactor`,
`/vs/myfitnesspal`, `/vs/cal-ai`, `/vs/bodygram`, a `/vs` hub, and
`/best-ai-body-scan-apps`. Sitemap **19 URLs → 26**; `check-seo.mjs` now
covers 29 routes.

**Where the competitor facts came from.** Every price and feature was read off
a page the vendor publishes, on 2026-09-18, and the source is linked on the
page that uses it. Nothing was taken from a third-party roundup — search
results for this category are largely small apps blogging about themselves and
quoting each other's invented numbers, and a table built from those is wrong
within a month. Where a vendor publishes no price (Cal AI, Bodygram), the page
says so rather than repeating a figure from a review site.

**The structural honesty bits**, because they are the whole defence of the
format: each page renders the checked date and the vendor's source links; each
carries a trademark / non-affiliation notice and an email to report an error;
each has a *"Where {competitor} is better"* section, and the roundup opens by
disclosing that we make one of the apps in it. `check-seo.mjs` fails the build
if any of those go missing, and `tests/competitors.test.ts` fails it if an
entry quotes a price without a source, concedes nothing to the rival, or wins
every row of its own table.

**Staleness has a deadline.** `tests/competitors.test.ts` fails once any
entry's `checked` date is more than 365 days old. Re-read the vendor pages and
bump the date; do not bump the date alone.

### Phase 1 re-audit — 2026-09-18

Audited against the **live** site rather than against this file. `§1.1`, `§1.3`,
`§1.4`, `§4.1` and `§2.3`'s code are shipped and confirmed in production:
`https://www.dietly.life/macro-calculator` serves
`<link rel="canonical" href="https://dietly.life/macro-calculator">` and a title
carrying the brand exactly once. `store_click` still fires after the store
buttons were replaced with the official badges, because `analytics.tsx` tracks
by delegation on `<a href>` rather than by a handler per button.

**`§1.2` is still live and still costing us.** Measured today:

```
https://dietly.life/                 307 -> https://www.dietly.life/
https://dietly.life/macro-calculator 307 -> https://www.dietly.life/macro-calculator
https://dietly.life/robots.txt       307, 15 bytes ("Redirecting...")
https://www.dietly.life/             200
```

So every canonical we emit names a host that redirects, the redirect is
**temporary**, and a crawler that only fetches the apex never reads robots.txt
at all. `npm run check:host` now asserts all three of those and prints the
Vercel fix; it exits non-zero today.

**IndexNow is now wired (`§2.2`).** `npm run indexnow` submits every sitemap URL
to Bing/Yandex/Seznam/Naver in one call. The ownership key is
`app/lib/site.ts:INDEXNOW_KEY`, served from `public/<key>.txt` — public by
design, so it is committed. The script **refuses to run while `§1.2` is
unfixed**, because submitting URLs on a host we bounce crawlers away from spends
the quota making things worse.

**The comparison cluster is not deployed.** `/vs`, `/vs/*` and
`/best-ai-body-scan-apps` all 404 in production — they exist only in the repo.
They need a push before `§2` measurement or IndexNow means anything for them.

### Phase 2 re-audit — 2026-09-18

`§3.1` (eight calculators), `§4.2`'s `Organization` / `SoftwareApplication` /
`WebApplication` / `BreadcrumbList` / `HowTo`, and the generated sitemap were all
already shipped and correct. Auditing the built HTML rather than this file found
three things that were not:

1. **`/macro-calculator` and `/body-fat-calculator` had no FAQ at all.** They
   predate the tool registry; the six calculators built after them each shipped
   five questions plus `FAQPage`, and these two — the site's highest-value pages
   — rendered prose only. Both now carry five questions and emit the markup from
   the same array that renders them.
2. **Both still sold the pre-pivot product.** Each closed by pitching photo
   calorie logging ("our AI vision instantly recognizes the food", "our AI agent
   recognizes your meals from a photo"). Rewritten around the scan and the
   training week, which is what the app does now.
3. **`/tools`, `/guides`, `/vs` and `/support` had no share card.** The first
   three were simply missed. `/support` was subtler and worth knowing: declaring
   an `openGraph` block *without* an `images` key suppresses the root
   `app/opengraph-image.tsx` that `/privacy`, `/terms` and `/delete-account`
   silently inherit — so the page that described itself got nothing and the ones
   that said nothing got a card.

**Two new guards in `check-seo.mjs`**, both of which failed on first run and
caught real defects:

- every indexable route must emit an `og:image`
- a calculator that renders an FAQ must emit `FAQPage`, **and every answer in
  that markup must appear in the rendered page**. Markup describing answers a
  visitor cannot see is the common route to a structured-data manual action.

The second guard needed a fix of its own: it compared raw HTML, so React
escaping an apostrophe to `&#x27;` made `/protein-calculator`'s "anabolic
window" answer look missing when it rendered fine. It decodes entities and
strips tags before comparing now.

### Still needs a human

1. `§1.2` **Vercel domains** — set `dietly.life` primary so `www` **308**s to it.
   Still the one remaining P0, and it cannot be done from the repo: there is no
   Vercel CLI installed and no `.vercel` link, so this is a dashboard change.
   Verify with `npm run check:host`, which fails until it is done.
2. **Deploy.** The `§3.4` comparison cluster is committed but not live.
3. `§2.1/2.2` Verify GSC + Bing, then set `GOOGLE_SITE_VERIFICATION` and
   `BING_SITE_VERIFICATION` in Vercel and redeploy.
4. `§2.3` Set `POSTHOG_KEY` to turn analytics on. Until it is set, no
   third-party script loads at all.
5. Confirm the privacy policy wording (now says "website analytics") before
   PostHog goes live.
6. **Consider a credentialed reviewer for the guides.** They are bylined to the
   Dietly team and say plainly that no physician or dietitian reviewed them,
   which is honest but is not the strongest E-E-A-T signal available. A named
   reviewer with a registration number is the upgrade. Inventing one is not —
   see the note in `GuidePage.tsx`.

### Deliberately not built — and why

**Exercise pages (`§3.2`).** The plan gated these on measurement; the codebase
gives a second, harder reason to wait. The catalogue is 4,119 rows behind an
authenticated endpoint, and `app/routers/exercises.py` records that
`poster_key`/`video_key` are empty on **all** of them, so media currently falls
back to the dataset's own host — "the same unbranded clip every competitor
ships." Publishing a hundred pages built from a shared dataset's text and a
shared dataset's video is duplicate content by construction, and doing it at
scale on a domain with no ranking history is how a site earns a sitewide
quality problem rather than a hundred entry points. Revisit when `build-media`
has rendered our own assets and there is original per-exercise copy — the
`lib/tools.ts` registry pattern is the shape it should take.

**Off-domain corroboration (`§4.4`).** Product Hunt, Reddit, roundup outreach,
Wikidata. Not code, and not something to automate — it needs a person with an
account and something to say.

---

## 0. Where we actually are

**The indexable surface is three pages.** `/`, `/macro-calculator`,
`/body-fat-calculator`. Everything else in `app/sitemap.ts` is legal/support boilerplate
(`/privacy`, `/terms`, `/support`, `/delete-account`) that will never rank for anything
commercial. Admin, API and influencer routes are correctly disallowed in `app/robots.ts`.

**What is already right** (do not break these):
- Pages are server-rendered. The H1, FAQ copy and calculator prose are all in the raw
  HTML — verified by curl. This matters more for AI crawlers than for Google, because
  GPTBot/ClaudeBot/PerplexityBot largely do not execute JavaScript.
- `app/robots.ts` explicitly allows every major AI crawler, including `Google-Extended`.
- `public/llms.txt` exists and is served as `text/plain` with a sane cache header
  (`next.config.ts`).
- `app/lib/site.ts` is a single source of truth for product facts, and
  `app/components/JsonLd.tsx` reads from it instead of restating it.
- No fabricated `aggregateRating` in the schema. That restraint is correct — keep it
  until there are real reviews to point at. Fake ratings are a manual-action risk.

**What is broken.** Three live defects, in priority order, in §1.

**What is missing.** No Search Console, no Bing Webmaster, no analytics of any kind
(confirmed: `package.json` has no PostHog/GA/Plausible, and Firebase is auth-only). We
currently cannot tell whether the site is indexed at all, what it ranks for, or which
page drives a store click. Every recommendation past §1 is a guess until §2 ships.

---

## 1. P0 — bugs suppressing traffic right now

### 1.1 Both calculator pages canonicalise to the homepage

`app/layout.tsx:72` sets `alternates: { canonical: SITE_URL }`. Next.js App Router
inherits parent metadata into child segments unless the child overrides it, and neither
calculator page sets `alternates`. Verified live:

```
$ curl -sL https://dietly.life/macro-calculator | grep canonical
<link rel="canonical" href="https://dietly.life"/>      # ← points at the homepage
$ curl -sL https://dietly.life/body-fat-calculator | grep canonical
<link rel="canonical" href="https://dietly.life"/>      # ← same
```

We are telling Google that our two best SEO assets are duplicates of the homepage.
The expected outcome is exactly what it sounds like: they get dropped from the index and
their signals consolidated into `/`. `/privacy`, `/terms`, `/support` and `/f/[code]` all
set their own canonical correctly — the calculators were just missed.

**Fix:** delete `alternates` from the root layout, and set an explicit canonical on every
public page. With `metadataBase` already configured, a relative value is enough:

```ts
// app/layout.tsx — remove the alternates block entirely
// app/macro-calculator/page.tsx
alternates: { canonical: "/macro-calculator" },
// app/page.tsx (needs its own `metadata` export)
alternates: { canonical: "/" },
```

Then add a build-time guard so this cannot regress: a test that renders each public route
and asserts the canonical matches its own path.

### 1.2 The site is split across two hostnames

The apex is not the canonical host. `https://dietly.life/macro-calculator` returns
`307 → https://www.dietly.life/macro-calculator` (Vercel). But *every* signal we emit
names the apex: `SITE_URL` in `app/lib/site.ts`, `metadataBase`, all seven sitemap URLs,
`Host:` and `Sitemap:` in robots.txt, and all eleven links inside `llms.txt`.

So our sitemap lists URLs that redirect, our canonicals name a host that redirects, and
the redirect itself is **307 (temporary)** rather than 308/301 — which tells Google not to
transfer authority to the target.

**Fix — pick one host and make everything agree.** Recommended: make the **apex primary**,
because every line of code, the sitemap, llms.txt and the App Store / AASA links already
use it, and `next.config.ts` already documents the apex-vs-www trouble Apple hit with the
app-association file. That means: in Vercel, set `dietly.life` as the primary domain and
let `www.dietly.life` **308** to it. One config change, no code change.

If instead we keep www as primary, then `SITE_URL` must change to `https://www.dietly.life`
and `robots.ts`, `sitemap.ts` and `llms.txt` all follow. Do not leave it split.

Afterwards, confirm: `curl -sI https://www.dietly.life/` returns `308` with a `location`
on the apex, and `curl -s https://dietly.life/robots.txt` returns the file rather than
`Redirecting...` (it currently does the latter).

### 1.3 Every sub-page title says the brand twice

`app/layout.tsx` sets `title.template: "%s | Dietly"`, and the page titles already end in
`| Dietly`. Live result:

```
<title>Free AI Macro &amp; TDEE Calculator | Dietly | Dietly</title>
<title>Free Body Fat Calculator (US Navy Method) | Dietly | Dietly</title>
```

Both also exceed the ~60-character SERP truncation point, so the duplicate brand is
eating the space that should hold a keyword.

**Fix:** drop the `| Dietly` suffix from each page's own `title` and let the template add
it. Retarget to the phrasing people search:
- `Macro Calculator — TDEE & Macros for Your Goal` (→ renders `... | Dietly`)
- `Body Fat Calculator — US Navy Method`

### 1.4 The macro calculator has "Free SEO Tool" printed on it

`app/macro-calculator/page.tsx:47` renders the eyebrow text **"Free SEO Tool"** to real
visitors. It tells users and quality raters that the page exists to game search rather
than to help. Change it to "Free Tool — No Signup".

---

## 2. P0 — measurement, before anything else

We are flying blind. Nothing below §3 can be prioritised honestly until this is in place.

1. **Google Search Console.** Verify a *domain property* (DNS TXT) so it covers apex, www
   and every subdomain at once. Submit `sitemap.xml`. Then, in week one, read: Pages →
   why anything is excluded (expect "Alternate page with proper canonical tag" on both
   calculators, confirming §1.1), and Performance → what we already rank for.
2. **Bing Webmaster Tools.** Not optional, and not for Bing's traffic. ChatGPT's search
   grounding leans on the Bing index — being absent there means being invisible to a large
   share of the AI answers we are targeting. Import the property from GSC, submit the
   sitemap, and turn on **IndexNow** so new pages get picked up in hours instead of weeks.
3. **Analytics.** The PostHog MCP server is already connected to this project, so
   `posthog-js` in the root layout is the shortest path. Instrument at minimum:
   `$pageview`, plus a `store_click` event on every App Store / Play button
   (`StoreButtons.tsx`, `MobileCTA.tsx`, `Cta.tsx`) carrying the source path. Organic
   sessions are a vanity metric; **organic → store click** is the one to run the programme
   on.
4. **A rank/keyword tool** (Ahrefs or Semrush, cheapest tier) to replace the **unverified**
   volume assumptions in §3 with real numbers, and to see which competitors own the
   clusters we want.

**Definition of done for phase 1 (§1 + §2):** both calculators indexed under their own
URLs, one canonical host, permanent redirects, and a dashboard showing organic sessions
and store clicks per landing page.

---

## 3. Content — the actual growth lever

Three pages cannot rank for a category. Technical fixes only let existing pages compete;
they create no new entry points. Ordered by effort-to-return.

### 3.1 Expand the calculator cluster (highest intent, pattern already proven)

The calculator template works: a client widget plus 400–600 words of genuine explanation
plus an in-context pitch for the app. Each new one is a day of work and its own keyword
entry point. Ship in this order:

| URL | Target query | Why it earns its place |
|---|---|---|
| `/tdee-calculator` | "tdee calculator" | Currently buried inside the macro page; it is a bigger head term than "macro calculator" and deserves its own URL. |
| `/protein-calculator` | "how much protein should i eat" | Maps directly onto the training product, not the food product. |
| `/calorie-deficit-calculator` | "calorie deficit calculator" | Highest commercial intent in the cluster. |
| `/lean-body-mass-calculator` | "lean body mass calculator" | Natural internal link partner for the body-fat page. |
| `/one-rep-max-calculator` | "1rm calculator" | Gym-intent, not diet-intent — reaches the training audience the app is now built for. |
| `/ideal-weight-calculator` | "ideal weight calculator" | High volume, low difficulty. |

Rules for each page, or they become thin duplicates and hurt us:
- The explanatory prose must be written for that specific calculation, never templated.
- Show the **formula**, and name it (Mifflin-St Jeor, US Navy, Epley). Stating the method
  is what makes a page quotable by an LLM.
- State the limitations honestly. LLM answers reliably prefer sources that hedge correctly
  over sources that oversell.
- Cross-link every calculator to two siblings, and every one to `/`.

### 3.2 Programmatic exercise pages — the largest untapped asset

The app ships **1,300+ exercises** (`EXERCISE_COUNT` in `app/lib/site.ts`, backed by
`ExerciseLibrary.swift`), and there is already a media pipeline producing exercise videos.
That is a ready-made corpus for `/exercises/[slug]` — "how to do a romanian deadlift",
"dumbbell bench press form" and their thousand siblings are exactly the queries our
audience types.

This is also the fastest way to get a thin-content penalty if done carelessly. Gate it:
- **Do not publish all 1,300.** Start with ~100 of the highest-volume movements, measure
  indexation and impressions for 8 weeks, and only expand if those pages actually get
  indexed and earn clicks.
- Every page needs: the video/animation, muscles worked, step-by-step form cues, common
  mistakes, substitutions for available equipment. Auto-generated boilerplate with the
  exercise name swapped in is worse than not shipping.
- Add an `/exercises` hub with real categorisation, and `ExerciseGuide`/`HowTo` structured
  data per page.
- Treat the API contract carefully: per the backend's history, every model field the page
  reads should be optional so one missing key cannot fail a whole render.

### 3.3 Editorial around the product wedge

The homepage sells a **Form Score** — a weekly photo scored out of 100, the weak point
named, the training week built to fix it. Nothing else on the site explains that concept,
so nothing can rank for it or be cited for it. Write, with real depth:

- *What is a physique score, and can a photo really measure one?* — the honest version,
  including what it cannot do. This is the page that defines our category term.
- *How to take progress photos that are actually comparable week to week* — lighting,
  distance, time of day, pose. Genuinely useful, highly linkable, and it improves scan
  quality for every reader who becomes a user.
- *Body recomposition: why the scale stops being useful* — the argument our product rests on.
- *How to train around a weak point* — connects the score to the plan.

Health content is YMYL; Google holds it to a higher bar. Give every article a named
author with real credentials, a visible last-reviewed date, and citations to primary
sources. Do not publish unattributed AI-written health copy — it is the fastest route to
a Helpful Content demotion.

### 3.4 Comparison and alternatives pages — **shipped**

When someone asks an LLM "what's the best AI body scan app", the model answers from
roundups and comparison pages. We should be in that corpus: `/vs/[competitor]` for the
handful of apps we actually get compared to, plus a `/best-ai-body-scan-apps` style
roundup that is honest enough to be useful. Be accurate about competitors — a comparison
table that overstates our side is the one thing that gets a page distrusted by both
raters and models.

**Built.** Five `/vs/` pages, a `/vs` hub and `/best-ai-body-scan-apps`, all
driven from `app/lib/competitors.ts`. That file's header documents the
verification rule every future entry has to follow; read it before adding one.
The competitors chosen are the three a searcher actually weighs a food-and-
training app against (Fitbod, MacroFactor, MyFitnessPal), the photo-first
calorie app closest to our camera pitch (Cal AI), and the one genuine
photo-body-measurement product (Bodygram). Candidates deliberately left out:
the small photo-physique-score apps that dominate these SERPs, because almost
nothing they publish about themselves is checkable, and naming them mostly
sends them traffic.

---

## 4. AI visibility (GEO/AEO) — the specific work

Ranking and being cited are different problems. Being cited needs: (a) presence in the
indexes the models ground against, (b) content shaped so a passage can be lifted whole,
(c) machine-readable facts, and (d) corroboration off our own domain.

### 4.1 `llms.txt` is describing a product we no longer sell — fix first

`public/llms.txt` still describes the pre-pivot Dietly: photo meal logging as the headline,
a coach persona named "Rexa", hydration tracking, XP and badges, and **"Pro tier: $9.99/month"**.
The live site and `app/lib/site.ts` describe something else entirely — a weekly scan, a
Form Score out of 100, and a training plan — and the FAQ deliberately declines to name a
price ("Free to start… Dietly Pro unlocks…").

Any model that reads `llms.txt` today will confidently describe the wrong app at a price
we do not publish. This is the highest-leverage AI fix on the list, and it is an hour of work.

Fix, and make the fix permanent:
- Rewrite the file around the current positioning: scan → Form Score → weak point → week
  of training, with food logging as support.
- **Generate it from `app/lib/site.ts`** at build time (a route handler at
  `app/llms.txt/route.ts` replacing the static file), for exactly the reason
  `JsonLd.tsx` already reads from there: hand-duplicated facts drift, and drifted facts
  are worse than none.
- Only state the price if we are willing to keep it accurate in three places. Otherwise say
  "free to start, paid Pro tier — current pricing in the App Store listing".
- Add `llms-full.txt` with the long-form version: full feature list, the scoring
  dimensions (definition, leanness, symmetry, posture, body fat, potential), what the
  score is and is not, and the privacy summary.

### 4.2 Structured data to add

- **`FAQPage`** on `/` — the four Q&As in `app/components/FAQ.tsx` are already written and
  already answer the objections people ask models about ("is it accurate?", "do I need a
  gym?", "what does it cost?"). Emit them as schema from the same array that renders them.
- **`WebApplication`** on the calculator pages, not `SoftwareApplication`. The current
  markup on `/macro-calculator` describes the *calculator* as a `SoftwareApplication` with
  an install offer, which misdescribes a web page. `WebApplication` with
  `browserRequirements` is the honest type. Keep the app-level `SoftwareApplication` on
  the homepage where it is accurate.
- **`Organization`** on the homepage — Rexatech, logo, `sameAs` to the App Store, Play
  Store and social profiles. This is what entity-resolves "Dietly" as a real company.
- **`BreadcrumbList`** once there is more than one level of hierarchy (exercises, articles).
- **`HowTo`** on the progress-photo guide and on each exercise page.

### 4.3 Write passages a model can quote

Concretely, in every new page:
- Lead each section with a **self-contained, definition-first paragraph**. A model lifting
  two sentences out of context should still get something correct and attributable.
- Put the specific number in the sentence, not in a chart caption — "the US Navy method
  estimates body fat from neck, waist and height circumferences, typically within
  3–4 percentage points of a DEXA scan" is quotable; "see the chart" is not.
- Use a real `<h2>` per question, phrased as the question.
- Keep serving it in the HTML. AI crawlers mostly do not run JS, so any new page that
  renders its content client-side is invisible to them regardless of what robots.txt says.

### 4.4 Get corroborated off-domain

Models weight third-party corroboration far above self-description. Our own site can only
do so much:
- Product Hunt launch; app-roundup and listicle outreach in the fitness-app space.
- Answer real questions on Reddit (r/fitness, r/loseit, r/bodybuilding) and Quora without
  spamming — these are disproportionately represented in LLM training and grounding data.
- Keep the App Store and Play listings' wording consistent with `lib/site.ts`. Cross-source
  agreement is what makes a model confident enough to name us.
- An accurate Wikidata entry for the app, once there is enough independent coverage to
  support one.

---

## 5. Technical hygiene (after §1)

- **Per-page OG images.** `app/opengraph-image.tsx` covers the root; the calculators
  inherit it. Give each new page its own — it lifts click-through everywhere the link is
  shared, including inside AI chat surfaces that render link previews.
- **Sitemap should be generated, not hand-maintained.** `app/sitemap.ts` is a literal
  array; it will fall out of date the first time someone adds a page. Derive it from the
  route list, and drive `lastModified` from real content dates rather than
  `new Date()` — a sitemap that claims every page changed today teaches crawlers to
  ignore the field.
- **Core Web Vitals.** `framer-motion` plus the `Reveal` wrapper on every section is the
  most likely source of CLS/INP trouble. Measure with real GSC field data before
  optimising anything.
- **Internal linking.** The calculators currently link back to `/` and nowhere else. Every
  new page needs a real path in and out; orphaned pages do not get crawled.
- **Keep `/admin/` and `/api/` disallowed**, and make sure nothing new under
  `/influencer/` becomes crawlable by accident.

---


## 6. Sequence

**Phase 1 — week 1. Stop the bleeding.**
§1.1 canonicals, §1.2 single host with 308s, §1.3 titles, §1.4 the "Free SEO Tool" label,
§2 GSC + Bing + PostHog, §4.1 the `llms.txt` rewrite. All small, all high-leverage.

**Phase 2 — weeks 2–4. Build the surface.**
Three new calculators (§3.1), `FAQPage` + `Organization` + `WebApplication` schema (§4.2),
per-page OG images, generated sitemap.

**Phase 3 — weeks 5–10. Depth.**
The remaining calculators, the four editorial pieces (§3.3), and the first ~100 exercise
pages behind the measurement gate (§3.2).

**Phase 4 — ongoing.**
~~Comparison pages (§3.4)~~ — shipped 2026-09-18. Off-domain corroboration (§4.4),
expand exercise pages only if phase-3 indexation holds, quarterly re-audit. Add the
comparison cluster's own re-verification to that quarterly pass: competitor prices are
the fastest-decaying facts on the site, and `tests/competitors.test.ts` only catches
them after a full year.

### Phase 5 — what to do next (from here, 2026-09-22)

Ordered so that nothing waits on something further down the list.

**This week — the four things only a human can do.** None is a code change and
every one of them blocks work below it:

1. Rename the **Play listing** off "Snap Calories" (§7.1). It advertises a product we
   no longer make.
2. Flip the www redirect to **308** (§1.2). `npm run check:host` verifies it.
3. Verify **GSC + Bing**, set the two env vars, redeploy, submit the sitemap. Then run
   `npm run indexnow` — it refuses to run until §1.2 is fixed, so do it in this order.
4. Set **`POSTHOG_KEY`**. Confirm the privacy wording first.

Until 3 and 4 are done, every priority below is still a guess — which is the same
sentence rev 1 wrote about §2, and the reason it is still true is that nobody has done
it yet.

**Weeks 1–2 — turn on the store.**
The rating prompt on the plan reveal (§7.2). The app preview video and the first two
screenshots (§7.3). These are the highest-return work available, because they lift the
conversion rate of every install this programme will ever send.

**Weeks 2–6 — widen the exercise cluster, on evidence.**
16 movements now carry coaching. Do **not** bulk-author the remaining 491. Wait for GSC
to say whether those 16 get indexed and earn impressions, then extend in batches of
~20, always through `coaching.ts` so the quality gate and its tests apply. The
catalogue is also a filtered slice that is missing obvious head terms — there is no
`dumbbell bench press`, no plain `plank`, no plain `push-up` — so widening the
*published* catalogue may matter more than widening the prose over the current 507.

**Weeks 4–10 — the first CPP, and the clusters the data points at.**
A Custom Product Page fed by `/exercises` (§7.4), and whichever §3 cluster PostHog says
produces store clicks. Let the number choose, not this file.

**Ongoing.** The quarterly re-audit, now covering the store listings too: they drift
faster than the site, nothing in CI can see them, and rev 3 found three names in three
places precisely because nobody had looked since the pivot.

---

## 7. App installs — the channel this plan never had

Every previous revision of this file optimised the path *to* the site and stopped at
the store button. But the conversion that matters is an install, and the store listing
is where most of that conversion is won or lost. It is also, per the rev 3 audit, the
weakest part of the funnel: a website in good technical health pointing at two store
listings, one of which advertises the wrong product.

Store search and web search are separate indexes with separate rules. Work here does
not substitute for §1–§6; it compounds with it, because organic pages are what feed
the listing traffic in the first place.

### 7.1 Fix the identity first — nothing else here works until it is done

Covered in rev 3 above, restated because it gates everything in this section: one
name, on all three surfaces. **`Dietly Fit`.**

Apple gives 30 characters for the name and 30 for the subtitle, and **both are
indexed for store search**. Play gives 50 for the title and 80 for the short
description, and extracts keywords from the full description because it has no
keyword field.

A worked proposal, with counts. These are drafts to react to, not finished copy —
and the keyword choices are **unverified** until somebody reads them against a real
store-keyword tool, exactly as §3's search volumes are:

| Field | Limit | Proposal | Count |
|---|---|---|---|
| iOS name | 30 | `Dietly Fit: Body Scan & Gym` | 27 |
| iOS subtitle | 30 | `AI Workout Plan & Physique` | 26 |
| Play title | 50 | `Dietly Fit: AI Gym Workout Log & Body Scan` | 42 |
| Play short desc | 80 | `Scan your body, get a Form Score, and train the weak point it finds.` | 68 |

The iOS **keyword field** is 100 characters, comma-separated, **no spaces after
commas** (a space costs a character), no plurals, and never repeat a word already in
the name or subtitle — Apple indexes those fields together, so repeating wastes the
scarcest space on the listing. A starting set, 99 characters:

```
workout,gym,tracker,lifting,strength,trainer,fitness,muscle,physique,bodyfat,macro,calorie,coach
```

Note what is *not* in it: `scan`, `body`, `AI`, `plan`, `log` and `Dietly` all already
appear in the proposed name or subtitle.

### 7.2 Ratings — the highest-leverage fix on the store page

**iOS is at 0 ratings.** No amount of keyword work overcomes that: it suppresses
conversion on a listing a user has already reached, and it is an input to store
ranking. Every install this programme earns is being converted at the worst rate the
listing will ever have.

- Fire `SKStoreReviewController` **after a moment that went well** — the plan reveal
  is the right one, per `dietly-rating-prompt-placement`. Not on launch, not on a
  progress screen.
- Apple allows three prompts per user per year; `askOnce` currently fires once ever,
  which is safe but leaves two-thirds of the allowance unused.
- Reply to every review, especially the bad ones. Replies are public and are read by
  the next person deciding whether to install.
- Do not buy ratings. Beyond the policy risk, fake reviews read as fake to exactly the
  audience that reads reviews, and this is the same restraint the plan already applies
  in refusing a fabricated `aggregateRating` in the schema.

### 7.3 Creative — where conversion actually moves

- **An app preview video.** There is none. It is the largest single conversion lever
  on an App Store page and we already produce exercise clips, so the raw material
  exists. Fifteen to thirty seconds: photo → score → the week it builds.
- **The first two screenshots carry the listing.** Most people never scroll. They
  should show the Form Score and the generated week, each with a caption that states
  the benefit — not bare device frames.
- **A/B test the icon** through Product Page Optimization in App Store Connect. It is
  free, it is Apple's own tooling, and the icon is the one asset every impression sees.
- **Custom Product Pages.** Up to 35 per app, each with its own URL and its own
  screenshots. This is the direct join between §3 and this section: a CPP whose
  screenshots lead with the exercise library, linked from the `/exercises` cluster,
  converts better than the generic page because it continues the page the visitor was
  already reading.

### 7.4 Close the loop between the site and the store

- **The smart app banner is now live** (rev 3). It turns all 59 indexable pages into
  install surfaces on iOS rather than just the pages with a store button on them.
- **Measure the handoff.** `store_click` already carries its source path, so the
  moment `POSTHOG_KEY` is set we learn which cluster produces installs — calculators,
  guides, comparisons or exercises. That number should decide where §3 effort goes
  next, replacing the **unverified** volume guesses this plan still runs on.
- **Keep the App Store description and `lib/site.ts` in step.** The description is
  currently accurate and well written — it is the only one of the three surfaces that
  is. It should be the reference the other two are brought in line with.

### 7.5 What not to do

- **Do not chase head terms like "workout app" or "fitness".** Those belong to apps
  with millions of ratings, and a listing with zero cannot rank for them. Long-tail,
  specific phrases — "physique score", "body scan workout plan", "weak point training"
  — are winnable and describe what the app actually does.
- **Do not localise further yet.** EN/DE/ES already exceeds what the current install
  volume justifies; more locales multiply the metadata to keep accurate without
  addressing why the English listing is not converting.
- **Do not buy installs to seed the ranking.** Retention is the signal the stores
  weight, and bought installs do not retain — the ranking bump decays and the
  retention damage persists.

---

## 8. What we measure

| Metric | Source | Why |
|---|---|---|
| Pages indexed, by URL | GSC Coverage | Phase 1 succeeded iff both calculators leave "excluded by canonical". |
| Organic sessions → store clicks | PostHog | The only outcome that matters. |
| Impressions & average position per cluster | GSC | Tells us which §3 cluster to invest in next. |
| Share of AI answers naming Dietly | Manual, monthly | Ask ChatGPT/Claude/Perplexity a fixed set of ~15 prompts ("best AI body scan app", "how to score my physique from a photo") and log whether we are named and what they say about us. Crude, but it is the only read available on this channel. |
| Facts models get wrong about us | Same prompt set | Directly measures whether §4.1 worked. |
| Store impressions → installs | App Store Connect / Play Console | The store-side conversion rate. §7.2 and §7.3 are judged on this and nothing else. |
| Ratings count and average | Both consoles | At 0 on iOS, this is the number gating every other store metric. |
| Installs attributed to a landing page | PostHog `store_click` + console | Joins §3 to §7: tells us which content cluster actually produces installs, not just sessions. |
| The three names agreeing | Manual, quarterly | Cheap to check, invisible when it breaks, and rev 3 found it broken across all three surfaces. |

Realistic expectation: phase 1 shows up in GSC within 2–4 weeks. New content takes
2–4 months to rank. AI citation lags organic ranking, because most grounding runs against
a search index — the two channels are not independent, and neither is a shortcut past
the other.
