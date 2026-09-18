import { hubOgImage, size, contentType } from "../../../components/hubOg";
import { KIT, kit } from "../../../lib/exercises";

export { size, contentType };

export function generateStaticParams() {
  return KIT.map((k) => ({ kit: k.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ kit: string }>;
}) {
  const { kit: slug } = await params;
  const k = kit(slug)!;
  return hubOgImage({
    kicker: "Exercises",
    heading: `${k.name} exercises`,
    footnote: `${k.items.length} movements with demos · dietly.life`,
  });
}
