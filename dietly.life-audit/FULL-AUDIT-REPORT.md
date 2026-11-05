# dietly.life: full SEO audit, 2026-11-05

Run with the claude-seo plugin's audit process: rendered homepage, a crawl of all 81 sitemap URLs, local Lighthouse (the PageSpeed API quota was used up for the day), and Search Console data for the last 90 days.

## Executive summary

**SEO health score: 58 / 100 before fixes; about 72 expected once the fixes in this report are deployed and recrawled.**

Business type: mobile app (iOS and Android fitness: AI body scan, workout log, AI trainer) with a free-tools content site in front of it.

The site is technically clean (Lighthouse SEO 100, HTTPS, canonicals right, structured data on every page). The problem is **reach**, not markup:

| Metric (Search Console, 90 days) | Value |
|---|---|
| Clicks | 85, about 60 of them brand ("dietly ai", "dietly") |
| Impressions | 2,000, 1,425 of them on the homepage |
| Indexed pages | **15 of 81** |
| "Discovered, currently not indexed" | **66** |
| Best non-brand page | /macro-calculator, 174 impressions, position 36 |

Google knows the URLs but has not yet decided they are worth crawling. On a new domain, three things decide that: internal links from pages Google already trusts, perceived page quality, and backlinks. The fixes below cover the first two. Backlinks cannot be fixed in code (see ACTION-PLAN.md).

### Top 5 issues found
1. **Exercise catalogue snapshot was 2 months stale and covered names A to C only** (507 of 1,886 movements). There was no pull-up, push-up, lateral raise, leg press, plank or calf raise page, and these are the highest-search exercises there are.
2. **66 of 81 sitemap URLs not indexed**, and the homepage (85% of impressions) linked to almost none of them.
3. **robots.txt let Googlebot, Bingbot and all AI crawlers into /admin, /api and the referral routes.** Each named bot group replaced the `*` rules instead of adding to them.
4. **Exercise demo videos and thumbnails were blocked by robots.txt** (`Disallow: /api/`), so the VideoObject markup on every exercise page pointed at media Google was not allowed to fetch.
5. **Muscle hubs were thin and sorted A to Z.** "3/4 Sit-up" headed the abs page, the hubs were titled "Waist workout" and "Hips workout", and the calves hub sat at position ~6 for "best advanced calves exercises" with 351 words.

### Top 5 quick wins (all done in this change)
1. Homepage "Free tools, plans and guides" section linking to every calculator, plan, guide and muscle hub.
2. robots.txt rebuilt: private routes blocked for every bot, exercise media allowed.
3. Macro calculator: lb/ft units, per-meal split, keto and low-carb, and sections for the queries it already shows for.
4. Hubs renamed to searched words (abs, glutes) with 301 redirects, plus ranked "best exercises" lists and FAQs.
5. 28 new coached exercise pages, so they are indexable.

## Scores by category

| Category | Weight | Before | After (est.) | Notes |
|---|---|---|---|---|
| Technical SEO | 22% | 70 | 88 | robots.txt groups, media blocked, stray `index` header on /admin |
| Content quality | 23% | 55 | 70 | thin hubs, stale catalogue, no page for the core segment query |
| On-page SEO | 20% | 60 | 75 | weak internal links from home, 30+ descriptions over 160 chars |
| Schema | 10% | 80 | 85 | complete; VideoObject media was uncrawlable |
| Performance | 10% | 75 | 80 | home 95, exercise 95, macro 58 (FCP 7.5 s in one run) |
| AI search readiness | 10% | 70 | 78 | llms.txt and AI bots fine; few citable segment pages |
| Images | 5% | 50 | 85 | every exercise card had `alt=""` |

## Technical SEO

**Good:** HTTPS with HSTS, www to apex is a 308, sitemap generated from registries, real `lastmod` dates, a canonical on every page, noindex on exercise pages without prose, IndexNow key in place, security headers set.

**Found and fixed**
- *robots.txt groups (High).* A crawler obeys only the most specific group that names it, so `User-Agent: Googlebot / Allow: /` meant Googlebot ignored every `Disallow` under `*`. Now one shared disallow list applies to `*` and to a single AI-crawler group. The non-standard `Host:` line is gone.
- *Exercise media blocked (High).* `/api/exercise-clip/` and `/api/exercise-poster/` are now explicitly allowed. The media guard already lets known crawlers through.
- *X-Robots-Tag (Medium).* `index, follow` was sent on every response, including /admin and the noindex exercise pages, contradicting their meta robots. Now removed sitewide; `noindex, nofollow` is sent on /admin, /influencer, /invite, /f and the non-media /api routes.
- *Hub DOM size (Medium).* With the full catalogue a hub would render up to 1,000 image cards, enough to trip the media proxy's 240-requests-a-minute limit. Hubs now show 24 to 36 image cards, then plain links.

- *Missing robots meta on indexable exercise pages (Low).* `robots: undefined` wiped the root layout's robots meta and its `max-image-preview:large`; the key is now left out instead.
- *Next.js 15.2.6 has a published security vulnerability* (npm flags it against the 2025-12-11 Next.js security update). Not SEO, but a compromised site is the worst SEO outcome there is. Upgrade to the patched 15.x release in a separate change and test it.

