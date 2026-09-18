import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";
import ExerciseGrid from "../../components/exercises/ExerciseGrid";
import { JsonLdScript } from "../../components/tools/ToolPage";
import { SITE_NAME, SITE_URL } from "../../lib/site";
import {
  EXERCISES,
  exercise,
  isIndexable,
  slugify,
  DIFFICULTY_LABEL,
} from "../../lib/exercises";

/**
 * One movement.
 *
 * ## Why most of these are `noindex`
 *
 * All 507 published movements have a clip, a target muscle and an equipment
 * tag. None of them have written coaching — no overview, no steps, no cues —
 * and a page of a title, a video and two tags is thin content whatever else is
 * true about it. Publishing 507 of those at once on a domain with no ranking
 * history is the textbook way to earn a sitewide quality problem instead of
 * 507 entry points.
 *
 * So the page exists, is linked, and is crawlable — and `isIndexable` decides
 * whether it is allowed to compete. `noindex, follow` is the exact instruction
 * that wants: do not rank this yet, but do follow its links and count them
 * towards the category pages, which *are* worth ranking today.
 *
 * The moment somebody authors steps for a movement, its page becomes
 * indexable on the next build. No second list, nothing to remember.
 */
export function generateStaticParams() {
  return EXERCISES.map((e) => ({ slug: e.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = exercise(slug);
  if (!e) return {};
  const muscle = e.target || e.primaryMuscles[0] || e.category;
  const title = `${e.name} — How to Do It`;
  const description = e.overview
    ? e.overview.slice(0, 155)
    : `${e.name}: a ${DIFFICULTY_LABEL[e.difficulty]?.toLowerCase() ?? e.difficulty} ${e.category.toLowerCase()} movement targeting the ${muscle.toLowerCase()}. Demo clip, equipment needed, and a starting set and rep scheme.`;
  return {
    title: { absolute: title.length > 62 ? e.name : title },
    description,
    alternates: { canonical: `/exercises/${e.slug}` },
    robots: isIndexable(e) ? undefined : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: `/exercises/${e.slug}`,
      type: "article",
    },
  };
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-border py-3">
      <dt className="text-[13px] font-semibold tracking-[0.08em] text-fg-faint uppercase">
        {label}
      </dt>
      <dd className="text-[15px] font-semibold text-fg text-right">{value}</dd>
    </div>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const e = exercise(slug)!;
  const muscle = e.target || e.primaryMuscles[0] || e.category;
  const categorySlug = slugify(e.category);
  const related = EXERCISES.filter(
    (x) => x.category === e.category && x.slug !== e.slug,
  ).slice(0, 6);

  // Two forms of the same two URLs, and the difference matters.
  //
  // The element attributes must be **relative**: an absolute `SITE_URL` here
  // pointed the player at production from every other origin, so the video was
  // a dead black box on localhost, on preview deployments and on www — which
  // is exactly how it shipped.
  //
  // Schema must be **absolute**: a crawler resolves `contentUrl` on its own and
  // a relative path there is simply dropped.
  const clip = `/api/exercise-clip/${e.slug}`;
  const poster = `/api/exercise-poster/${e.slug}`;
  const clipAbs = `${SITE_URL}${clip}`;
  const posterAbs = `${SITE_URL}${poster}`;

  return (
    <>
      {/* VideoObject names the stable proxy URL rather than a presigned one:
          the bucket's signatures expire within the hour, and a crawler that
          revisits a dead contentUrl drops the video result entirely. */}
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: `${e.name} — demonstration`,
          description: `A demonstration of the ${e.name.toLowerCase()}, a ${e.category.toLowerCase()} movement targeting the ${muscle.toLowerCase()}.`,
          contentUrl: clipAbs,
          embedUrl: clipAbs,
          thumbnailUrl: [posterAbs],
          uploadDate: "2026-09-18",
          isFamilyFriendly: true,
          publisher: {
            "@type": "Organization",
            name: "Rexatech",
            logo: { "@type": "ImageObject", url: `${SITE_URL}/dietly-icon.png` },
          },
        }}
      />
      {e.instructions.length >= 2 && (
        <JsonLdScript
          data={{
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: `How to do the ${e.name.toLowerCase()}`,
            totalTime: `PT${Math.max(1, Math.round((e.defaultSets * 45 + e.defaultSets * e.defaultRestSec) / 60))}M`,
            tool: e.equipmentNames.map((k) => ({ "@type": "HowToTool", name: k })),
            step: e.instructions.map((text, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              text,
            })),
          }}
        />
      )}
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Exercises", item: `${SITE_URL}/exercises` },
            {
              "@type": "ListItem",
              position: 3,
              name: `${e.category} exercises`,
              item: `${SITE_URL}/exercises/muscle/${categorySlug}`,
            },
            { "@type": "ListItem", position: 4, name: e.name, item: `${SITE_URL}/exercises/${e.slug}` },
          ],
        }}
      />
      <Navbar />
      <main className="pt-32 pb-24">
        <article className="max-w-[820px] mx-auto px-6 md:px-12">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-7 text-[13px] text-fg-faint">
              <Link href="/" className="hover:text-fg transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/exercises" className="hover:text-fg transition-colors">Exercises</Link>
              <span className="mx-2">/</span>
              <Link href={`/exercises/muscle/${categorySlug}`} className="hover:text-fg transition-colors">
                {e.category}
              </Link>
            </nav>

            <h1 className="text-[clamp(30px,5vw,46px)] font-bold leading-[1.06] tracking-[-1.5px] text-fg font-body mb-5">
              {e.name}
            </h1>
            <p className="text-[17px] md:text-[19px] leading-relaxed text-fg-muted">
              {e.overview ||
                `A ${DIFFICULTY_LABEL[e.difficulty]?.toLowerCase() ?? e.difficulty} ${e.category.toLowerCase()} movement targeting the ${muscle.toLowerCase()}${e.equipmentNames.length ? `, using ${e.equipmentNames.join(" and ").toLowerCase()}` : ""}.`}
            </p>

            {/* A looping demo, not a video player.
                
                `autoPlay` only works alongside `muted` and `playsInline` — every
                browser blocks sound-on autoplay, and without `playsInline` iOS
                takes the clip fullscreen the moment it starts. There are no
                controls because there is nothing to control: it is a six-second
                loop of one movement, and a scrub bar over it just invites
                somebody to look for a download button.
                
                `pointer-events-none` is the cheap half of that — with no
                controls the element is inert anyway, and it takes the
                right-click "Save video as…" menu away at no cost to anyone
                using the page. It is a speed bump, not a lock; the watermark is
                what actually travels with a copy.
                
                The poster still matters: autoplay is a request, not a promise.
                Data Saver, a reduced-motion preference and low battery all
                refuse it, and those visitors see the still rather than a black
                rectangle. */}
            <div className="mt-8 mx-auto max-w-[420px] overflow-hidden rounded-2xl border border-border bg-bg-elevated">
              <video
                className="w-full pointer-events-none"
                autoPlay
                loop
                muted
                preload="metadata"
                playsInline
                disablePictureInPicture
                controlsList="nodownload noplaybackrate"
                poster={poster}
                src={clip}
                aria-label={`${e.name} demonstration, looping`}
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <dl className="mt-10">
              <Row label="Targets" value={muscle} />
              {e.secondaryMuscles.length > 0 && (
                <Row label="Also works" value={e.secondaryMuscles.slice(0, 4).join(", ")} />
              )}
              <Row label="Equipment" value={e.equipmentNames.join(", ") || "None"} />
              <Row label="Level" value={DIFFICULTY_LABEL[e.difficulty] ?? e.difficulty} />
              <Row
                label="Start with"
                value={`${e.defaultSets} × ${e.defaultReps}, ${e.defaultRestSec}s rest`}
              />
            </dl>

            {e.instructions.length > 0 && (
              <section className="mt-12">
                <h2 className="text-[24px] font-bold text-fg font-body tracking-tight mb-5">
                  How to do it
                </h2>
                <ol className="space-y-3 list-decimal pl-5 text-[16px] leading-[1.75] text-fg-muted">
                  {e.instructions.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </section>
            )}

            {e.cues.length > 0 && (
              <section className="mt-10">
                <h2 className="text-[24px] font-bold text-fg font-body tracking-tight mb-5">
                  Form cues
                </h2>
                <ul className="space-y-2.5 text-[16px] leading-[1.75] text-fg-muted list-disc pl-5">
                  {e.cues.map((c) => <li key={c}>{c}</li>)}
                </ul>
              </section>
            )}

            <div className="glass-card mt-12 rounded-2xl border-l-4 !border-l-accent bg-bg-elevated/30 p-7">
              <h2 className="text-[18px] font-bold text-fg mb-3">
                Where this fits in a week
              </h2>
              <p className="text-[15px] leading-relaxed text-fg-muted">
                {SITE_NAME} scores one photo a week out of 100, names the area
                holding the score back, and builds the week around it — so a
                movement like this gets programmed when your {muscle.toLowerCase()} is
                what needs the work, not because it was next on a list.
              </p>
              <Link href="/#get" className="btn btn-primary btn-sm mt-5">
                Get the app
              </Link>
            </div>

            {related.length > 0 && (
              <section className="mt-14">
                <h2 className="text-[20px] font-bold text-fg font-body tracking-tight">
                  More {e.category.toLowerCase()} movements
                </h2>
                <ExerciseGrid items={related} />
              </section>
            )}

            <p className="mt-12 text-[12px] leading-relaxed text-fg-faint border border-border rounded-xl p-5">
              {e.attribution && <>Demonstration courtesy of {e.attribution}. </>}
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
