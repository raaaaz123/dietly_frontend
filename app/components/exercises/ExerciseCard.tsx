import Link from "next/link";

/**
 * One movement as a card. Shared by the server-rendered grids (hubs) and the
 * client-side search on /exercises, so it must not import lib/exercises (that
 * module carries the whole 1 MB catalogue and would land in the browser).
 */
export type CardData = {
  slug: string;
  name: string;
  target: string;
  difficulty: string;
  kit: string;
  equipment?: string[];
};

const DIFF: Record<string, { label: string; dot: string }> = {
  beginner: { label: "Beginner", dot: "#C8F560" },
  intermediate: { label: "Intermediate", dot: "#FFB86B" },
  advanced: { label: "Advanced", dot: "#FF7A7A" },
};

export const KIT_LABEL: Record<string, string> = { none: "Bodyweight", basic: "Minimal kit", full: "Gym" };

export default function ExerciseCard({ e, eager = false }: { e: CardData; eager?: boolean }) {
  const d = DIFF[e.difficulty] ?? DIFF.intermediate;
  return (
    <li
      data-ex=""
      data-name={`${e.name} ${e.target}`.toLowerCase()}
      data-diff={e.difficulty}
      data-kit={e.kit}
    >
      <Link
        href={`/exercises/${e.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated transition-colors hover:border-[rgba(200,245,96,0.45)]"
      >
        {/* Plain <img>: the source is a redirect to a signed URL that changes
            every hour, so there is nothing stable for next/image to cache. The
            demos are drawn on white, so the frame is white too. */}
        <span className="block bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/api/exercise-poster/${e.slug}`}
            alt={`${e.name} demonstration`}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
            decoding="async"
            width={320}
            height={240}
            className="aspect-[4/3] w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </span>
        <span className="flex flex-1 flex-col p-3 sm:p-4">
          <span className="text-[14px] sm:text-[15px] font-bold leading-snug text-fg">{e.name}</span>
          {e.target ? (
            <span className="mt-1 text-[12px] sm:text-[13px] leading-snug text-fg-muted line-clamp-1">{e.target}</span>
          ) : null}
          <span className="mt-auto pt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-fg-faint">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: d.dot }} />
              {d.label}
            </span>
            <span>{KIT_LABEL[e.kit] ?? e.equipment?.[0] ?? ""}</span>
          </span>
        </span>
      </Link>
    </li>
  );
}

export const GRID_CLASS = "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4";
