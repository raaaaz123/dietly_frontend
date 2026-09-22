import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { JsonLdScript } from "../components/tools/ToolPage";
import { SITE_URL } from "../lib/site";
import { WORKOUTS } from "../lib/workouts";
import { KIT, CATEGORIES } from "../lib/exercises";

const TITLE = "Workout Plans — Home, Bodyweight & Calisthenics";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Dietly Fit` },
  description:
    "Free workout plans you can actually follow: the full week written out with sets, reps and rest, and a demo clip for every movement. No gym required.",
  keywords: ["workout plan", "workout routine", "home workout", "workout split"],
  alternates: { canonical: "/workouts" },
  openGraph: {
    title: TITLE,
    description:
      "Free workout plans with the full week written out — sets, reps, rest and a demo for every movement.",
    url: "/workouts",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: TITLE,
          url: `${SITE_URL}/workouts`,
          hasPart: WORKOUTS.map((w) => ({
            "@type": "ExercisePlan",
            name: w.name,
            description: w.description,
            url: `${SITE_URL}/workouts/${w.slug}`,
          })),
        }}
      />
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <Reveal>
            <h1 className="text-[clamp(32px,6vw,56px)] font-bold leading-[1.04] tracking-[-2px] text-fg font-body mb-5">
              Workout plans
            </h1>
            <p className="text-[17px] md:text-[19px] text-fg-muted max-w-[620px] leading-relaxed">
              Every plan here is written out in full — the days, the movements,
              the sets, the reps and the rest — with a demo clip for each
              exercise. No email, no signup, no PDF to download.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid sm:grid-cols-2 gap-5 mt-12">
              {WORKOUTS.map((w) => (
                <Link
                  key={w.slug}
                  href={`/workouts/${w.slug}`}
                  className="card card-hover p-6 block"
                >
                  <span className="text-[19px] font-bold text-fg block mb-2">
                    {w.name}
                  </span>
                  <span className="text-[14px] text-fg-muted leading-relaxed block mb-4">
                    {w.blurb}
                  </span>
                  <span className="text-[12px] text-fg-faint">
                    {w.daysPerWeek} days a week · {w.sessionLength} · {w.equipment}
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal delay={160}>
            <section className="mt-16">
              <h2 className="text-[24px] font-bold text-fg font-body tracking-tight mb-3">
                Build your own from the catalogue
              </h2>
              <p className="text-[16px] leading-[1.75] text-fg-muted mb-6">
                If none of the plans above fits your week, the movements are all
                browsable by the muscle they train or the equipment you have.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {CATEGORIES.slice(0, 8).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/exercises/muscle/${c.slug}`}
                    className="px-4 py-2 rounded-full border border-border text-[14px] text-fg-muted hover:border-accent hover:text-fg transition-colors"
                  >
                    {c.name} workout
                  </Link>
                ))}
                {KIT.map((k) => (
                  <Link
                    key={k.slug}
                    href={`/exercises/equipment/${k.slug}`}
                    className="px-4 py-2 rounded-full border border-border text-[14px] text-fg-muted hover:border-accent hover:text-fg transition-colors"
                  >
                    {k.name}
                  </Link>
                ))}
              </div>
            </section>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
