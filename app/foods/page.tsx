import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { PUBLISHABLE, PUBLISHED_FOODS, FOODS_FETCHED } from "../lib/foods";

/**
 * The nutrition hub.
 *
 * `notFound()` while the cluster is gated, rather than rendering an empty
 * page: a hub listing nothing is a worse result for a visitor than a 404, and
 * it would be an indexable page with no content on a site that has spent a lot
 * of effort not publishing those. See the header of `lib/foods.ts`.
 */
export const dynamic = "error";

export const metadata: Metadata = {
  title: { absolute: "Protein & Calories in Common Foods | Dietly Fit" },
  description:
    "Protein, calories and full macros for common foods — per 100 g and per real portion, every figure sourced from USDA FoodData Central and linked to the row it came from.",
  keywords: ["protein in food", "calories in food", "food nutrition lookup", "macros per 100g"],
  alternates: { canonical: "/foods" },
};

export default function Page() {
  if (!PUBLISHABLE) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <Reveal>
            <h1 className="text-[clamp(32px,6vw,52px)] font-bold leading-[1.04] tracking-[-2px] text-fg font-body mb-5">
              Protein &amp; calories in common foods
            </h1>
            <p className="text-[17px] md:text-[19px] text-fg-muted max-w-[620px] leading-relaxed">
              Per 100 g and per the portion you actually eat. Every figure comes
              from USDA FoodData Central and links to the entry it was read
              from, so you can check it rather than trust us.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
              {PUBLISHED_FOODS.map((f) => (
                <Link key={f.slug} href={`/foods/${f.slug}`} className="card card-hover p-5 block">
                  <span className="text-[16px] font-bold text-fg block mb-1.5">{f.name}</span>
                  <span className="text-[13px] text-fg-muted">
                    {f.per100g.protein} g protein · {f.per100g.kcal} kcal
                    <span className="text-fg-faint"> / 100 g</span>
                  </span>
                </Link>
              ))}
            </div>
            <p className="mt-8 text-[12px] text-fg-faint">
              Retrieved from USDA FoodData Central on{" "}
              <time dateTime={FOODS_FETCHED}>{FOODS_FETCHED}</time>.
            </p>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
