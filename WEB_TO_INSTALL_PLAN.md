# dietly.life: search reach and web-to-install plan

Written 2026-11-03 from Google Search Console (last 90 days, sc-domain:dietly.life) and PostHog project 610394 (last 60 days, website events only).

## TL;DR

1. **The site does not have a conversion problem. It has a reach problem.** Real mobile visitors click a store badge in **31% of sessions** (33 of 107). That is a strong rate. There are just very few real visitors: about 110 human sessions in 60 days.
2. **Almost all search traffic is people already looking for us.** 51 of 85 Google clicks came from "dietly ai" and "dietly". Every non-brand page (calculators, exercises, workouts, guides) gets close to zero clicks, because Google has not indexed them: **15 pages indexed, 73 not indexed**.
3. **The privacy page is not popular with users.** 172 of its 184 views come from Google Play's policy checker (user agent `PlayStore-Google`). It re-fetches the privacy and delete-account URLs from the Play listing. About 10 views came from real people, mostly from the app's paywall and settings links. This is fixed in the data now (see "Shipped today").
4. **About 210 "visitors" on the homepage are bots.** They are US desktop Chrome visits with no referrer and a 1920x1080 screen, coming from datacenter cities (Des Moines, Boydton, Dulles = Azure/AWS). They make the homepage look like it converts badly on desktop.
5. **What happens between the store click and the install is a blind spot.** No store link carried attribution, so App Store Connect and Play Console could not say which installs came from the website. This is fixed for Play now and is ready for Apple once a provider token is added.

## What the data says

### Search Console (90 days)

| Metric | Value |
|---|---|
| Clicks | 85 |
| Impressions | 2,010 |
| CTR | 4.2% |
| Avg position | 11.8 |
| Pages indexed | 15 |
| Not indexed: "Discovered, currently not indexed" | 66 |
| Not indexed: "Page with redirect" (validation failed) | 7 |

Top queries:

| Query | Clicks | Impr. | Pos. | Note |
|---|---|---|---|---|
| dietly ai | 37 | 119 | 1.5 | Old app name, still the best brand query |
| dietly | 14 | 558 | 4.3 | **2.5% CTR.** A Polish meal-delivery company with the same name (dietly.pl) takes this query. Polish queries like "dietly logowanie" and "dietly zaloguj" show the overlap. |
| pigly / pigly calculator | 0 | 57 | 9 to 34 | Pigly is a calculator site. We show for it but never win the click. |
| ~90 macro-calculator variants | 0 | 1 to 3 each | 40 to 100 | Only the macro calculator ranks at all, and it ranks on page 5+ |

Top pages: the homepage has 72 of 85 clicks. Both `dietly.life/macro-calculator` and `www.dietly.life/macro-calculator` show up as separate pages, so ranking signals are split across two hosts.

### PostHog (60 days, website only)

| Page | Visitors | What they really are |
|---|---|---|
| `/` | 305 | ~210 datacenter bots, ~100 real (mostly mobile) |
| `/privacy` | 180 | 172 Google Play crawler, ~10 humans |
| `/delete-account` | 33 | 30 Google Play crawler |
| everything else | under 6 each | |

Referrers (humans): Google 28, LinkedIn 13, Facebook 4, Instagram 3, Bing 3.

Store clicks: 43 in total, **all from the homepage** apart from one invite link. Before today, calculator and guide pages had no store button, and exercise and workout pages only had a "Get the app" link to `/#get`.

| Device | Sessions | Clicked a store badge | Median time |
|---|---|---|---|
| Mobile (real) | 107 | 33 (31%) | 6 s |
| Desktop (mostly bots) | 226 | 3 | 25 s |

Rage clicks: 8 on `/bmr-calculator` on Windows. Watch that replay. The calculator inputs may not respond the way users expect.

## Why it doesn't turn into installs

In order of impact:

1. **Too few visitors.** Calculators, exercises and workouts are where non-brand reach should come from, and Google has not indexed them yet. A new domain with almost no backlinks gets a small crawl budget, so Google left 66 URLs in "Discovered".
2. **Content pages had no store button.** A calculator visitor had to go to the homepage and scroll to find one. *Fixed today.*
3. **The hero claims "1M+ users" and a "4.9 rating", but the store listing shows a handful of ratings.** The visitor sees this gap one tap later, on the listing, which is exactly where they decide to install. It also puts the App Store listing at risk under guideline 2.3.1 if a reviewer follows the link. `Hero.tsx` notes that you asked for these numbers, so I left them in. **I recommend replacing them with true numbers** (for example "1,300+ exercises · 21 muscles ranked · AI body scan").
4. **The footer says "Free to start · Cancel any time", but the app has a hard paywall.** The only trial is 7 days on the yearly plan. People who install expecting free use meet a paywall right after onboarding. That hurts install-to-paid and ratings more than it hurts installs. Suggested copy: "7-day free trial on yearly · Cancel any time".
5. **Brand name collision.** Searches for "dietly" go to the Polish company. Our winning brand term is "dietly ai", and the site now says "Dietly Fit" everywhere. The title should cover both names.
6. **www vs apex.** `www.dietly.life` answers with a **307 (temporary)** redirect to `dietly.life`. Google keeps both hosts, which explains the 7 failed "Page with redirect" pages and the duplicate rows in the reports. Both apps link to `www.dietly.life/...`.

