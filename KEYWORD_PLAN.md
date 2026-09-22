# Keyword & Content Plan — growing impressions

Companion to `SEO_PLAN.md`. That file covers technical health, AI visibility and app
installs. This one answers a narrower question: **what should we build next, and for
which queries.**

Written 2026-09-22.

---

## First, the honest part about the target

The goal given was **5,000 impressions per day within a week**. That is not
achievable, and the reason is worth stating precisely rather than softening, because
it changes what we should do this week.

1. **We cannot currently see impressions at all.** Search Console is still not
   verified — no verification meta tag is served on the live site. There is no
   baseline, so "5k/day" has nothing to be measured against. This is the same P0
   that has been open since rev 1 of `SEO_PLAN.md`.
2. **New URLs take weeks to be indexed**, not days. A page that is not in the index
   generates zero impressions no matter how good it is. On a domain with little
   ranking history, discovery-to-indexation for a new page typically runs two to
   eight weeks. IndexNow (already wired, `npm run indexnow`) shortens this for
   Bing/Yandex, not for Google.
3. **Ranking follows indexation, with its own lag.** Even a page that indexes in week
   one usually spends one to three months drifting up before it holds a position that
   earns impressions at volume.

What a week *can* realistically deliver: verification, submission, the first pages
indexed, and a true baseline. What three to six months can deliver, if the build
below is executed and the pages actually index: 5k/day is a reasonable target for a
site with 60–200 well-built pages in these clusters. It is not a one-week target,
and treating it as one would push us toward the exact tactic that fails — publishing
a few hundred thin pages fast, which is how a domain with no history earns a sitewide
quality problem instead of traffic.

**So the fastest genuine route to 5k/day is: verify GSC this week, keep building the
clusters below, and measure from a real baseline.**

---

## Google Trends, week to 2026-09-22 — what the export actually says

Seven CSVs, three seed topics, worldwide, 15–22 September 2026. Analysed 2026-09-22.

**Read the numbers correctly or they will mislead you.** Google Trends
"search interest" is a **0–100 index normalised to the top query within its own
result set** — not volume, and not comparable between files. `home workout = 100`
and `fitbit air = 100` are both just "biggest in this export". A `0` means below
the reporting threshold, not zero searches. And this is **one week**: the `-40%`
to `-80%` figures in the one-day file are mostly a weekend, not a collapse.

### Seed 1 — "workout". The one that matters.

| Query | Interest | Week change |
|---|---|---|
| home workout | 100 | +50% |
| workout plan | 45 | +20% |
| workout equipment | 43 | +50% |
| home workout equipment | 34 | +50% |
| home workout routines | 32 | **+150%** |
| calisthenics / calisthenics workout | 31 | +30% |
| **best workout apps** | **30** | **+70%** |
| home workout without equipment | 27 | +50% |
| calisthenics workout plan | 26 | +40% |
| back / chest / abs / leg workout | 19 / 16 / 14 / 14 | — |

Three things fall out of this:

1. **`home workout` is the largest term in the whole export** and the site had
   nothing for it, while holding 131 bodyweight movements that answer it.
2. **`best workout apps` is direct app-install intent, rising 70%**, and is a
   near-clone of `/best-ai-body-scan-apps` — which we already built — against a
   much larger audience. `best free workout apps` rises 60% alongside it.
3. **The body-part terms are "<muscle> workout", not "<muscle> exercises".**
   Our `/exercises/muscle/*` hubs were titled for the smaller phrasing.

### Seed 2 — "pre workout". Mostly not our business.

`pre workout` tops it at 100, but the tail is almost entirely brand and product:
C4, Bucked Up, Ghost, Ryse, Transparent Labs, Total War, Alpha Lion. That is
affiliate and ecommerce intent — someone comparing tubs is not looking for a
training app, and we would be bidding into a category we do not sell into.

The **informational** subset is ours, though, and it is small and winnable:
`what is pre workout`, `pre workout side effects`, `pre workout meal`,
`creatine before or after workout`, `taking creatine without workout`. All of
them sit naturally next to `/creatine-calculator`.

### Seed 3 — "fitbit". A trap, with two exceptions.

Overwhelmingly navigational brand traffic — `fitbit air`, `fitbit google`,
`fitbit charge`, `fitbit versa`. Competing here means competing with Google for
Google's own product name, on a domain with no authority. Skip it.

