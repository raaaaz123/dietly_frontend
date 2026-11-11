import type { Exercise } from "../../lib/exercises";
import ExerciseCard, { GRID_CLASS } from "./ExerciseCard";

/** A server-rendered grid of movements. Two columns on phones, four on desktop. */
export default function ExerciseGrid({ items, eagerFirst = 0 }: { items: readonly Exercise[]; eagerFirst?: number }) {
  return (
    <ul className={`mt-6 ${GRID_CLASS}`}>
      {items.map((e, i) => (
        <ExerciseCard
          key={e.slug}
          eager={i < eagerFirst}
          e={{
            slug: e.slug,
            name: e.name,
            target: e.target || e.primaryMuscles[0] || e.category,
            difficulty: e.difficulty,
            kit: e.equipment,
            equipment: e.equipmentNames,
          }}
        />
      ))}
    </ul>
  );
}
