import { Metadata } from "next";
import ComparePage from "../../components/vs/ComparePage";
import { COMPETITORS, competitorMetadata } from "../../lib/competitors";

/**
 * One route for every comparison, built from `lib/competitors`.
 *
 * The tool and guide clusters each get a hand-written page per slug, because
 * their bodies are genuinely different documents. These are not: the argument
 * has the same five moves every time, and the part that differs — every
 * sentence of it — lives in the registry where the checked date and the source
 * links sit beside it. Splitting that across five near-identical page files
 * would only create five places for the verification discipline to lapse.
 */

export function generateStaticParams() {
  return COMPETITORS.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return competitorMetadata(slug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ComparePage slug={slug} />;
}