Two things in that file are worth having:

- **`bmr calculator` appears as a "Breakout" rising query** in the Fitbit set.
  We shipped `/bmr-calculator` hours before this export was taken.
- The **integration and concept** queries: `how to link fitbit and myfitnesspal`
  (+90%), `how to sync fitbit to apple health` (+80%), `fitbit to apple health`
  (+70%), `hrv` (+30%), `heart rate variability` (+40%). The app already reads
  Apple Health, so the sync questions are answerable honestly rather than
  opportunistically.

### Shipped in response, same day

- **`/workouts`** — a plan cluster driven by `app/lib/workouts.ts`, with
  `/workouts/home-workout` (4-day, no gym),
  `/workouts/home-workout-without-equipment` (three circuits, nothing at all)
  and `/workouts/calisthenics-workout-plan` (six patterns, full progression
  ladder). Each renders the whole week — days, movements, sets, reps, rest —
  and links every movement to its catalogue page. `ExercisePlan` +
  `BreadcrumbList` markup, own OG cards, in the nav and footer.
- **The exercise hubs retitled** from `Chest Exercises` to `Chest Workout — 43
  Exercises With Demos`, carrying both phrasings.
- Sitemap **65 → 70 URLs**; `check-seo.mjs` now covers 57 routes and reads the
  workout registry, so a new plan is guarded automatically.

**The side effect that matters most:** the plan pages put **19 internal links
into `/exercises/*` detail pages** from `/workouts/home-workout` alone. Those
pages previously had almost no inbound links, which is the single most likely
reason for a page not to get crawled.

### Second wave, shipped 2026-09-23

Three gym splits, the demand the first wave did not cover:

- **`/workouts/push-pull-legs`** — `push pull legs workout plan` and its
  variants run deep in the autocomplete harvest. Six sessions written out, plus
  the three-day version.
- **`/workouts/upper-lower-split`** — `upper lower split`, the four-day
  alternative for people who will not train six times a week.
- **`/workouts/beginner-gym-workout`** — `gym workout plan for beginners` and
  `beginner gym workout` both appear repeatedly, with `for men` / `for women` /
  `pdf` modifiers behind them.

**The equipment hubs retargeted** the same way the muscle hubs were:
`Bodyweight Exercises` → `Bodyweight Workout — 131 Exercises`, now carrying
`calisthenics workout` and `home workout without equipment` as keywords. Those
are the terms Trends shows; "bodyweight exercises" does not appear in the export
at all. A capitalisation bug surfaced doing it — the gym tier rendered
`Full gym Workout` — and is fixed in the `KIT` table.

Sitemap **70 → 73 URLs**, `check-seo.mjs` covers **60 routes**, six plans total.
The three new plans add **59 more internal links into `/exercises/*`** (24, 21
and 14), on top of the 19 the first wave added.

### Third wave, shipped 2026-09-23

Everything on the "still open" list below, except the part that needs a key.

**`/best-workout-apps`** — the biggest install-intent term in the export
(30, +70%). Five apps, each read off its own pages on 2026-09-23: Hevy, Strong,
JEFIT, Fitbod and Nike Training Club. **Only two publish a price.** JEFIT is
$12.99/month or $69.99/year from its Elite page; Fitbod is $15.99/month or
$95.99/year from its FAQ. Hevy, Strong and Nike Training Club publish none
anywhere public, so the page says that and links where we looked, rather than
repeating a figure from a review site — which is the one thing a content farm
in this SERP will not copy. `tests/workoutApps.test.ts` fails the build if an
entry quotes a price without a source, concedes nothing to the rival, or lets
the roundup go a year unverified.

**Three guides**, all from the concept queries in both datasets:
`/guides/skinny-fat` (high volume, low competition, and it describes exactly
who the Form Score helps), `/guides/progressive-overload`, and
`/guides/how-long-to-build-muscle`. Each cites primary literature and carries
the disclaimer and review date `check-seo.mjs` enforces.

**A printable plan view.** `gym workout plan pdf download free` recurs across
both datasets. Rather than generate and host files that would go stale, the
plan pages now carry a print stylesheet — dark theme inverted to black on
white, chrome stripped, sessions kept whole across page breaks, and movement
links spelled out as URLs so the sheet is still useful away from a screen.

