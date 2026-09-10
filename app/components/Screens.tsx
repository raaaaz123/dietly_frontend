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
  height?: number;
  title: string;
  body: string;
}[] = [
  {
    src: "/images/app/scan.png",
    alt: "The Form Score screen: 72 out of 100 over a scan, with definition, leanness, symmetry and posture scored underneath.",
    height: 1300,
    title: "Your score, and its weak point",
    body: "Definition, leanness, symmetry and posture — with the one that is holding the number down marked “fix first”.",
  },
  {
    src: "/images/app/training.png",
    alt: "The Training tab: a week strip with today marked, three session options for the day, and saved sessions below.",
    title: "The week, openable",
    body: "Every day of the block, not just today — and where a day offers alternatives, all of them.",
  },
  {
    src: "/images/app/session.png",
    alt: "A session page listing six movements with sets and reps, above a muscle distribution strip.",
    title: "Every session, before you start it",
    body: "Sets, reps and rest for each movement, and which muscles the session actually loads. Swap anything that isn't free.",
  },
  {
    src: "/images/app/trends.png",
    alt: "The Progress tab: weekly training volume as bars, an adherence grid, and a muscle balance breakdown.",
    title: "Whether it is working",
    body: "Tonnage a week, sessions kept against sessions planned, and the areas getting the least work.",
  },
];

export default function Screens() {
  return (
    <section id="screens" className="section pt-0">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="eyebrow">The app</p>
          <h2 className="h2 mt-5">Four screens do the whole job.</h2>
        </div>

        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {screens.map((screen) => (
            <li key={screen.src}>
              <PhoneShot src={screen.src} alt={screen.alt} height={screen.height} />
              <h3 className="h3 mt-6">{screen.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">
                {screen.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
