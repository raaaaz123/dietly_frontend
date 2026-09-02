/**
 * The single source of truth for facts about the site and the app.
 *
 * Three consumers need the same numbers and wording: the page copy, the
 * structured data crawlers read, and the App Store listing. Anything
 * duplicated across those drifts, and drifted structured data is worse than
 * none — Google treats a mismatch between markup and visible copy as spam.
 *
 * Every claim here is checked against the shipping app. If you change a number,
 * change it in the app first.
 */

export const SITE_URL = "https://dietly.life";
export const SITE_NAME = "Dietly";
export const TAGLINE = "Scan your body. Get the plan that moves it.";

export const DESCRIPTION =
  "Dietly turns one weekly photo into a Form Score out of 100, names the weak point holding it back, and builds the week of training that fixes it. Food logging and an AI coach included.";

/** Platform facts, mirrored from the App Store listing. */
export const PLATFORM = "iOS";
export const MIN_OS = "iOS 17";
export const APP_STORE_ID = "6769698416";
export const APP_STORE_URL = `https://apps.apple.com/app/id${APP_STORE_ID}`;

/** Verified live — both stores carry the app. */
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.dietlyai.app";

/** Counts quoted in copy. `1,300` is the exercise catalogue — see ExerciseLibrary.swift. */
export const EXERCISE_COUNT = "1,300+";
export const SCORE_MAX = 100;
