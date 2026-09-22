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
  bmi,
  bmiBand,
  feetInchesToCm,
  healthyWeightRange,
  kgToLb,
  lbToKg,
} from "../lib/formulas";

type Units = "metric" | "imperial";

export default function BmiCalculator() {
  const [units, setUnits] = useState<Units>("metric");
  const [cm, setCm] = useState<number | "">("");
  const [ft, setFt] = useState<number | "">("");
  const [inch, setInch] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");

  const [out, setOut] = useState<{
    value: number;
    band: string;
    range: { min: number; max: number };
    metric: boolean;
  } | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const heightCm =
      units === "metric" ? Number(cm) : feetInchesToCm(Number(ft), Number(inch || 0));
    const weightKg = units === "metric" ? Number(weight) : lbToKg(Number(weight));
    if (!heightCm || !weightKg) return;

    setOut({
      value: bmi(weightKg, heightCm),
      band: bmiBand(bmi(weightKg, heightCm)),
      range: healthyWeightRange(heightCm),
      metric: units === "metric",
    });
  };

  const w = (v: number, metric: boolean) =>
    metric ? v.toFixed(1) : kgToLb(v).toFixed(1);

  return (
    <CalculatorFrame
      onSubmit={submit}
      formTitle="Height and weight"
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
            label="Weight"
            hint="BMI cannot tell where this weight came from. That is the whole limitation."
          >
            <NumberInput
              value={weight}
              onChange={setWeight}
              min={units === "metric" ? 30 : 66}
              max={units === "metric" ? 300 : 660}
              placeholder={units === "metric" ? "75" : "165"}
              suffix={units === "metric" ? "kg" : "lb"}
            />
          </Field>

          <SubmitButton>CALCULATE</SubmitButton>
        </>
      }
      results={
        <ResultPanel empty="Enter your height and weight to see your BMI and its WHO band.">
          {out && (
            <Reveal delay={0} className="flex flex-col h-full">
              <span className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-2">
                Your BMI
              </span>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-[56px] font-bold font-body leading-none text-fg tracking-tight tabular-nums">
                  {out.value.toFixed(1)}
                </span>
                <span className="text-[18px] text-fg-muted font-medium mb-2">
                  {out.band}
                </span>
              </div>

              <div className="mb-auto">
                <Stat label="WHO category" value={out.band} tone="accent" />
                <Stat
                  label="Healthy range for your height"
                  value={`${w(out.range.min, out.metric)}–${w(out.range.max, out.metric)}`}
                  unit={out.metric ? "kg" : "lb"}
                />
                <Stat label="Healthy BMI band" value="18.5–24.9" />
              </div>

              <p className="mt-5 text-[13px] leading-relaxed text-fg-muted border border-border bg-bg-elevated/40 rounded-xl p-4">
                BMI is height and weight and nothing else. It cannot separate
                muscle from fat, which is why a lean, trained person routinely
                reads &ldquo;overweight&rdquo; on it and someone carrying very
                little muscle can read &ldquo;healthy&rdquo; at a body fat
                percentage that is not.
              </p>

              <ToolCta>
                BMI describes your weight. Dietly Fit scores what that weight is
                made of — one photo a week, a Form Score out of 100, and the
                weak point named.
              </ToolCta>
            </Reveal>
          )}
        </ResultPanel>
      }
    />
  );
}
