import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import MobileCTA from "../components/MobileCTA";
import PhoneShot from "../components/PhoneShot";
import StoreButtons from "../components/StoreButtons";
import InstallCard from "../components/InstallCard";
import { JsonLdScript, faqJsonLd } from "../components/tools/ToolPage";
import { APP_STORE_URL, SITE_NAME, SITE_URL } from "../lib/site";

/**
 * The product landing page for the "ai body scan" query family.
 *
 * The roundup (`/best-ai-body-scan-apps`) compares; the guides explain; this
 * page is the one that says what *our* scan does, with the real screens, the
 * privacy terms and the limits, so a searcher who already wants a body scan app
 * has a page that answers "what is this one" without the homepage's wider
 * story about training plans.
 */

const UPDATED = "2026-11-05";
const TITLE = "AI Body Scan App: Physique Score From One Photo";
const DESCRIPTION =
  "Dietly Fit's AI body scan scores your physique out of 100 from one photo: definition, leanness, symmetry, posture and a body fat estimate, with the weak point named.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | ${SITE_NAME}` },
  description: DESCRIPTION,
  keywords: [
    "ai body scan",
    "ai body scan app",
    "body scan app",
    "physique scanner app",
    "body fat scanner app",
  ],
  alternates: { canonical: "/ai-body-scan" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/ai-body-scan", type: "website" },
};

const L = "underline hover:text-fg";

const MEASURES = [
  { k: "Definition", v: "Visible muscle separation through the chest, shoulders, arms and midsection." },
  { k: "Leanness", v: "How low your body fat looks, judged against the reference for your sex." },
  { k: "Symmetry", v: "Left to right balance and proportions, including the shoulder-to-waist taper." },
  { k: "Posture", v: "Shoulder position and alignment, which change how every photo of you reads." },
  { k: "Body fat estimate", v: "A rounded percentage from the photo. An estimate with a margin of a few points, and labelled as one." },
  { k: "Fix first", v: "The lowest score that training can actually move, named so the next month has one priority." },
];

const COMPARE = [
  { m: "Dietly Fit AI body scan", what: "Physique score, four sub-scores, body fat estimate, weak point", cost: "In the app, weekly", best: "Tracking how your physique changes and what to train" },
  { m: "Tape measure + Navy formula", what: "Body fat % from circumferences", cost: "Free", best: "A repeatable body fat number at home" },
  { m: "Smart scale (BIA)", what: "Weight and a body fat reading", cost: "Device", best: "Daily weight trend; body fat swings with hydration" },
  { m: "DEXA scan", what: "Fat, lean and bone mass by region", cost: "Clinic fee per scan", best: "The most precise body composition number" },
];

const FAQS = [
  {
    q: "How does the AI body scan work?",
    a: "You take one upper-body photo in the app. A vision model rates definition, leanness, symmetry and posture from 0 to 100 against the reference for your sex, estimates body fat, and names the weakest area. Your Form Score is the average of the four, smoothed across weekly scans so one bad photo does not swing it.",
  },
  {
    q: "How accurate is an AI body scan?",
    a: "It is an estimate, not a clinical measurement. It reliably separates large differences, but the body fat figure carries an error of several percentage points, as every photo method does. Taken the same way each week, the change between scans is far more reliable than any single number.",
  },
  {
    q: "What happens to my photos?",
    a: "Scan photos are kept in your account so you can compare them week to week. They are encrypted, never sold and never used for advertising, and deleting your account permanently removes them within 30 days. The free web analyzer does not store photos at all.",
  },
  {
    q: "Is the AI body scan free?",
    a: "The app is free to download, with a 7-day free trial on the yearly plan. Dietly Fit Pro unlocks unlimited scans and the full weekly plan. To try a single score on the web first, use the free physique analyzer, which needs no account.",
  },
  {
    q: "Does it work for women?",
    a: "Yes. The scan judges against a sex-specific reference, because the same body fat percentage looks very different on men and women, and the sub-scores are named neutrally rather than around a male template.",
  },
];

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[28px] md:text-[34px] font-bold text-fg font-body tracking-tight mb-5">{children}</h2>;
}

