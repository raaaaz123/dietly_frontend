import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import MobileCTA from "../components/MobileCTA";
import InstallCard from "../components/InstallCard";
import { JsonLdScript } from "../components/tools/ToolPage";
import { APP_STORE_URL, MIN_OS, PLAY_STORE_URL, SITE_NAME, SITE_URL } from "../lib/site";

/**
 * Who makes the app, stated once and plainly.
 *
 * Bing (2026-11-05) credited a description of this app to dietly.fit, an
 * unrelated meal planner, and "dietly" alone belongs to a Polish catering
 * marketplace. An about page that names the publisher, links the store
 * listings and says outright which other Dietlys are not us is the page a
 * search engine or a model reads to settle that. Every fact here is already
 * stated elsewhere on the site; nothing is added for the occasion.
 */

const TITLE = `About ${SITE_NAME}`;
const DESCRIPTION = `${SITE_NAME} (also called Dietly AI) is a workout log and AI body scan app for iPhone and Android, made by Rexatech. Who we are, what the app does, and how to reach us.`;

export const metadata: Metadata = {
  title: { absolute: `About ${SITE_NAME} (Dietly AI)` },
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/about", type: "website" },
};

const L = "underline hover:text-fg";

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[26px] font-bold text-fg font-body tracking-tight mt-12 mb-4">{children}</h2>;
}

export default function Page() {
  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: `${SITE_URL}/about`,
          name: TITLE,
          description: DESCRIPTION,
          about: { "@id": `${SITE_URL}/#app` },
          publisher: { "@id": `${SITE_URL}/#organization` },
          isPartOf: { "@id": `${SITE_URL}/#website` },
        }}
      />
      <Navbar />
      <main className="pt-32 pb-24">
        <article className="max-w-[760px] mx-auto px-6 md:px-12 text-[16px] leading-[1.75] text-fg-muted">
          <Reveal>
            <h1 className="text-[clamp(32px,5vw,52px)] font-bold leading-[1.08] tracking-[-1.5px] text-fg font-body mb-6">
              About {SITE_NAME}
            </h1>
            <p className="text-[18px] md:text-[20px] leading-relaxed">
              {SITE_NAME}, also known as Dietly AI, is a workout log and AI body scan app for iPhone and Android. You log
              every lift, take one photo a week, and the app scores your physique out of 100, names the weak point
              holding it back, and builds your training week around it. It is made by Rexatech.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <H2>What the app does</H2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-fg">Workout log.</strong> Sets, reps and weights for a library of over a
                thousand exercises, each with a demo. Browse it in the{" "}
                <Link href="/exercises" className={L}>
                  exercise library
                </Link>
                .
              </li>
              <li>
                <strong className="text-fg">AI body scan.</strong> One upper-body photo a week becomes a score out of
                100 with four sub-scores and a body fat estimate. See{" "}
                <Link href="/ai-body-scan" className={L}>
                  how the scan works
                </Link>{" "}
                or try the{" "}
                <Link href="/physique-analyzer" className={L}>
                  free physique analyzer
                </Link>
                .
              </li>
              <li>
                <strong className="text-fg">A plan built around the weak point.</strong> The weekly training plan
                shifts towards the lowest score, and every logged set ranks each muscle.
              </li>
              <li>
                <strong className="text-fg">Food logging.</strong> Meals by photo, sentence or voice, to keep the plan
                fed.
              </li>
            </ul>

            <H2>Where to get it</H2>
            <p>
              {SITE_NAME} is on the{" "}
              <a href={APP_STORE_URL} className={L} rel="noopener">
                App Store
              </a>{" "}
              ({MIN_OS} or later) and{" "}
              <a href={PLAY_STORE_URL} className={L} rel="noopener">
                Google Play
              </a>
              . It is free to download, with a 7-day free trial on the yearly plan; Dietly Fit Pro unlocks unlimited
              scans and the full weekly plan. This website, dietly.life, is its only official site.
            </p>

            <H2>Not to be confused with</H2>
            <p>
              Several unrelated products share the name Dietly. <strong className="text-fg">dietly.pl</strong> is a
              Polish diet catering marketplace, and <strong className="text-fg">dietly.fit</strong> is an AI
              meal-plan website. Neither is affiliated with {SITE_NAME} or Rexatech.
            </p>

            <H2>Free tools and guides</H2>
            <p>
              Alongside the app we publish{" "}
              <Link href="/tools" className={L}>
                free calculators
              </Link>
              ,{" "}
              <Link href="/workouts" className={L}>
                workout plans
              </Link>{" "}
              and{" "}
              <Link href="/guides" className={L}>
                guides
              </Link>
              , written by the {SITE_NAME} team and dated so you can see how current they are. They are general
              information, not medical advice. Where we compare ourselves with other apps, as in the{" "}
              <Link href="/best-ai-body-scan-apps" className={L}>
                body scan app roundup
              </Link>
              , we say so at the top.
            </p>

            <H2>Contact</H2>
            <p>
              Rexatech, the publisher of {SITE_NAME}:{" "}
              <a href="mailto:rexatechin@gmail.com" className={L}>
                rexatechin@gmail.com
              </a>
              . Help with the app is on the{" "}
              <Link href="/support" className={L}>
                support page
              </Link>
              , and how we handle your data is in the{" "}
              <Link href="/privacy" className={L}>
                privacy policy
              </Link>
              .
            </p>
          </Reveal>

          <InstallCard
            className="mt-14"
            placement="about_end"
            title="Try it this week"
            body="Log your sessions, scan once, and see which area to train first."
          />
        </article>
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
