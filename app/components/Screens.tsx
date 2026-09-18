import PhoneShot from "./PhoneShot";

/**
 * The app, actually pictured.
 *
 * The page argued for a training app entirely in prose — the only image on it
 * was a CSS drawing of one card. Four captures of the shipping build do more
 * for "is this real" than any paragraph here, and they are the four screens
 * that carry the pivot: the score, the week, the session, the trend.
 *
 * Captions rather than titles. Each one says what the screen answers, because
 * a screenshot without a sentence is decoration.
 */

const screens: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  title: string;
  body: string;
}[] = [
  {
    src: "/images/app/scan.webp",
    width: 760,
    height: 1553,
    alt: "The scan result screen: a photo of a lean athletic man framed by green scan brackets, a Form Score of 72 out of 100, and definition 68, leanness 61, symmetry 80, posture 74, body fat 19% and potential 84 below it, with leanness marked \u201cfix first\u201d.",
    title: "Your score, and its weak point",
    body: "Definition, leanness, symmetry and posture \u2014 with the one holding the number down marked \u201cfix first\u201d.",
  },
  {
    src: "/images/app/training.webp",
    width: 760,
    height: 1542,
    alt: "The week screen, headed \u201cThis week \u2014 built from your last scan\u201d: four routine cards for Monday, Tuesday, Thursday and Saturday, each with its exercise count, duration, a body map of the muscles it loads and a Start button. Monday is marked Today.",
    title: "The week, built from the scan",
    body: "Four sessions, each with the muscles it loads and a time before you commit to it. Today is marked.",
  },
  {
    src: "/images/app/session.webp",
    width: 760,
    height: 1542,
    alt: "A Romanian deadlift in progress: an anatomical render with the hamstrings and glutes highlighted, a Technique button, and a set table showing 60kg for 10 and 70kg for 8 completed, the third set active.",
    title: "Log it set by set",
    body: "Weight and reps per set, ticked off as you go, with a technique clip and a one-tap swap for anything that is taken.",
  },
  {
    src: "/images/app/trends.webp",
    width: 760,
    height: 1544,
    alt: "The progress screen: a twelve-week line chart of the Form Score rising to 72, with +9 since week 1 and 11 scans taken, above a row of progress photo thumbnails from week 1 to week 12.",
    title: "Whether it is working",
    body: "The score week by week, and every scan photo kept beside it, so a good month is visible rather than remembered.",
  },
];

export default function Screens() {
  return (
    <section id="screens" className="section pt-0">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="eyebrow">The app</p>
          <h2 className="h2 mt-3.5">Four screens do the whole job.</h2>
        </div>

        {/* Subgrid so the captions sit on one line: the share card is a 2:3
            image among 1:2 phone captures, and without a shared image row it
            drags its own caption 200px up the page. */}
        <ul className="mt-8 grid gap-7 sm:grid-cols-2 sm:grid-rows-[auto_auto_auto_auto] lg:grid-cols-4 lg:grid-rows-[auto_auto] lg:gap-5">
          {screens.map((screen) => (
            <li
              key={screen.src}
              className="sm:row-span-2 sm:grid sm:grid-rows-subgrid sm:gap-0"
            >
              <div className="flex items-center justify-center">
                <PhoneShot
                  src={screen.src}
                  alt={screen.alt}
                  frame={false}
                  width={screen.width ?? 760}
                  height={screen.height ?? 1542}
                  className="w-full"
                />
              </div>
              <div>
                <h3 className="h3 mt-4">{screen.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">
                  {screen.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
