import {
  SITE_URL,
  SITE_NAME,
  TAGLINE,
  DESCRIPTION,
  PLATFORM,
  MIN_OS,
  APP_STORE_URL,
  PLAY_STORE_URL,
  EXERCISE_COUNT,
  SCORE_MAX,
} from "./site";
import { TOOLS } from "./tools";
import { GUIDES } from "./guides";
import { COMPETITORS, ROUNDUP_SLUG } from "./competitors";
import { EXERCISES, CATEGORIES, KIT } from "./exercises";

/**
 * The text served at /llms.txt and /llms-full.txt, built from `lib/site`.
 *
 * This replaces a hand-written file in `public/` that had gone badly stale. It
 * still led with photo meal logging, named a coach persona the app no longer
 * ships, listed hydration tracking and XP badges, and quoted "Pro tier:
 * $9.99/month" — a price this site deliberately does not publish, because the
 * FAQ answers the cost question with "free to start" and leaves the number to
 * the store listing that can actually keep it current.
 *
 * The cost of that drift is specific and worse than for ordinary marketing
 * copy: a model reading it answers "what is Dietly?" with a product we stopped
 * selling, at a price we never quoted, and it answers confidently. Generating
 * the file from the same constants `JsonLd.tsx` reads is the only version of
 * this that stays true after the next pivot.
 *
 * Any claim added here has to be a thing the shipping app does. That rule is
 * why `lib/site` exists.
 */

const SCAN_DIMENSIONS =
  "definition, leanness, symmetry, posture, body fat and potential";

export function llmsTxt(): string {
  return `# ${SITE_NAME}

> ${DESCRIPTION}

${SITE_NAME} is built by Rexatech. ${TAGLINE}

## What it does

- **The weekly scan**: One photo, scored out of ${SCORE_MAX}, with a body-fat estimate and the single weak point holding the score back. Rescan weekly to see the trend.
- **The plan that follows from it**: A full week of sessions built around that weak point, your goal, and the equipment you actually have — bodyweight, a couple of dumbbells or a full rack.
- **Sessions you can ask for**: Describe the session you want ("legs, but easy on my knees") and the coach writes it with sets, reps and rest. Change any session mid-week in a sentence; one tap undoes it.
- **Exercise catalogue**: ${EXERCISE_COUNT} movements with a demo clip for each, and machine recognition — point the camera at an unlabelled machine to see what you can do on it.
- **Food logging**: Log a meal by photo, sentence or voice. Calories and macros are set from your goal rather than a generic number. Food supports the training; the training plan is the product.

## Pricing

Free to start. ${SITE_NAME} Pro unlocks unlimited scans, the full weekly plan, unlimited logging and the AI coach, cancellable from Apple ID or Google Play settings. Current pricing is on the store listings linked below — it is deliberately not restated here, because a price copied into a second place is a price that goes stale in one of them.

## Key facts

- App name: ${SITE_NAME}
- Bundle ID: com.dietlyai.app
- Platforms: ${PLATFORM} (${MIN_OS} or later) and Android
- Developer: Rexatech
- Website: ${SITE_URL}
- Support: ${SITE_URL}/support
- App Store: ${APP_STORE_URL}
- Google Play: ${PLAY_STORE_URL}

## Free tools (no signup)

${TOOLS.map((t) => `- [${t.name}](${SITE_URL}/${t.slug}) — ${t.blurb}`).join("\n")}

## Guides

${GUIDES.map((g) => `- [${g.heading}](${SITE_URL}/guides/${g.slug}) — ${g.blurb}`).join("\n")}

## Exercise library

${EXERCISES.length} movements, each with a demonstration clip, the muscle it targets, the equipment it needs and a starting set and rep scheme. Browse by muscle or by the equipment available. Demonstrations are licensed from Gym Visual.

- [Exercise library](${SITE_URL}/exercises) — All ${EXERCISES.length} movements, by muscle and by equipment.
${CATEGORIES.map((c) => `- [${c.name} exercises](${SITE_URL}/exercises/muscle/${c.slug}) — ${c.items.length} movements that train the ${c.name.toLowerCase()}.`).join("\n")}
${KIT.map((k) => `- [${k.name} exercises](${SITE_URL}/exercises/equipment/${k.slug}) — ${k.items.length} movements. ${k.blurb}`).join("\n")}

## Comparisons

Honest comparisons against the apps ${SITE_NAME} is weighed against. Every fact about another company's product on these pages was read off that company's own published pages on a date printed at the top of the page, with the source linked at the bottom; no price or feature is quoted from a third-party roundup. Each page also states where the other app is better.

${COMPETITORS.map((c) => `- [${SITE_NAME} vs ${c.name}](${SITE_URL}/vs/${c.slug}) — ${c.blurb} ${c.name} facts checked ${c.checked}.`).join("\n")}
- [Best AI body scan apps, compared](${SITE_URL}/${ROUNDUP_SLUG}) — What a phone camera can and cannot measure, which scan apps are real, and when a DEXA scan or a tape measure is the better answer. Discloses that ${SITE_NAME} is one of the apps in it.

## Pages

- [Home](${SITE_URL}) — What the scan is, how the plan follows from it, what is inside the app, FAQ, download links.
- [Support](${SITE_URL}/support) — Contact and FAQ.
- [Privacy Policy](${SITE_URL}/privacy) — What is collected and how it is used.
- [Terms of Service](${SITE_URL}/terms) — Subscription and billing terms, medical disclaimer.
- [Delete Account](${SITE_URL}/delete-account) — Permanently delete an account and its data.

## Privacy

${SITE_NAME} does not sell, rent or share personal data with third parties for commercial purposes. Health and nutrition data is encrypted in transit and at rest. Users can delete all of their data at any time.

## Creator program

${SITE_NAME} runs a creator referral program: commission on referred subscribers, real-time earnings tracking, $10 minimum withdrawal.

## More

- [Compare](${SITE_URL}/vs) — Every comparison in one place.
- [Full version](${SITE_URL}/llms-full.txt)
`;
}