export default function Page() {
  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "MobileApplication",
          name: SITE_NAME,
          url: `${SITE_URL}/ai-body-scan`,
          description: DESCRIPTION,
          applicationCategory: "HealthApplication",
          operatingSystem: "iOS, Android",
          installUrl: APP_STORE_URL,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "AI body scan", item: `${SITE_URL}/ai-body-scan` },
          ],
        }}
      />
      <Navbar />
      <main className="pt-32 pb-24 overflow-hidden">
        <section className="max-w-[1080px] mx-auto px-6 md:px-12 grid md:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
          <Reveal>
            <span className="text-[11px] font-bold tracking-[3px] text-accent uppercase mb-6 block">AI body scan</span>
            <h1 className="text-[clamp(36px,5.5vw,60px)] font-bold leading-[1.05] tracking-[-2px] text-fg font-body mb-6">
              Your physique, scored out of 100 from one photo
            </h1>
            <p className="text-[17px] md:text-[19px] text-fg-muted leading-relaxed">
              The {SITE_NAME} AI body scan reads one upper-body photo and scores definition, leanness, symmetry and
              posture, estimates your body fat, and names the one thing to fix first. Then it builds your training week
              around it. Rescan weekly and watch the number move.
            </p>
            <StoreButtons className="mt-8" height={44} />
            <p className="mt-4 text-[14px] text-fg-faint">
              Want to try it first?{" "}
              <Link href="/physique-analyzer" className={L}>
                Get a free physique score on the web
              </Link>
              , no account needed.
            </p>
          </Reveal>
          <Reveal delay={150} className="mx-auto w-full max-w-[300px]">
            <PhoneShot
              src="/images/app/scan.webp"
              alt="The Dietly Fit scan result: a score of 72 out of 100, with definition 68, leanness 61 flagged fix first, symmetry 80, posture 74, body fat 19% and potential 84."
              width={760}
              height={1553}
              frame={false}
              priority
            />
          </Reveal>
        </section>

        <div className="max-w-[820px] mx-auto px-6 md:px-12">
          <section className="mt-24">
            <Reveal>
              <H2>What the scan measures</H2>
              <div className="grid sm:grid-cols-2 gap-4">
                {MEASURES.map((m) => (
                  <div key={m.k} className="card p-5">
                    <h3 className="text-[16px] font-bold text-fg">{m.k}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-fg-muted">{m.v}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[16px] leading-[1.75] text-fg-muted">
                The overall Form Score is the average of the four sub-scores. Our guides explain{" "}
                <Link href="/guides/what-is-a-physique-score" className={L}>
                  what a physique score is
                </Link>{" "}
                and{" "}
                <Link href="/guides/rate-my-physique" className={L}>
                  how AI physique ratings work
                </Link>
                , including where they fail.
              </p>
            </Reveal>
          </section>

          <section className="mt-24">
            <Reveal>
              <H2>Sample results from the app</H2>
              <p className="text-[16px] leading-[1.75] text-fg-muted">
                These are screens from the shipping app on a demo account, not mockups.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
                <figure className="mx-auto w-full max-w-[240px]">
                  <PhoneShot
                    src="/images/app/score-card.png"
                    alt="The shareable Form Score card: 72 out of 100, with the line 'Leanness is still the one holding you back' and body fat about 19%."
                    width={1320}
                    height={2718}
                    frame={false}
                  />
                  <figcaption className="mt-3 text-center text-[13px] text-fg-faint">Your score and the weak point</figcaption>
                </figure>
                <figure className="mx-auto w-full max-w-[240px]">
                  <PhoneShot
                    src="/images/app/trends.webp"
                    alt="The progress screen: a 12-week score chart rising to 72, plus 9 points since week 1, 11 scans taken, and progress photos from weeks 1, 4, 8 and 12."
                    width={760}
                    height={1544}
                    frame={false}
                  />
                  <figcaption className="mt-3 text-center text-[13px] text-fg-faint">The trend across weekly scans</figcaption>
                </figure>
                <figure className="mx-auto w-full max-w-[240px]">
                  <PhoneShot
                    src="/images/app/muscle-map.webp"
                    alt="The muscle ranks screen: front and back body maps with trained muscles highlighted and a lagging muscle flagged."
                    width={760}
                    height={1551}
                    frame={false}
                  />
                  <figcaption className="mt-3 text-center text-[13px] text-fg-faint">A rank for every muscle, from your lifts</figcaption>
                </figure>
              </div>
            </Reveal>
          </section>

          <section className="mt-24">
            <Reveal>
              <H2>How it works</H2>
              <ol className="list-decimal pl-6 space-y-3 text-[16px] leading-[1.75] text-fg-muted">
                <li>
                  <strong className="text-fg">Take one photo a week.</strong> Upper body, front on, the same light and
                  distance each time. The{" "}
                  <Link href="/guides/progress-photos-guide" className={L}>
                    progress photo guide
                  </Link>{" "}
                  covers the setup.
                </li>
                <li>
                  <strong className="text-fg">Get your score and the weak point.</strong> Four sub-scores, a body fat
                  estimate, and the lowest area flagged to fix first.
                </li>
                <li>
                  <strong className="text-fg">Train around it.</strong> The weekly plan shifts volume towards that
                  area, and every set you log also ranks each muscle. See{" "}
                  <Link href="/guides/training-around-a-weak-point" className={L}>
                    training around a weak point
                  </Link>
                  .
                </li>
                <li>
                  <strong className="text-fg">Rescan and compare.</strong> The score is smoothed across scans so the
                  trend reflects real change, not one photo in bad light.
                </li>
              </ol>
            </Reveal>
          </section>

          <section className="mt-24">
            <Reveal>
              <H2>Privacy</H2>
              <ul className="list-disc pl-6 space-y-2 text-[16px] leading-[1.75] text-fg-muted">
                <li>Scan photos are kept in your account so you can compare them week to week, and are used only to run your scans.</li>
                <li>They are encrypted in transit and at rest, and are never sold or used for advertising.</li>
                <li>
                  The only parties that process them are the infrastructure providers that run the scan for us, under
                  confidentiality terms.
                </li>
                <li>
                  Delete your account from inside the app or at{" "}
                  <Link href="/delete-account" className={L}>
                    dietly.life/delete-account
                  </Link>{" "}
                  and your photos are permanently deleted within 30 days. Full details are in the{" "}
                  <Link href="/privacy" className={L}>
                    privacy policy
                  </Link>
                  .
                </li>
              </ul>
            </Reveal>
          </section>

          <section className="mt-24">
            <Reveal>
              <H2>How it compares</H2>
              <p className="text-[16px] leading-[1.75] text-fg-muted mb-6">
                A photo scan is not the most precise way to measure body fat, and we do not claim it is. It is the
                easiest way to track how a physique changes and decide what to train. Here is where each method fits.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-[14px] border-collapse min-w-[560px]">
                  <thead>
                    <tr className="border-b border-border text-left text-fg">
                      <th className="py-2 pr-4">Method</th>
                      <th className="py-2 pr-4">What it gives you</th>
                      <th className="py-2 pr-4">Cost</th>
                      <th className="py-2">Best for</th>
                    </tr>
                  </thead>
                  <tbody className="text-fg-muted">
                    {COMPARE.map((c) => (
                      <tr key={c.m} className="border-b border-border last:border-0 align-top">
                        <td className="py-3 pr-4 font-semibold text-fg">{c.m}</td>
                        <td className="py-3 pr-4">{c.what}</td>
                        <td className="py-3 pr-4">{c.cost}</td>
                        <td className="py-3">{c.best}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-[16px] leading-[1.75] text-fg-muted">
                For other apps, our{" "}
                <Link href="/best-ai-body-scan-apps" className={L}>
                  roundup of the best AI body scan apps
                </Link>{" "}
                compares what each measures and charges, and the{" "}
                <Link href="/vs" className={L}>
                  head-to-head comparisons
                </Link>{" "}
                go app by app. To check a photo estimate against a tape, use the{" "}
                <Link href="/body-fat-calculator" className={L}>
                  body fat calculator
                </Link>
                , or see{" "}
                <Link href="/guides/body-fat-from-a-photo" className={L}>
                  what each body fat range looks like
                </Link>
                .
              </p>
            </Reveal>
          </section>

          <section className="mt-24">
            <Reveal>
              <H2>Common questions</H2>
              <dl className="space-y-6">
                {FAQS.map((f) => (
                  <div key={f.q}>
                    <dt className="text-[17px] font-bold text-fg">{f.q}</dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-fg-muted">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </section>

          <InstallCard
            className="mt-20"
            placement="ai_body_scan_end"
            title="Scan your physique this week"
            body="One photo, a score out of 100, the weak point named, and a training week built around it. Rescan next week and see what moved."
          />
          <p className="mt-10 text-[12px] leading-relaxed text-fg-faint">
            Scores and body fat figures are estimates from a photo, not medical measurements. Last updated{" "}
            <time dateTime={UPDATED}>5 November 2026</time>.
          </p>
        </div>
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
