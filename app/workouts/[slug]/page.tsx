import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";
import { JsonLdScript } from "../../components/tools/ToolPage";
import { SITE_NAME, SITE_URL } from "../../lib/site";
import { WORKOUTS, workout, workoutMetadata } from "../../lib/workouts";
import PrintButton from "../PrintButton";

export function generateStaticParams() {
  return WORKOUTS.map((w) => ({ slug: w.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return workoutMetadata(slug) as Metadata;
}

const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const w = workout(slug);

  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "ExercisePlan",
          name: w.title,
          description: w.description,
          url: `${SITE_URL}/workouts/${w.slug}`,
          dateModified: w.updated,
          activityDuration: w.sessionLength,
          activityFrequency: `${w.daysPerWeek} times per week`,
          exerciseType: "Strength training",
          intensity: w.level,
        }}
      />
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Workouts", item: `${SITE_URL}/workouts` },
            {
              "@type": "ListItem",
              position: 3,
              name: w.name,
              item: `${SITE_URL}/workouts/${w.slug}`,
            },
          ],
        }}
      />
      <Navbar />
      <main className="pt-32 pb-24">
        <article className="max-w-[860px] mx-auto px-6 md:px-12">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-7 text-[13px] text-fg-faint">
              <Link href="/" className="hover:text-fg transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/workouts" className="hover:text-fg transition-colors">Workouts</Link>
            </nav>

            <h1 className="text-[clamp(30px,5vw,48px)] font-bold leading-[1.06] tracking-[-1.5px] text-fg font-body mb-5">
              {w.name}
            </h1>
            <p className="text-[17px] md:text-[19px] leading-relaxed text-fg-muted max-w-[680px]">
              {w.intro}
            </p>

            <dl className="mt-9 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
              {[
                ["Level", w.level],
                ["Days a week", w.daysPerWeek],
                ["Equipment", w.equipment],
                ["Per session", w.sessionLength],
              ].map(([k, v]) => (
                <div key={k} className="bg-bg-elevated p-4">
                  <dt className="text-[11px] font-bold tracking-[1.5px] text-fg-faint uppercase mb-1.5">
                    {k}
                  </dt>
                  <dd className="text-[14px] text-fg leading-snug">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex items-center gap-3">
              <PrintButton />
              <span className="print-hide text-[12px] text-fg-faint">
                One page, no email required.
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            {w.sessions.map((s) => (
              <section key={s.day} className="mt-12 print-keep print-url">
                <div className="flex items-baseline gap-3 mb-1">
                  <h2 className="text-[24px] font-bold text-fg font-body tracking-tight">
                    {s.day}
                  </h2>
                </div>
                <p className="text-[14px] text-fg-muted mb-5">{s.focus}</p>

                <div className="rounded-2xl border border-border overflow-hidden">
                  {s.blocks.map((b, i) => (
                    <div
                      key={b.name}
                      className={`p-5 bg-bg-elevated ${i > 0 ? "border-t border-border" : ""}`}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        {/* A movement with a catalogue page links to it. This is
                            the whole point of the cluster: the plan is what
                            people search for, and it feeds the exercise pages
                            that had almost no inbound links before it. */}
                        {b.slug ? (
                          <Link
                            href={`/exercises/${b.slug}`}
                            className="text-[16px] font-bold text-fg hover:text-accent transition-colors"
                          >
                            {b.name}
                          </Link>
                        ) : (
                          <span className="text-[16px] font-bold text-fg">{b.name}</span>
                        )}
                        <span className="text-[14px] text-fg-muted tabular-nums shrink-0">
                          {b.sets} × {b.reps}
                          <span className="text-fg-faint"> · {b.rest} rest</span>
                        </span>
                      </div>
                      {b.note && (
                        <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">
                          {b.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </Reveal>

          <Reveal delay={160}>
            <section className="mt-14">
              <h2 className="text-[24px] font-bold text-fg font-body tracking-tight mb-4">
                How to progress this
              </h2>
              <p className="text-[16px] leading-[1.75] text-fg-muted">
                Add a rep before you add a set, and add a set before you make a
                movement harder. When you hit the top of the rep range on every
                set of an exercise, move to the harder variation named in its
                note and start again at the bottom of the range. That is
                progressive overload without any weights to add — the load comes
                from leverage instead of from plates.
              </p>
              <p className="mt-4 text-[16px] leading-[1.75] text-fg-muted">
                Take the last set of each exercise close to failure — one or two
                reps left. Bodyweight training fails when the sets are
                comfortable, because there is no bar weight to tell you the
                session was hard enough.
              </p>
            </section>

            <div className="glass-card mt-12 rounded-2xl border-l-4 !border-l-accent bg-bg-elevated/30 p-7">
              <h2 className="text-[18px] font-bold text-fg mb-3">
                A plan built for your body, not a generic one
              </h2>
              <p className="text-[15px] leading-relaxed text-fg-muted">
                This is a good plan. It is not <em>your</em> plan — it does not
                know which area is holding your physique back. {SITE_NAME} scores
                one photo a week out of 100, names the weak point, and builds the
                week of training around it, from whatever equipment you actually
                have.
              </p>
              <Link href="/#get" className="btn btn-primary btn-sm mt-5">
                Get the app
              </Link>
            </div>

            {w.related.length > 0 && (
              <section className="mt-14 print-hide">
                <h2 className="text-[20px] font-bold text-fg font-body tracking-tight mb-4">
                  Other plans
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {w.related.map((slug) => {
                    const r = workout(slug);
                    return (
                      <Link
                        key={slug}
                        href={`/workouts/${r.slug}`}
                        className="card card-hover p-5 block"
                      >
                        <span className="text-[16px] font-bold text-fg block mb-1.5">
                          {r.name}
                        </span>
                        <span className="text-[14px] text-fg-muted leading-snug">
                          {r.blurb}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            <p className="mt-12 text-[12px] leading-relaxed text-fg-faint border border-border rounded-xl p-5">
              Reviewed <time dateTime={w.updated}>{fmtDate(w.updated)}</time>.
              Sets and reps are a starting point, not a prescription. Speak to a
              qualified professional before starting a new exercise program,
              particularly if you are managing an injury or a health condition.
            </p>
          </Reveal>
        </article>
      </main>
      <Footer />
    </>
  );
}
