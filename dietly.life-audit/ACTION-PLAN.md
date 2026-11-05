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

## Phase 2: high impact (weeks 2 to 3)

1. **Own the AI physique query cluster.** Add three more pages, each its own intent:
   - `/ai-body-scan` as a landing page: what the scan measures, sample results (real app captures), privacy, and how it compares. Link it from home, both new guides and `/best-ai-body-scan-apps`.
   - `/guides/v-taper` (shoulder-to-waist ratio: what is good, how to measure, how to train it). It ties directly to the scan's proportions score.
   - `/guides/how-to-get-abs` (body fat thresholds plus training), linking the abs hub and the body fat guide.
2. **A free web tool for the segment.** A "physique score from a photo" demo on the web, using the Bedrock vision call the food scanner already uses, with the result gated behind the install. It is the one asset competitors cannot copy from a blog, and it is linkable. It needs a privacy note and rate limiting like `/api/food-scan`.
3. **Coach 20 more exercises** (lunge, hip thrust variants, deadlift variants, incline bench, dumbbell row, push-up variants, hack squat, lat pulldown variants, kettlebell swing, burpee). Each one adds an indexable page with a video, and that compounds.
4. **Re-test the macro calculator** on PageSpeed once the quota resets. If FCP is still above 3 s, look at the render-blocking CSS chunk on that route.

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
