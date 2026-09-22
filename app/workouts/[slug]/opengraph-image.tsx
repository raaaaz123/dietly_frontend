import { ogCard, size, contentType } from "../../components/tools/og";
import { WORKOUTS, workout } from "../../lib/workouts";

export { size, contentType };
export const alt = "Workout plan — Dietly Fit";
export const dynamicParams = false;

export function generateStaticParams() {
  return WORKOUTS.map((w) => ({ slug: w.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = workout(slug);
  return ogCard({
    eyebrow: "Free plan",
    heading: w.name,
    sub: w.blurb,
    path: `workouts/${w.slug}`,
  });
}
