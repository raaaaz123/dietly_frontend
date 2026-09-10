import Image from "next/image";

/**
 * The half of the product the old page never mentioned: strength.
 *
 * The pivot put a score on the body; the work since put a rank on every muscle
 * in it — twenty-one of them, against fixed standards rather than against other
 * users, so a rank earned is a rank kept. That is the one claim on this page a
 * competitor cannot copy by adding a leaderboard, and it needs the figure
 * beside it: "which muscles are behind" is a question about a body, and it is
 * answered here with the same body map the app draws.
 *
 * The image is a capture of that map, lit with a real week's work.
 */

const rows = [
  {
    k: "21 muscles ranked",
    v: "Chest, back, quads, glutes, arms — each one against absolute strength standards, not a percentile against strangers.",
  },
  {
    k: "The map says where the work went",
    v: "Sets per area over the last month, so a muscle nobody has trained since July stops hiding behind a good bench.",
  },
  {
    k: "Every session mapped",
    v: "Before you start it, the session shows which muscles it loads and by how much.",
  },
];

export default function Ranks() {
  return (
    <section id="ranks" className="section pt-0">
      <div className="wrap">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="eyebrow">Strength, not just shape</p>
            <h2 className="h2 mt-5">
              Every muscle gets a rank —
              <br />
              so you can see which ones are behind.
            </h2>

            <dl className="mt-9 grid gap-6">
              {rows.map((row) => (
                <div key={row.k}>
                  <dt className="text-[16px] font-bold text-fg">{row.k}</dt>
                  <dd className="mt-1.5 text-[15px] leading-relaxed text-fg-muted">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="order-1 lg:order-2">
            <div className="card overflow-hidden p-4 sm:p-6">
              <Image
                src="/images/app/muscle-map.png"
                alt="Front and back body maps with the trained muscles lit in lime — chest, lats, quads and glutes brightest."
                width={1000}
                height={1000}
                sizes="(max-width: 1024px) 92vw, 520px"
                className="h-auto w-full"
              />
              <p className="mt-3 text-center text-[13px] font-semibold text-fg-faint">
                A week of pushing, drawn on the body that did it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
