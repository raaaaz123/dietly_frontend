# dietly.life SEO action plan (2026-11-05)

"Rank first in the segment" means different things for different queries. Be realistic about which ones:

| Query family | Who ranks now | Realistic target |
|---|---|---|
| Brand: "dietly ai", "dietly fit" | us, position 1.5 | hold #1 |
| AI physique rating: "rate my physique", "ai body scan app", "physique score" | App Store listings, gainframe.app blog, mwm.ai | **top 3 in 2 to 4 months.** Small, new SERPs, and this is the best chance at #1. |
| Body fat from photo, calves/abs/glute "best exercises" | fitness publishers, mid authority | top 10 in 3 to 6 months |
| "macro calculator", "tdee calculator" | calculator.net, legion, nerdfitness: very high authority | page 1 for the long tail ("macros per meal", "for women") in about 6 months; the head term needs real backlinks |

## Phase 1: critical fixes (this week). Code done, needs deploy

- [x] Refresh exercise catalogue: 507 to 1,886 movements
- [x] robots.txt: private routes blocked for every bot; exercise media allowed
- [x] X-Robots-Tag: noindex on private routes, no sitewide `index`
- [x] Homepage Explore section linking every cluster
- [x] Hubs: ranked "best" lists, intros, FAQs; abs and glutes slugs with 301s; capped image grids; alt text
- [x] 28 coached exercise pages (16 to 44 indexable)
- [x] Macro calculator rebuild (units, per meal, diet styles, content, a11y)
- [x] Two segment guides: rate-my-physique, body-fat-from-a-photo
- [x] Workout plans relinked to the real movements
- [x] 15 long meta descriptions trimmed
- [ ] **Deploy** (push to main; Vercel builds)
- [ ] After deploy: `npm run indexnow` (Bing, Yandex, Seznam pick it up within hours)
- [ ] Search Console: resubmit the sitemap; URL Inspection "Request indexing" (10 a day) in this order:
  1. `/guides/rate-my-physique`, `/guides/body-fat-from-a-photo`, `/exercises/muscle/calves`, `/exercises/muscle/abs`, `/exercises/muscle/glutes`, `/macro-calculator`, `/exercises/muscle/back`, `/exercises/muscle/chest`, `/exercises/equipment/bodyweight`, `/exercises/pull-up`
  2. Next day: the other muscle hubs, then the new coached exercises

## Phase 2: high impact (weeks 2 to 3). Code done 2026-11-05, needs deploy

- [x] **AI physique query cluster**
  - [x] `/ai-body-scan` landing page: what the scan measures, three real app screens, how it works, privacy (matched to the privacy policy), comparison table vs tape, smart scale and DEXA, FAQ with FAQPage schema. Linked from the homepage Explore section, `/guides/rate-my-physique`, `/guides/body-fat-from-a-photo`, `/best-ai-body-scan-apps`, `llms.txt` and the sitemap (0.9).
  - [x] `/guides/v-taper`: ratio bands for men and women, how to measure, side delt / lat / posture training, the fat loss lever. Linked from the shoulders and back hubs.
  - [x] `/guides/how-to-get-abs`: body fat thresholds by sex, timeline maths, diet, training. Links the abs hub and the body fat guide; the abs hub links back.
- [x] **Free web tool: `/physique-analyzer`** (in the tool registry, so sitemap, `/tools`, llms.txt and check-seo pick it up).
  - `POST /api/physique-scan`: the rubric mirrored from `dietly_backend/app/services/body_scan.py`, on the same Bedrock Kimi call as `/api/food-scan`. 4 per IP per hour, 400 a day globally, 3 MB cap, 40 s timeout, `no-store`, the image is never logged or stored.
  - Gate: the response carries only the overall score and the weak point. The four sub-scores and the body fat estimate are never sent to the browser; the panel lists them as "in the app" next to the store badges.
  - Safety: 18+ and own-photo checkbox (enforced server-side); the prompt rejects possible minors, groups and non-body images.
  - Tested locally against Bedrock: a body photo scored in about 6 s, a food photo was rejected with a usable message.
  - Not embeddable (excluded from EmbedCode like the food scanner). **Watch Bedrock spend for the first weeks.**