**Not changed:** the `/opengraph-image?hash` URLs, which are fine. HowTo markup on exercise pages no longer earns rich results in Google but does no harm and still helps other engines, so it stays.

## Content quality

- **Stale catalogue (Critical).** Refreshed: `npm run fetch:exercises` now returns 1,886 published movements, up from 507. The 1,858 without written coaching stay `noindex, follow`.
- **Coached pages, 16 to 44.** 28 new entries written per movement, each with an overview, 4 or more steps, cues and specific mistakes with fixes: pull-up, chin-up, lat pulldown, seated row, dumbbell bench, incline dumbbell press, chest dip, cable fly, military press, lateral raise, face pull, leg press, Bulgarian split squat, goblet squat, leg extension, seated leg curl, hammer curl, incline curl, pushdown, skull crusher, standing, seated and donkey calf raises, plank, hanging leg raise, sumo deadlift, glute bridge and farmer's walk. All pass the repo's coaching quality tests.
- **Muscle hubs (High).** Eleven hubs now carry an editorial intro, a ranked "N best exercises" list with the reason for each pick, and an FAQ with FAQPage markup.
- **The segment's own query (High).** "Rate my physique" and "AI physique rating" results are App Store listings and competitor blogs (gainframe.app). New guide: `/guides/rate-my-physique`. A second new guide, `/guides/body-fat-from-a-photo`, covers what each body fat range looks like for men and women, a large query family that fits the scan feature directly.
- **Workout plans** used stand-in movements because the old catalogue had no pull-up, leg curl or plain squat. They now link to the real ones.

## On-page SEO

- Homepage: new Explore section with about 55 internal links into every cluster.
- Macro calculator: new title "Macro Calculator: Daily & Per-Meal Macros for Women and Men", a plain "Macro Calculator" H1 (it read "AI Macro & TDEE Calculator"), and new sections on how it works, splits by goal, women, per meal, and keto and low carb. Four new FAQs.
- Muscle hub titles: "Best Calves Exercises: Calf Workout With 51 Demos". Equipment hubs: "Bodyweight Exercises: N No-Equipment Moves With Demos" (the bodyweight hub already shows at position ~5).
- Exercise detail titles: "Pull-up: How to Do It, Form Cues & Mistakes". Descriptions are now cut at a word boundary, not mid-word.
- 15 registry meta descriptions over 160 characters rewritten to 134 to 155.

## Schema

Present and valid: WebSite, SoftwareApplication, Organization (with alternateName for Dietly AI), FAQPage, WebApplication, Article, BreadcrumbList, ItemList, ExercisePlan, VideoObject and HowTo. Added: FAQPage on muscle hubs, plus `itemListOrder` on the ranked hub lists. No aggregateRating, which is correct: with only a handful of store ratings, marking one up would be a policy risk.

## Performance (local Lighthouse, mobile)

| Page | Perf | A11y | LCP | CLS | TBT |
|---|---|---|---|---|---|
| / | 95 | 100 | 1.7 s | 0 | 70 ms |
| /exercises/barbell-squat | 95 | 100 | 1.6 s | 0.066 | 120 ms |
| /macro-calculator | 58 | 91 | 7.5 s | 0 | 100 ms |

The macro page failed on contrast, heading order and an unlabelled select. Heading order and labels are fixed: the form title is now an h2, and the shared Field component ties its label to its input, which fixes every calculator. Its 7.5 s first paint looks like a cold edge cache (1.7 s of render-blocking CSS in that run). Re-test after deploy. Exercise pages could save about 400 KB by serving the poster images as WebP; the posters come from the backend media pipeline, not this repo.

## Images

Every exercise card image had `alt=""`, about 90 images on the back hub alone. Now `"{Exercise} demonstration"`. Homepage screenshots already had descriptive alt text.

## AI search readiness

robots.txt welcomes GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended and others. Added meta-externalagent, Amazonbot, DuckAssistBot and MistralAI-User. llms.txt and llms-full.txt are generated from the registries, so the new guides and hubs flow in automatically. The new guides open with a definition-first lede that can be quoted on its own, which is the passage shape AI answers lift.

## Verification

- Production build from a clean copy: compiled, 2,057 static pages, `check-seo` passed on 74 routes; `npm test` 50/50.
- Served locally and checked: robots.txt output, `/exercises/muscle/waist` 308 to `/abs`, `X-Robots-Tag: noindex` on /admin, sitemap 81 to 115 URLs, llms.txt picks up the new pages.
- Pixels checked at 390 px with Chrome DevTools: homepage Explore section, calves hub, macro calculator (filled in and submitted: 30 y, 165 lb, 5'10", moderate, cut gives 2,126 kcal, 165 g P / 207 g C / 71 g F), no horizontal overflow on any checked page.

## What code cannot fix

See ACTION-PLAN.md, Phase 3. Ranking first in this segment depends mostly on referring domains, and the site has close to none.
