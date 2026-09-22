/**
 * MET values for the activities people actually search calorie figures for.
 *
 * ## Where these numbers come from
 *
 * The Compendium of Physical Activities (Ainsworth et al.), the reference
 * every calorie-burned calculator on the internet is ultimately quoting,
 * whether or not it says so. The current edition is the 2024 update; the codes
 * below are the Compendium's own, so any figure here can be checked against
 * the published table rather than taken on our word. That traceability is the
 * point — the competing pages in this SERP quote MET values with no source,
 * and a number nobody can check is a number nobody should trust.
 *
 * ## Why the list is short
 *
 * The Compendium has over 800 entries. Publishing all of them would be the
 * same mistake the exercise cluster was gated against: volume without
 * judgement. These are the activities the autocomplete data actually shows
 * people asking about — walking, steps, running, treadmill, cycling, incline
 * walking — plus the gym work the app programs.
 *
 * ## The honest caveat, which belongs on the page and not just here
 *
 * A MET value is a population average. It knows nothing about your fitness,
 * your efficiency, your terrain or the weather, and trained people are
 * *cheaper* at the same task than untrained people — so the fitter you get,
 * the more these numbers overstate you. Treat the output as an order of
 * magnitude, never as a budget to eat back.
 */

export type Activity = {
  slug: string;
  name: string;
  /** Compendium activity code, so the value can be traced. */
  code: string;
  met: number;
  /** Which group it sorts under in the picker. */
  group: "Walking" | "Running" | "Cycling" | "Gym" | "Sport" | "Everyday";
};

export const ACTIVITIES: Activity[] = [
  // Walking — by far the most searched of these, and the one where the
  // difference between paces matters most to the answer.
  { slug: "walking-slow", name: "Walking, slow (3.2 km/h · 2 mph)", code: "17152", met: 2.8, group: "Walking" },
  { slug: "walking", name: "Walking, moderate (4.8 km/h · 3 mph)", code: "17190", met: 3.5, group: "Walking" },
  { slug: "walking-brisk", name: "Walking, brisk (5.6 km/h · 3.5 mph)", code: "17200", met: 4.3, group: "Walking" },
  { slug: "walking-fast", name: "Walking, fast (6.4 km/h · 4 mph)", code: "17220", met: 5.0, group: "Walking" },
  { slug: "walking-incline", name: "Walking uphill (5.6 km/h, 6% grade)", code: "17210", met: 6.0, group: "Walking" },
  { slug: "hiking", name: "Hiking, cross-country", code: "17080", met: 6.0, group: "Walking" },
  { slug: "stairs", name: "Climbing stairs, general", code: "17133", met: 4.0, group: "Walking" },

  // Running.
  { slug: "jogging", name: "Jogging, general", code: "12020", met: 7.0, group: "Running" },
  { slug: "running-8kmh", name: "Running, 8 km/h (5 mph)", code: "12030", met: 8.3, group: "Running" },
  { slug: "running-10kmh", name: "Running, 10 km/h (6 mph)", code: "12050", met: 9.8, group: "Running" },
  { slug: "running-12kmh", name: "Running, 12 km/h (7.5 mph)", code: "12070", met: 11.8, group: "Running" },
  { slug: "treadmill", name: "Treadmill, moderate effort", code: "12029", met: 8.0, group: "Running" },

  // Cycling.
  { slug: "cycling-light", name: "Cycling, light (16–19 km/h)", code: "01015", met: 6.8, group: "Cycling" },
  { slug: "cycling-moderate", name: "Cycling, moderate (19–22 km/h)", code: "01018", met: 8.0, group: "Cycling" },
  { slug: "cycling-vigorous", name: "Cycling, vigorous (22–25 km/h)", code: "01020", met: 10.0, group: "Cycling" },
  { slug: "stationary-bike", name: "Stationary bike, moderate", code: "02012", met: 6.8, group: "Cycling" },

  // Gym — what the app actually programs.
  { slug: "weight-training", name: "Weight training, moderate effort", code: "02054", met: 3.5, group: "Gym" },
  { slug: "weight-training-vigorous", name: "Weight training, vigorous effort", code: "02050", met: 6.0, group: "Gym" },
  { slug: "circuit-training", name: "Circuit training, general", code: "02040", met: 7.2, group: "Gym" },
  { slug: "calisthenics", name: "Calisthenics, vigorous (push-ups, burpees)", code: "02020", met: 8.0, group: "Gym" },
  { slug: "rowing-machine", name: "Rowing machine, moderate", code: "02068", met: 7.0, group: "Gym" },
  { slug: "elliptical", name: "Elliptical trainer, moderate", code: "02048", met: 5.0, group: "Gym" },
  { slug: "hiit", name: "HIIT, general", code: "02065", met: 8.0, group: "Gym" },
  { slug: "yoga", name: "Yoga, Hatha", code: "02150", met: 2.5, group: "Gym" },
  { slug: "stretching", name: "Stretching, mild", code: "02101", met: 2.3, group: "Gym" },

  // Sport.
  { slug: "swimming", name: "Swimming laps, moderate", code: "18310", met: 5.8, group: "Sport" },
  { slug: "football", name: "Football (soccer), casual", code: "15610", met: 7.0, group: "Sport" },
  { slug: "basketball", name: "Basketball, general", code: "15055", met: 6.5, group: "Sport" },
  { slug: "tennis", name: "Tennis, singles", code: "15675", met: 8.0, group: "Sport" },
  { slug: "badminton", name: "Badminton, social", code: "15020", met: 5.5, group: "Sport" },
  { slug: "boxing-bag", name: "Boxing, punching bag", code: "15200", met: 6.0, group: "Sport" },
  { slug: "dancing", name: "Dancing, general", code: "03025", met: 5.0, group: "Sport" },

  // Everyday — the "do my chores count" queries.
  { slug: "cleaning", name: "House cleaning, general", code: "05040", met: 3.3, group: "Everyday" },
  { slug: "gardening", name: "Gardening, general", code: "08245", met: 3.8, group: "Everyday" },
  { slug: "desk-work", name: "Desk work, sitting", code: "11580", met: 1.5, group: "Everyday" },
];

export const ACTIVITY_GROUPS = [
  "Walking",
  "Running",
  "Cycling",
  "Gym",
  "Sport",
  "Everyday",
] as const;

export function activity(slug: string): Activity | undefined {
  return ACTIVITIES.find((a) => a.slug === slug);
}

/** The edition the values above were read from. Shown on the page. */
export const COMPENDIUM_EDITION = "2024 Compendium of Physical Activities";

/**
 * An average adult stride, used to turn a step count into a distance and then
 * into minutes of walking. It is a rough conversion and the page says so:
 * stride length varies with height and pace by well over 20%, which is why
 * every "calories per 10,000 steps" figure on the internet disagrees.
 */
export const STEPS_PER_KM = 1300;