- [x] **Coached 21 more exercises** (44 to 65 indexable), each with a working demo clip checked on production: dumbbell lunge, dumbbell walking lunge, reverse lunge, single-leg hip thrust, dumbbell RDL, trap bar deadlift, dumbbell single-leg deadlift, Smith incline bench, one-arm dumbbell row, dumbbell bent-over row, push-up, diamond, incline, decline and pike push-ups, sled hack squat, underhand pulldown, close-grip pulldown, straight-arm pulldown, kettlebell swing, burpee.
- [x] **Macro calculator re-test.** PSI quota was still exhausted, so local Lighthouse 12 (mobile) on production: performance 92, FCP 1.3 s, LCP 1.4 s, TBT 230 ms, CLS 0.001. The only render-blocking file is the site-wide CSS (13 KB brotli, about 150 ms), the same file every page loads; there is no route-specific chunk. No change needed.
- [ ] After deploy: `npm run indexnow`, then request indexing for `/ai-body-scan`, `/physique-analyzer`, `/guides/v-taper`, `/guides/how-to-get-abs`, then the 21 new exercise pages.

## Bing (2026-11-05)

Webmaster Tools (data imported from Search Console): 14 URLs indexed of 17 known, homepage last crawled Sep 28, 55 impressions in 3 months, 1 backlink. Bing is what ChatGPT and Copilot ground on, so this matters more than the traffic suggests.

- [x] Sitemap submitted (it knew 77 URLs; the live one has 141).
- [x] Brand mix-up: for "dietly fit", dietly.fit (an unrelated meal planner) ranked above us and Bing's knowledge panel described our app citing dietly.fit. Fixed what we control: an `@id` entity graph with `sameAs` store links on the app, a new `/about` page that names the publisher and the other Dietlys, and the same note in `llms.txt`. Plain "dietly" belongs to dietly.pl and is not winnable.
- [x] Footer now links `/ai-body-scan`, `/physique-analyzer`, both new guides and `/about` sitewide.
- [x] IndexNow runs automatically after every Production deploy (`.github/workflows/indexnow.yml`, URLs whose sitemap lastmod moved in 3 days). Bump a page's date in its registry when its content changes.
- [x] Homepage reindex requested; 99 priority URLs submitted via URL Submission (daily quota 100).
- [ ] Next day: URL Submission for the remaining ~40 exercise pages.
- [ ] Phase 3 backlinks are the real lever on Bing too: it reports 1 backlink.

## Phase 3: authority (month 2). This is what decides "first"

Code cannot do this part. Domain authority is close to zero, and every SERP above position 5 for non-brand terms is held by sites with hundreds of referring domains.

1. **Directory listings** (one afternoon, about 10 links): Product Hunt launch, AlternativeTo (list as an alternative to Fitbod, MacroFactor and Cal AI), There's An AI For That, Futurepedia, Toolify, SaaSHub, Uneed, AI Scout.
2. **"Best AI body scan app" listicles**: email the authors of the top 10 results with a one-line pitch and a free Pro code. These pages rank for exactly our segment query.
3. **Embeddable calculator** ("add this macro calculator to your site", with an iframe and a credit link). Fitness bloggers embed calculators.
4. **Reddit and forums**: answer "rate my physique" and "what body fat am I" threads honestly, linking the body fat guide where it actually answers the question. No spam.
5. **App Store and Play listings**: link to dietly.life in the developer website field, plus the support and privacy URLs, which they already do.

## Phase 4: monitor (ongoing)

- Weekly in Search Console: indexed count (target 40+ by Dec 5 and 60+ by Jan 5), non-brand clicks, and the position of `rate my physique`, `best calf exercises`, `macros per meal`.
- Before and after every deploy: `"$HOME/.claude/skills/seo/scripts/claude-seo" run drift_baseline.py https://dietly.life`, then `drift_compare.py`.
- Every catalogue change: `npm run fetch:exercises`. The snapshot is what the site renders; the backend being up to date is not enough.