### The food cluster — built, and gated on one thing

`/foods/[slug]` (protein *and* calories on one page, since splitting them
would be two thin pages over identical data), a hub, `NutritionInformation`
markup, `scripts/fetch-foods.mjs` and `tests/foods.test.ts` are all in place.
**It publishes nothing yet**, by design: `PUBLISHABLE` in `lib/foods.ts` keeps
the whole cluster out of the routes and the sitemap until there are at least
twelve curated foods. There is currently one.

The blocker is a free API key, not effort. The USDA demo key rate-limits after
roughly thirty calls an hour and gave out partway through curation.

**To turn it on:** get a key at `https://fdc.nal.usda.gov/api-key-signup.html`,
run `node scripts/fetch-foods.mjs --search "chicken breast"` to see candidates,
paste the right fdcId into `FOODS` in that script, repeat to twelve or more,
then `FDC_KEY=xxx node scripts/fetch-foods.mjs`. The cluster appears on the
next build.

**Why it is curated by id and not by search** — measured against the live API
on 2026-09-22, searching by name and taking the first hit returns a banana at
**1450 kcal/100g** (dehydrated powder), *pineapple* for "soya chunks", and egg
whites for "egg". `tests/foods.test.ts` now catches that class of error with an
Atwater check: if the stated energy and the macros disagree by more than ~50%,
the build fails and names the food.

One honest limit worth planning around: **USDA covers Indian foods poorly**,
and paneer, dal and soya chunks are among the highest-volume terms in the
autocomplete harvest. Roti resolves cleanly (fdcId 171844); paneer and dal do
not. Those need a second sourced database or they stay out.

### Still open from this data

1. **`/best-workout-apps`** — the biggest gap the export revealed. Deliberately
   not built yet: `app/lib/competitors.ts` requires every claim about a rival to
   be read off that vendor's own page and dated, and a roundup of workout apps
   means verifying six new vendors. Doing it from recall would break the rule
   that makes the existing `/vs` pages defensible.
2. The `/workouts` cluster should grow toward `push pull legs`, `upper lower
   split` and `beginner gym workout` — all present in the earlier autocomplete
   harvest, all unbuilt.
3. `gym workout plan pdf download free` recurs across both datasets. A clean
   printable view of each plan is a small feature answering a stated want.

---

## How these keywords were found

There is still no Ahrefs or Semrush on this project, so **every volume figure anyone
quotes for these terms is unverified** — including any I could produce. Rather than
invent numbers, the clusters below are derived from **Google Autocomplete**, harvested
2026-09-22 across ~70 seed terms.

That is real data about what people actually type, and its ordering correlates loosely
with popularity, but it is *not* a volume figure. Treat the clusters as evidence that
demand exists and is shaped a particular way; treat any specific number as unknown
until a keyword tool is bought.

**One significant finding from the harvest:** a large share of the highest-frequency
suggestions in our category are **India-skewed** — `protein in 100 gm paneer`,
`calories in 1 roti`, `protein in soya chunks`, `protein in dal`, `progressive
overload kya hota hai`. This matters. It is very high volume and it is winnable, but
it converts to paid subscriptions at a lower rate than US/UK traffic. Since the stated
goal is *impressions*, this is the fastest path to the number. If the real goal
underneath is revenue, say so, because it changes the priority order below.

---

## What shipped today

Six new calculators, chosen from the clusters below. Sitemap **59 → 65 URLs**.

| URL | Primary target | Why it was picked |
|---|---|---|
| `/bmi-calculator` | "bmi calculator" | The largest head term in this category that we did not have a page for. High difficulty, but it anchors the cluster and feeds the others. |
| `/bmr-calculator` | "bmr calculator" | Very high volume, and it was buried inside `/tdee-calculator` with no URL of its own. |
| `/ffmi-calculator` | "ffmi calculator" | Lower volume, much lower competition, and the closest keyword on the internet to what the app's Form Score actually measures. |
| `/waist-to-height-ratio-calculator` | "waist to height ratio" | Strong autocomplete depth, genuinely useful, and it carries a quotable one-line rule — good for AI citation. |
| `/calories-burned-calculator` | "calories burned calculator" | The deepest suggestion tree in the harvest: walking, steps, running, treadmill, cycling, incline, hiking. 35 activities from sourced MET values. |
| `/creatine-calculator` | "creatine calculator" | High volume, low difficulty, and almost every competing page states doses with no source. |