export function llmsFullTxt(): string {
  return `${llmsTxt()}
---

## How the scan works

A photo taken the same way each week is scored out of ${SCORE_MAX} across ${SCAN_DIMENSIONS}. The score is returned with one weak area named, so the output is an instruction rather than a number to feel something about.

**What the score is not.** It is an estimate from a photo and the answers given alongside it — not a clinical measurement, and not a substitute for a DEXA scan or medical advice. Its value is consistency: shot the same way each week, it surfaces change that a mirror and a scale both hide. Comparing a ${SITE_NAME} score against a number from any other tool is not meaningful.

## How the plan works

The weak point from the most recent scan, the stated goal and the available equipment decide the week. Every day of the program is openable, not just today, and every movement carries a demo clip. Sessions can be rewritten in natural language — for a taken rack, a sore shoulder, or forty minutes instead of ninety — and reverted in one tap.

## Who it is for

People who train, or intend to, and who want the next week decided for them by something that looked at their current physique. It is a training app first. Someone who only wants to count calories is better served by a dedicated food tracker.

## Accuracy and limitations

- The Form Score is a photo-derived estimate; week-to-week consistency is what it is designed for, not absolute precision.
- The body-fat figure is an estimate, not a measurement.
- The web body-fat calculator uses the US Navy method, which is typically within a few percentage points of a DEXA reading, and depends on accurate tape measurements.
- The macro calculator uses Mifflin-St Jeor for BMR, an activity multiplier for TDEE, and a ±500 kcal adjustment for a fat-loss or muscle-gain goal.
- ${SITE_NAME} does not diagnose, treat or give medical advice. See the terms for the full disclaimer.

## Common questions

**Is the Form Score accurate?** It is an estimate from a photo and the answers given with it, not a clinical measurement. Shot the same way each week, it shows change a mirror or a scale will not.

**Do I need a gym?** No. Tell ${SITE_NAME} what equipment is available — bodyweight, a couple of dumbbells or a full rack — and the plan is built for that. Any movement can be swapped.

**Is it just another calorie counter?** No. The training plan is the product and food logging supports it.

**What does it cost?** Free to start; Pro unlocks unlimited scans, the full weekly plan, unlimited logging and the coach. Cancel any time from Apple ID or Google Play settings.
`;
}
