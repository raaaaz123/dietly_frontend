import { hubOgImage, size, contentType } from "../../../components/hubOg";
import { CATEGORIES, category } from "../../../lib/exercises";

export { size, contentType };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const c = category(slug)!;
  return hubOgImage({
    kicker: "Exercises",
    heading: `${c.name} exercises`,
    footnote: `${c.items.length} movements with demos · dietly.life`,
  });
}
