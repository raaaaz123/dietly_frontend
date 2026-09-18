import { compareOgImage, size, contentType } from "../../components/vs/og";
import { COMPETITORS, competitor } from "../../lib/competitors";

export { size, contentType };

export function generateStaticParams() {
  return COMPETITORS.map((c) => ({ slug: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  competitor(slug); // throws on an unknown slug rather than rendering a blank card
  return compareOgImage(slug);
}
