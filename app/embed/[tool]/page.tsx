import type { Metadata } from "next";
import type { ComponentType } from "react";
import { SITE_URL } from "../../lib/site";
import { tool } from "../../lib/tools";
import ArmyBodyFatCalculator from "../../army-body-fat-calculator/ArmyBodyFatCalculator";
import BmiCalculator from "../../bmi-calculator/BmiCalculator";
import BmrCalculator from "../../bmr-calculator/BmrCalculator";
import BodyFatCalculator from "../../body-fat-calculator/BodyFatCalculator";
import DeficitCalculator from "../../calorie-deficit-calculator/DeficitCalculator";
import CaloriesBurnedCalculator from "../../calories-burned-calculator/CaloriesBurnedCalculator";
import CreatineCalculator from "../../creatine-calculator/CreatineCalculator";
import FfmiCalculator from "../../ffmi-calculator/FfmiCalculator";
import IdealWeightCalculator from "../../ideal-weight-calculator/IdealWeightCalculator";
import LbmCalculator from "../../lean-body-mass-calculator/LbmCalculator";
import MacroCalculator from "../../macro-calculator/MacroCalculator";
import OneRepMaxCalculator from "../../one-rep-max-calculator/OneRepMaxCalculator";
import PlateCalculator from "../../plate-calculator/PlateCalculator";
import ProteinCalculator from "../../protein-calculator/ProteinCalculator";
import TdeeCalculator from "../../tdee-calculator/TdeeCalculator";
import WaistToHeightCalculator from "../../waist-to-height-ratio-calculator/WaistToHeightCalculator";
import WaterIntakeCalculator from "../../water-intake-calculator/WaterIntakeCalculator";
import WeightLossCalculator from "../../weight-loss-calculator/WeightLossCalculator";

/**
 * Embeddable calculators: /embed/<tool-slug>, loaded in an iframe on other
 * sites.
 *
 * This is the site's link-earning asset. The snippet people copy (see
 * EmbedCode) carries a plain-HTML credit link that sits on the host page,
 * outside the iframe. That link is the backlink; links inside an iframe count
 * for nothing. The page itself is noindex so it never competes with the real
 * tool page, and next.config.ts lifts X-Frame-Options for /embed only.
 */
const EMBEDS: Record<string, ComponentType> = {
  "army-body-fat-calculator": ArmyBodyFatCalculator,
  "bmi-calculator": BmiCalculator,
  "bmr-calculator": BmrCalculator,
  "body-fat-calculator": BodyFatCalculator,
  "calorie-deficit-calculator": DeficitCalculator,
  "calories-burned-calculator": CaloriesBurnedCalculator,
  "creatine-calculator": CreatineCalculator,
  "ffmi-calculator": FfmiCalculator,
  "ideal-weight-calculator": IdealWeightCalculator,
  "lean-body-mass-calculator": LbmCalculator,
  "macro-calculator": MacroCalculator,
  "one-rep-max-calculator": OneRepMaxCalculator,
  "plate-calculator": PlateCalculator,
  "protein-calculator": ProteinCalculator,
  "tdee-calculator": TdeeCalculator,
  "waist-to-height-ratio-calculator": WaistToHeightCalculator,
  "water-intake-calculator": WaterIntakeCalculator,
  "weight-loss-calculator": WeightLossCalculator,
};

const EMBED_SLUGS = Object.keys(EMBEDS);

export function generateStaticParams() {
  return EMBED_SLUGS.map((t) => ({ tool: t }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const { tool: slug } = await params;
  return {
    title: { absolute: `${tool(slug)?.name ?? "Calculator"} | Dietly Fit` },
    robots: { index: false, follow: true },
    alternates: { canonical: `/${slug}` },
  };
}

export default async function Embed({ params }: { params: Promise<{ tool: string }> }) {
  const { tool: slug } = await params;
  const Calc = EMBEDS[slug];
  const t = tool(slug);
  return (
    <main className="py-2">
      <Calc />
      <p className="text-center text-[12px] text-fg-faint -mt-10 pb-4">
        <a href={`${SITE_URL}/${slug}`} target="_blank" rel="noopener" className="underline hover:text-fg">
          {t?.name ?? "Calculator"} by Dietly Fit
        </a>
      </p>
    </main>
  );
}
