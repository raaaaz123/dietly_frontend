"use client";

import { useState } from "react";
import Reveal from "../components/Reveal";
import {
  CalculatorFrame,
  Field,
  NumberInput,
  ResultPanel,
  Segmented,
  Stat,
  SubmitButton,
  ToolCta,
} from "../components/tools/fields";
import { cmToIn, feetInchesToCm, inToCm, waistToHeight, whtrBand } from "../lib/formulas";

type Units = "metric" | "imperial";

export default function WaistToHeightCalculator() {
  const [units, setUnits] = useState<Units>("metric");
  const [cm, setCm] = useState<number | "">("");
  const [ft, setFt] = useState<number | "">("");
  const [inch, setInch] = useState<number | "">("");
  const [waist, setWaist] = useState<number | "">("");

  const [out, setOut] = useState<{
    ratio: number;
    label: string;
    targetWaist: number;
    metric: boolean;
  } | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const heightCm =
      units === "metric" ? Number(cm) : feetInchesToCm(Number(ft), Number(inch || 0));
    const waistCm = units === "metric" ? Number(waist) : inToCm(Number(waist));
    if (!heightCm || !waistCm) return;

    setOut({
      ratio: waistToHeight(waistCm, heightCm),
      label: whtrBand(waistToHeight(waistCm, heightCm)),
      // The actionable half: what waist would put you under 0.5.
      targetWaist: heightCm * 0.5,
      metric: units === "metric",
    });
  };

  const len = (valueCm: number, metric: boolean) =>
    metric ? valueCm.toFixed(0) : cmToIn(valueCm).toFixed(1);

  return (
    <CalculatorFrame
      onSubmit={submit}
      formTitle="Two measurements"
      form={
        <>
          <Field label="Units">
            <Segmented
              options={[
                { value: "metric" as Units, label: "Metric" },
                { value: "imperial" as Units, label: "Imperial" },
              ]}
              value={units}
              onChange={setUnits}
            />
          </Field>

          <Field label="Height">
            {units === "metric" ? (
              <NumberInput value={cm} onChange={setCm} min={120} max={250} placeholder="178" suffix="cm" />
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <NumberInput value={ft} onChange={setFt} min={3} max={8} placeholder="5" suffix="ft" />
                <NumberInput value={inch} onChange={setInch} min={0} max={11} required={false} placeholder="10" suffix="in" />
              </div>
            )}
          </Field>

          <Field
            label="Waist"
            hint="Measure at the midpoint between your lowest rib and the top of your hip bone, at the end of a normal breath out. Not at your trouser waistband."
          >
            <NumberInput
              value={waist}
              onChange={setWaist}
              min={units === "metric" ? 40 : 16}
              max={units === "metric" ? 200 : 79}
              placeholder={units === "metric" ? "84" : "33"}
              suffix={units === "metric" ? "cm" : "in"}
            />
          </Field>

          <SubmitButton>CALCULATE</SubmitButton>
        </>
      }
      results={
        <ResultPanel empty="Enter your height and waist to see the ratio — and the waist that would put you under 0.5.">
          {out && (
            <Reveal delay={0} className="flex flex-col h-full">
              <span className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-2">
                Waist-to-height ratio
              </span>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-[56px] font-bold font-body leading-none text-fg tracking-tight tabular-nums">
                  {out.ratio.toFixed(2)}
                </span>
              </div>

              <div className="mb-auto">
                <Stat label="Band" value={out.label} tone="accent" />
                <Stat label="Healthy threshold" value="Under 0.50" />
                <Stat
                  label="Waist at 0.50 for your height"
                  value={len(out.targetWaist, out.metric)}
                  unit={out.metric ? "cm" : "in"}
                />
              </div>

              <p className="mt-5 text-[13px] leading-relaxed text-fg-muted border border-border bg-bg-elevated/40 rounded-xl p-4">
                The rule is easy to carry around:{" "}
                <strong className="text-fg">
                  keep your waist under half your height
                </strong>
                . Unlike BMI, this one notices where the weight sits — and
                abdominal fat is the deposit most consistently linked to
                metabolic risk.
              </p>

              <ToolCta>
                A tape measure catches the waist. Dietly Fit scores the whole
                picture — one photo a week, out of 100, with the weak point
                named and a week of training built around it.
              </ToolCta>
            </Reveal>
          )}
        </ResultPanel>
      }
    />
  );
}
