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
import {
  feetInchesToCm,
  healthyWeightRange,
  idealWeight,
  kgToLb,
  type Sex,
} from "../lib/formulas";

type Units = "metric" | "imperial";

export default function IdealWeightCalculator() {
  const [units, setUnits] = useState<Units>("metric");
  const [sex, setSex] = useState<Sex>("male");
  const [cm, setCm] = useState<number | "">("");
  const [ft, setFt] = useState<number | "">("");
  const [inch, setInch] = useState<number | "">("");

  const [out, setOut] = useState<{
    formulas: ReturnType<typeof idealWeight>;
    range: { min: number; max: number };
    spread: number;
    metric: boolean;
  } | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const heightCm =
      units === "metric" ? Number(cm) : feetInchesToCm(Number(ft), Number(inch || 0));
    if (!heightCm) return;

    const formulas = idealWeight(heightCm, sex);
    const values = Object.values(formulas);
    setOut({
      formulas,
      range: healthyWeightRange(heightCm),
      // The disagreement between formulas is the point of the page, so it is
      // shown as a number rather than left for the reader to eyeball.
      spread: Math.max(...values) - Math.min(...values),
      metric: units === "metric",
    });
  };

  const w = (v: number, metric: boolean) =>
    metric ? `${v.toFixed(1)}` : `${kgToLb(v).toFixed(1)}`;

  return (
    <CalculatorFrame
      onSubmit={submit}
      formTitle="Your height"
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

          <Field label="Sex">
            <Segmented
              options={[
                { value: "male" as Sex, label: "Male" },
                { value: "female" as Sex, label: "Female" },
              ]}
              value={sex}
              onChange={setSex}
            />
          </Field>

          <Field
            label="Height"
            hint="Height is the only input these formulas take — which is most of what is wrong with them."
          >
            {units === "metric" ? (
              <NumberInput value={cm} onChange={setCm} min={120} max={250} placeholder="178" suffix="cm" />
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <NumberInput value={ft} onChange={setFt} min={3} max={8} placeholder="5" suffix="ft" />
                <NumberInput value={inch} onChange={setInch} min={0} max={11} required={false} placeholder="10" suffix="in" />
              </div>
            )}
          </Field>

          <SubmitButton>CALCULATE</SubmitButton>
        </>
      }
      results={
        <ResultPanel empty="Enter your height to compare the four classic formulas.">
          {out && (
            <Reveal delay={0} className="flex flex-col h-full">
              <span className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-2">
                Healthy range for your height
              </span>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-[44px] font-bold font-body leading-none text-fg tracking-tight tabular-nums">
                  {w(out.range.min, out.metric)}–{w(out.range.max, out.metric)}
                </span>
                <span className="text-[18px] text-fg-muted font-medium mb-1">
                  {out.metric ? "kg" : "lb"}
                </span>
              </div>

              <div className="mb-auto">
                <Stat label="Devine (1974)" value={w(out.formulas.devine, out.metric)} unit={out.metric ? "kg" : "lb"} />
                <Stat label="Robinson (1983)" value={w(out.formulas.robinson, out.metric)} unit={out.metric ? "kg" : "lb"} />
                <Stat label="Miller (1983)" value={w(out.formulas.miller, out.metric)} unit={out.metric ? "kg" : "lb"} />
                <Stat label="Hamwi (1964)" value={w(out.formulas.hamwi, out.metric)} unit={out.metric ? "kg" : "lb"} />
                <Stat
                  label="They disagree by"
                  value={w(out.spread, out.metric)}
                  unit={out.metric ? "kg" : "lb"}
                  tone="accent"
                />
              </div>

              <p className="mt-5 text-[13px] leading-relaxed text-fg-muted border border-border bg-bg-elevated/40 rounded-xl p-4">
                Four formulas, one input, and a {w(out.spread, out.metric)}{" "}
                {out.metric ? "kg" : "lb"} spread between them. None of them
                knows your frame, your muscle, or whether you train — which is
                why the BMI range above is shown as a range and not a target.
              </p>

              <ToolCta>
                A weight worth aiming at depends on what the weight is made of.
                Dietly Fit scores a weekly photo out of 100 and names the weak point,
                so the target is a shape rather than a number on a scale.
              </ToolCta>
            </Reveal>
          )}
        </ResultPanel>
      }
    />
  );
}
