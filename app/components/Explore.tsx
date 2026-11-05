import Link from "next/link";
import { TOOLS } from "../lib/tools";
import { GUIDES } from "../lib/guides";
import { WORKOUTS } from "../lib/workouts";
import { COMPETITORS } from "../lib/competitors";
import { CATEGORIES } from "../lib/exercises";

/**
 * The homepage's links into the rest of the site.
 *
 * Search Console (2026-11-05): 15 pages indexed, 66 "Discovered, currently not
 * indexed". The homepage earns about 85% of all impressions and is the page
 * Google recrawls most, yet it linked to almost nothing beyond the footer's
 * short list. Google decides what is worth crawling largely by internal links
 * from pages it already trusts, so this section exists to hand that trust on
 * to every calculator, guide, plan and muscle hub.
 *
 * Plain text links in columns, after the sales story and before the final ask,
 * so it does not compete with the install buttons.
 */
function Column({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="text-[11px] font-bold tracking-[0.14em] text-fg-faint uppercase">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[13px] sm:text-[14px] font-medium text-fg-muted transition-colors hover:text-accent-deep">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Explore() {
  return (
    <section id="explore" className="section pt-0" aria-labelledby="explore-title">
      <div className="wrap">
        <h2 id="explore-title" className="h2 max-w-2xl">
          Free tools, plans and guides
        </h2>
        <p className="lead mt-4 max-w-xl">
          No signup. Calculators, workout plans and an exercise library with a demo for every movement.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          <Column
            title="Calculators"
            links={[
              ...TOOLS.map((t) => ({ href: `/${t.slug}`, label: t.name })),
              { href: "/tools", label: "All calculators" },
            ]}
          />
          <Column
            title="Exercises by muscle"
            links={[
              ...CATEGORIES.slice(0, 12).map((c) => ({ href: `/exercises/muscle/${c.slug}`, label: `${c.name} exercises` })),
              { href: "/exercises", label: "Exercise library" },
            ]}
          />
          <Column
            title="Workout plans"
            links={[
              ...WORKOUTS.map((w) => ({ href: `/workouts/${w.slug}`, label: w.name })),
              { href: "/workouts", label: "All workout plans" },
            ]}
          />
          <Column
            title="Guides and comparisons"
            links={[
              { href: "/ai-body-scan", label: "AI body scan" },
              ...GUIDES.map((g) => ({ href: `/guides/${g.slug}`, label: g.heading })),
              { href: "/best-ai-body-scan-apps", label: "Best AI body scan apps" },
              { href: "/best-workout-apps", label: "Best workout apps" },
              ...COMPETITORS.map((c) => ({ href: `/vs/${c.slug}`, label: `Dietly Fit vs ${c.name}` })),
            ]}
          />
        </div>
      </div>
    </section>
  );
}