---

## The clusters, in priority order

Priority = (demand shown in the harvest) × (how winnable it looks for a low-authority
domain) × (how well it maps to what the app does).

### P1 — Food lookups. The largest impression opportunity by a wide margin.

The single densest area of demand found. `how much protein in 1 egg` and its siblings
dominate the protein seed; `calories in X` returns an equally deep tree.

Evidence from the harvest:

```
protein in 1 egg · protein in 100 gm paneer · protein in 100 gm chicken
protein in 1 banana · protein in soya chunks · protein in milk
calories in one egg · calories in 1 roti · calories in one chapati
calories in rice · calories in one banana · calories in one samosa
```

**Why it fits us:** the app logs food by photo, sentence or voice. A page answering
"how much protein is in 100 g of paneer" is answering the question the app exists to
answer, so the CTA is honest rather than bolted on.

**Shape:** `/protein-in/[food]` and `/calories-in/[food]`, plus hub pages, plus the
comparison variants the harvest surfaced (`paneer vs chicken`, `paneer vs tofu`,
`roti vs rice`) which are their own high-intent pages.

**The gate — read this before building it.** This is nutrition data, which is YMYL.
Publishing 200 pages of numbers we cannot source is the same mistake the exercise
cluster was gated against, with higher stakes. So:

- Every value must come from a **citable database**, with the source and the retrieval
  date rendered on the page. USDA FoodData Central is public and works
  (`api.nal.usda.gov/fdc/v1`, verified reachable 2026-09-22); it needs a free API key
  for production volume.
- **USDA covers Indian foods poorly.** Paneer, dal, roti, soya chunks and chapati are
  exactly the highest-volume terms and exactly where USDA is thinnest. A second
  sourced database is required for those, or they are left out. Do not fill the gap
  by estimating.
- Build it as a registry + generated JSON, the way `lib/exercises.ts` works, with a
  test asserting every published food carries a source and a date — the pattern
  `tests/competitors.test.ts` already establishes.
- **Start with ~40 foods, not 400.** Measure indexation for six weeks before extending.

### P2 — Exercise pages. Already built; needs content, not code.

The infrastructure shipped: 507 detail pages, category and equipment hubs, `HowTo`
markup, a *Common mistakes* section, and a quality gate. **16 movements currently
carry coaching and are indexable; 491 render `noindex` and are waiting.**

Autocomplete confirms the demand shape: `how many sets and reps for hypertrophy`,
`how to squat`, `best chest exercises`, `full body workout at home without equipment`.

**Next step:** extend `app/lib/coaching.ts` in batches of ~20, prioritising compound
lifts and their direct accessories. `rankOf` in `exercises.ts` already orders the hubs
so the movements worth ranking surface first.

**A catalogue problem worth fixing first:** the published slice of 507 is missing
obvious head terms — there is no `dumbbell bench press`, no plain `plank`, no plain
`push-up`, no `lat pulldown`. Widening the *published catalogue* to include the
movements people actually search may be worth more than writing prose for 20 more of
the ones already there.

### P3 — Workout programme pages. Strong demand, nothing built.

The most commercially aligned cluster we have no presence in at all — and the one
closest to the app's core feature, which generates a training week.

```
push pull legs workout plan · push pull legs 6 day split
gym workout plan for beginners · beginner gym workout plan female
workout split for 5 days a week · upper lower split
full body workout at home without equipment · workout plan for muscle gain
```

Note `gym workout plan pdf download free` appearing repeatedly — that is a clear
signal about the format people want. A page that renders the plan properly and offers
a clean printable version will outperform one that only describes a plan.

**Proposed pages:**

| URL | Target |
|---|---|
| `/workouts/push-pull-legs` | "push pull legs workout plan" |
| `/workouts/upper-lower-split` | "upper lower split" |
| `/workouts/full-body-workout` | "full body workout plan" |
| `/workouts/beginner-gym-workout` | "beginner gym workout plan" |
| `/workouts/home-workout-no-equipment` | "full body workout at home without equipment" |
| `/workouts` | hub — "workout split" |

