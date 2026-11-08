import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import StoreButtons from "./StoreButtons";
import Footer from "./Footer";
import { LANDINGS, LANDING_ALTERNATES } from "../lib/landing";

/** Metadata for one localized landing page (/es, /de ...). */
export function landingMetadata(lang: string): Metadata {
  const l = LANDINGS.find((x) => x.slug === lang);
  if (!l) return {};
  return {
    title: { absolute: l.copy.metaTitle },
    description: l.copy.metaDescription,
    alternates: { canonical: `/${l.slug}`, languages: LANDING_ALTERNATES },
    openGraph: { title: l.copy.metaTitle, description: l.copy.metaDescription, url: `/${l.slug}`, locale: l.hreflang },
  };
}

/**
 * One landing page per language the app ships in. Each lives in its own static
 * folder (app/es, app/de ...) rather than a root [lang] segment, which would
 * match every one-word path and break the internal-link lint across the site.
 */
export default function LocalizedLanding({ lang }: { lang: string }) {
  const l = LANDINGS.find((x) => x.slug === lang);
  if (!l) notFound();
  const c = l.copy;
  const features = [
    { t: c.f1t, b: c.f1b, img: "/images/app/session.webp" },
    { t: c.f2t, b: c.f2b, img: "/images/app/muscle-map.webp" },
    { t: c.f3t, b: c.f3b, img: null },
    { t: c.f4t, b: c.f4b, img: "/images/app/training.webp" },
  ];

  return (
    <div lang={l.hreflang}>
      <main>
        <section className="section">
          <div className="wrap text-center">
            <p className="eyebrow">{c.eyebrow}</p>
            <h1 className="h1 mx-auto mt-4 max-w-3xl">{c.h1}</h1>
            <p className="lead mx-auto mt-5 max-w-2xl">{c.sub}</p>
            <div className="mt-8 flex justify-center" data-placement={`landing_${l.slug}_hero`}>
              <StoreButtons fullWidthMobile={false} />
            </div>
          </div>
        </section>

        <section className="section pt-0">
          <div className="wrap grid gap-6 md:grid-cols-2">
            {features.map((f) => (
              <div key={f.t} className="flex flex-col gap-4 rounded-[24px] border border-border bg-elevated p-6 md:p-8">
                <h2 className="h3">{f.t}</h2>
                <p className="lead">{f.b}</p>
                {f.img && (
                  <Image
                    src={f.img}
                    alt={f.t}
                    width={760}
                    height={1542}
                    className="mx-auto h-auto w-full max-w-[240px] rounded-[20px]"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="section pt-0">
          <div className="wrap">
            <div className="rounded-[24px] border border-border bg-elevated px-6 py-10 text-center md:px-14 md:py-14">
              <h2 className="h2 mx-auto max-w-2xl">{c.ctaTitle}</h2>
              <p className="lead mx-auto mt-4 max-w-xl">{c.ctaBody}</p>
              <div className="mt-7 flex justify-center" data-placement={`landing_${l.slug}_cta`}>
                <StoreButtons fullWidthMobile={false} />
              </div>
              <p className="mt-6">
                <Link href="/" hrefLang="en" className="font-semibold underline underline-offset-4">
                  {c.english}
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
