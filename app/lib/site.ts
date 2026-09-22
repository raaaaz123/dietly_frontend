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
export const SITE_NAME = "Dietly Fit";
export const TAGLINE = "Log the work. Scan the result. Train what needs it.";

export const DESCRIPTION =
  "Log every lift. One weekly photo scores your physique out of 100 and names the weak point holding it back, then Dietly Fit builds the week that fixes it.";

/** Platform facts, mirrored from the App Store listing. */
export const PLATFORM = "iOS";
export const MIN_OS = "iOS 17";
export const APP_STORE_ID = "6769698416";
export const APP_STORE_URL = `https://apps.apple.com/app/id${APP_STORE_ID}`;

/** Verified live — both stores carry the app. */
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.dietlyai.app";

/**
 * IndexNow ownership key (`§2.2`).
 *
 * Not a secret: the protocol proves ownership by serving this exact string at
 * `{SITE_URL}/{INDEXNOW_KEY}.txt`, so the file in `public/` has to be public and
 * committed. Rotating it means generating a new hex string, writing the new
 * file, deleting the old one and changing this constant — all three, or
 * submissions start failing silently with a 403.
 */
export const INDEXNOW_KEY = "7ff8c76abd83084c342e887a87b60f74";

/** Counts quoted in copy. `1,300` is the exercise catalogue — see ExerciseLibrary.swift. */
export const EXERCISE_COUNT = "1,300+";
export const SCORE_MAX = 100;
