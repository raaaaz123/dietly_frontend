import StoreButtons from "./StoreButtons";

/**
 * The install ask for content pages (calculators, guides, exercises, workouts).
 *
 * These pages used to end in a "Get the app" button pointing at `/#get`, or
 * had no ask at all. That made a search visitor travel to the homepage and
 * scroll to its footer before a store was one tap away. The store badges sit
 * here directly, so the page a visitor landed on is the page they install from.
 *
 * `placement` lands on the `store_click` event (see lib/analytics.tsx), which
 * is how we tell which page type and which spot actually sends installs.
 */
export default function InstallCard({
  title,
  body,
  placement,
  className = "",
}: {
  title: string;
  body: string;
  placement: string;
  className?: string;
}) {
  return (
    <div
      data-placement={placement}
      className={`rounded-2xl border border-border bg-elevated p-6 md:p-7 text-left ${className}`}
    >
      <h2 className="text-[18px] md:text-[20px] font-bold text-fg mb-2">{title}</h2>
      <p className="text-[15px] leading-relaxed text-fg-muted">{body}</p>
      <StoreButtons className="mt-5" height={40} />
      <p className="mt-3 text-[12px] font-semibold text-fg-faint">
        iPhone and Android
      </p>
    </div>
  );
}
