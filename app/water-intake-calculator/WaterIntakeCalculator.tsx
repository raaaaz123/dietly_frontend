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
import { lbToKg, waterIntake, type Sex } from "../lib/formulas";

type Units = "metric" | "imperial";
const ML_PER_FLOZ = 29.5735;

export default function WaterIntakeCalculator() {
  const [units, setUnits] = useState<Units>("metric");
  const [sex, setSex] = useState<Sex>("male");
  const [weight, setWeight] = useState<number | "">("");
  const [minutes, setMinutes] = useState<number | "">("");
  const [hot, setHot] = useState<"no" | "yes">("no");
  const [out, setOut] = useState<(ReturnType<typeof waterIntake> & { metric: boolean }) | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight) return;
    const kg = units === "metric" ? Number(weight) : lbToKg(Number(weight));
    setOut({
      ...waterIntake({ weightKg: kg, sex, exerciseMin: Number(minutes || 0), hot: hot === "yes" }),
      metric: units === "metric",
    });
  };

  const vol = (ml: number, metric: boolean) =>
    metric ? `${(ml / 1000).toFixed(1)} L` : `${Math.round(ml / ML_PER_FLOZ)} fl oz`;

  return (
    <CalculatorFrame
      onSubmit={submit}
      formTitle="Your day"
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
          <Field label="Weight">
            <NumberInput
              value={weight}
              onChange={setWeight}
              min={units === "metric" ? 30 : 66}
              max={units === "metric" ? 250 : 550}
              placeholder={units === "metric" ? "75" : "165"}
              suffix={units === "metric" ? "kg" : "lb"}
            />
          </Field>
          <Field label="Exercise today" hint="Sweaty minutes: lifting, running, sport.">
            <NumberInput value={minutes} onChange={setMinutes} min={0} max={600} required={false} placeholder="60" suffix="min" />
          </Field>
          <Field label="Hot weather or hot gym?">
            <Segmented
              options={[
                { value: "no" as const, label: "No" },
                { value: "yes" as const, label: "Yes" },
              ]}
              value={hot}
              onChange={setHot}
            />
          </Field>
          <SubmitButton>CALCULATE</SubmitButton>
        </>
      }
      results={
        <ResultPanel empty="Enter your weight and training to see how much water to drink today.">
          {out && (
            <Reveal delay={0} className="flex flex-col h-full">
              <span className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-2">
                Drink about
              </span>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-[56px] font-bold font-body leading-none text-fg tracking-tight tabular-nums">
                  {vol(out.total, out.metric)}
                </span>
              </div>
              <p className="text-[15px] text-fg-muted mb-6">
                a day, or about {Math.round(out.total / 250)} glasses of 250 ml
              </p>
              <div className="mb-auto">
                <Stat label="Baseline for your weight" value={vol(out.base, out.metric)} />
                <Stat label="Extra for training" value={vol(out.exercise, out.metric)} />
                <Stat label="Extra for heat" value={vol(out.heat, out.metric)} />
                <Stat label="EFSA reference (drinks only)" value={vol(out.efsaDrinks, out.metric)} tone="accent" />
              </div>
              <ToolCta>
                Water is the easy part. Dietly Fit plans the training and tracks
                the result: log every lift and score one photo a week out of 100.
              </ToolCta>
            </Reveal>
          )}
        </ResultPanel>
      }
    />
  );
}
