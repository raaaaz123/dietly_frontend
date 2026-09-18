import Link from "next/link";
import { DIFFICULTY_LABEL, type Exercise } from "../../lib/exercises";

/** One movement, as a card. Kept deliberately small: the list is the page. */
export default function ExerciseGrid({ items }: { items: readonly Exercise[] }) {
  return (
    <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((e) => (
        <li key={e.slug}>
          <Link href={`/exercises/${e.slug}`} className="card card-hover block overflow-hidden group h-full">
            {/* A plain <img>, not next/image: the source is a redirect to a
                signed URL that changes every hour, so there is nothing stable
                for the optimiser to cache or for a srcset to point at. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/api/exercise-poster/${e.slug}`}
              alt=""
              loading="lazy"
              decoding="async"
              width={368}
              height={207}
              className="aspect-video w-full bg-bg object-contain"
            />
            <span className="block p-5 pt-4">
            <span className="block text-[15px] font-bold text-fg group-hover:text-accent transition-colors">
              {e.name}
            </span>
            <span className="mt-1.5 block text-[13px] leading-relaxed text-fg-muted">
              {e.target || e.primaryMuscles[0] || e.category}
            </span>
            <span className="mt-3 flex flex-wrap gap-1.5 text-[11px] text-fg-faint">
              <span className="rounded-full border border-border px-2 py-0.5">
                {DIFFICULTY_LABEL[e.difficulty] ?? e.difficulty}
              </span>
              {e.equipmentNames.slice(0, 2).map((k) => (
                <span key={k} className="rounded-full border border-border px-2 py-0.5">
                  {k}
                </span>
              ))}
            </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