Each needs the actual week laid out — days, movements, sets, reps — linking every
movement to its `/exercises/[slug]` page. That internal linking is the point: it
gives the exercise cluster the inbound links it currently lacks, and gives these pages
substance the competing listicles do not have.

### P4 — Editorial / blog. Best fit for AI citation, slowest to pay off.

Currently four guides. The harvest shows a clear set of concept queries with real
depth, and these are the pages most likely to be *quoted* by an LLM, because they
answer a question rather than compute a number.

```
progressive overload meaning · how many sets and reps to build muscle
how long to build muscle · skinny fat meaning · skinny fat to muscular
cutting vs bulking · lean bulk · how to get abs · rest between sets
```

**Proposed, in order:** `/guides/progressive-overload`,
`/guides/sets-and-reps-for-muscle-growth`, `/guides/skinny-fat`,
`/guides/how-long-to-build-muscle`, `/guides/cutting-vs-bulking`,
`/guides/rest-between-sets`.

`skinny fat` deserves particular attention: it is high volume, low competition, and it
describes precisely the person the app's Form Score is built to help — someone whose
scale weight looks fine and whose body composition does not.

These are YMYL-adjacent. Same rules as the existing guides: named author, visible
review date, cited sources, and the disclaimer that `check-seo.mjs` already enforces.

### P5 — Remaining calculator gaps.

Lower priority now that six shipped, but each is a day of work on a proven template:

| URL | Target | Note |
|---|---|---|
| `/body-recomposition-calculator` | "body recomposition calculator" | We have the *guide* but no tool. Autocomplete shows strong depth. Maps directly to the product thesis. |
| `/water-intake-calculator` | "water intake calculator" | High volume, trivial formula, weak fit — include only if the cluster needs breadth. |
| `/body-type-calculator` | "body type calculator" | High volume but ambiguous intent: the harvest mixes ectomorph/mesomorph with Ayurvedic dosha. Somatotyping has poor scientific support; a page would have to say so, which limits how well it can serve the query. Probably skip. |
| `/calorie-cycling-calculator` | "calorie cycling" | Low volume, good differentiation. |

---

## What not to build

- **`/body-type-calculator` as a somatotype quiz.** The ectomorph/mesomorph/endomorph
  framework does not hold up, and a page that sells it contradicts the honesty the
  rest of the site is built on. The `/vs` pages and the guides work precisely because
  they concede things.
- **Anything auto-generated at scale without the gate.** The reason the exercise
  cluster is currently 16 pages and not 507 is a deliberate decision recorded in
  `coaching.ts`. The food cluster must inherit it.
- **More calculators once the cluster is at ~15.** Past that point, marginal
  calculators cannibalise each other's internal links. The next 5k impressions comes
  from P1–P4, not from a sixteenth calculator.

---

## Sequence

**This week.** Verify GSC + Bing, set the env vars, redeploy, submit the sitemap, run
`npm run indexnow`. Get the baseline. Nothing else here can be judged without it.

**Weeks 1–3.** Build the food cluster infrastructure with ~40 sourced foods (P1).
Widen the published exercise catalogue to include the missing head-term movements (P2).

**Weeks 3–6.** The six workout programme pages (P3), each linking into the exercise
cluster.

**Weeks 6–12.** Editorial (P4), extending the food cluster only if the first 40
index, and extending exercise coaching in batches of 20.

**Ongoing.** Re-run the autocomplete harvest quarterly — the script is small and the
method is repeatable — and replace this file's unverified assumptions with real
numbers the moment a keyword tool exists.

---

## Measuring it

Add to the table in `SEO_PLAN.md` §8:

| Metric | Source | Why |
|---|---|---|
| Impressions per day, total | GSC Performance | The stated goal. Needs a baseline before it means anything. |
| Indexed / submitted ratio | GSC Coverage | The leading indicator. If new pages are not indexing, no amount of further building helps, and that is the signal to stop and fix. |
| Impressions per cluster | GSC, by URL prefix | Tells us which of P1–P4 to extend and which to abandon. |
| Click-through rate by cluster | GSC | Impressions without clicks means the title and description are wrong, not the content. Cheap to fix, and worth checking before writing anything new. |