## Shipped today (code, not yet deployed)

- **Install card on every calculator**, right under the result, plus the sticky download bar on phones. `app/components/tools/ToolPage.tsx`
- **Install card at the end of every guide** plus the sticky bar. `app/components/guides/GuidePage.tsx`
- **Exercise and workout pages use the real store badges** instead of the "/#get" detour, plus the sticky bar. `app/exercises/[slug]/page.tsx`, `app/workouts/[slug]/page.tsx`
- New `app/components/InstallCard.tsx`.
- **`store_click` now records `placement`**: `hero`, `footer_cta`, `sticky_bar`, `tool_result`, `guide_end`, `exercise_card`, `workout_card`. This tells us which spot earns the click.
- **Install attribution on store links** (`app/lib/analytics.tsx`). Play links get `referrer=utm_source=dietly.life&utm_medium=web&utm_campaign=web-<page>`, which shows up in Play Console > Acquisition. App Store links get `pt` + `ct=web-<page>` once `APP_STORE_PT` is set.
- **Crawlers no longer fire analytics**: PlayStore-Google, Googlebot, Lighthouse, headless Chrome and similar.
- Default PostHog host corrected to US (the project is on US Cloud); `.env.example` updated.

## Plan

### This week (P0)

1. **Deploy the changes above.** Then add `APP_STORE_PT` to Vercel env. Find it in App Store Connect > Apps > Dietly Fit > App Analytics > Acquisition > Campaigns > "Generate a campaign link"; it is the `pt=` value.
2. **Vercel: make the www redirect permanent.** Settings > Domains > `www.dietly.life` > redirect to `dietly.life` with **308**. Then in Search Console, "Validate fix" on "Page with redirect".
3. **Hero stats: replace "1M+ users / 4.9 rating" with true numbers.** *(Your call. Recommended.)*
4. **Paywall wording on the site: "7-day free trial on yearly"** instead of "Free to start". Same for the "Free Tool" label on calculators; that one is fine, since the calculators are free.
5. **Homepage title and description:** lead with "Dietly AI" as well as "Dietly Fit", for example `Dietly Fit (Dietly AI): Body Scan, Workout Log & AI Trainer`. Add `alternateName: ["Dietly AI", "Dietly"]` in the Organization/SoftwareApplication JSON-LD.
6. **PostHog:** add a test-account filter (or cohort) that excludes `$geoip_city_name IN (Des Moines, Boydton, Dulles)` with `$referring_domain` empty and screen 1920x1080, so web dashboards show humans only. Build one funnel: `$pageview` (human) → `store_click`, broken down by `placement` and `$pathname`.

### Next 2 to 4 weeks: get indexed (P1)

Reach is the real lever. Google picks what it indexes by authority and internal links.

1. **Cut the sitemap to the best 25 to 30 URLs** for now: home, `/tools` plus the 10 calculators, the 5 strongest guides, `/workouts` plus top plans, and `/exercises` hub pages. Drop thin per-exercise pages until the site has authority. Ask for indexing on each one by hand in URL Inspection (about 10 a day).
2. **Link to calculators and guides from the homepage** with a "Free tools" row above the footer. Today the homepage passes almost no link equity to them.
3. **Get the first 10 to 20 backlinks.** This matters more than anything else on the list:
   - Product Hunt, AlternativeTo, Futurepedia, There's An AI For That, Toolify (AI-app directories link back).
   - "Best AI body scan apps" and "best workout apps" listicles: email the authors and ask to be included.
   - LinkedIn already sends traffic: post the calculators there with a link.
   - Embed widget: "Add this macro calculator to your site" with a credit link.
4. **Win "pigly calculator" intent on purpose**: a page like `/pigly-alternative` or a "weight loss calculator" that does what Pigly does (goal date, weekly loss) and is better looking. It already gets 57 impressions without trying.
5. **Make the macro calculator page compete**: it ranks 40 to 90 for about 90 queries. Add "macro calculator for women", "with body fat %", "per meal" sections with answers, and an FAQ. It is already the page Google trusts most.

### Month 2+: compounding (P2)

1. A small, real "AI body scan" proof page with sample scans (the app's core idea, and nobody ranks for it yet). Link to it from `/best-ai-body-scan-apps`.
2. Smart App Banner (`<meta name="apple-itunes-app" content="app-id=6769698416">`) on all pages for iPhone Safari visitors. It is one tap and the most trusted install surface on iOS.
3. Desktop visitors: add a QR code next to the badges on large screens ("Scan to install on your phone").
4. Watch PostHog `store_click` by `placement` weekly. Move the winning placement higher, and drop the losers.

## How to measure

| Question | Where |
|---|---|
| Are we reaching more people? | GSC: non-brand clicks (filter out queries containing "dietl"), indexed page count |
| Do visitors click to the store? | PostHog: human pageviews → `store_click`, by `placement` and `$pathname` |
| Do clicks become installs? | Play Console > Acquisition reports (utm_campaign = web-*); App Store Connect > Sources > Campaigns (after `APP_STORE_PT`) |

**Targets for the next 30 days:** 40+ indexed pages, 30+ non-brand clicks a month, store-click rate above 25% on mobile, and the first App Store Connect campaign installs from `web-*`.
