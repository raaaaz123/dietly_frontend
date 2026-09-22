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
import { PROTEIN_G_PER_KG, lbToKg, kgToLb, type ProteinGoal } from "../lib/formulas";

type Units = "metric" | "imperial";

const GOALS: { value: ProteinGoal; label: string; note: string }[] = [
  { value: "sedentary", label: "Not training", note: "The RDA floor — enough to avoid deficiency, not enough to build." },
  { value: "active", label: "Training", note: "General training, weight steady." },
  { value: "building", label: "Building muscle", note: "In a surplus, training hard." },
  { value: "cutting", label: "Losing fat", note: "The highest target — protein is what decides whether the loss is fat or muscle." },
];

export default function ProteinCalculator() {
  const [units, setUnits] = useState<Units>("metric");
  const [kg, setKg] = useState<number | "">("");
  const [lb, setLb] = useState<number | "">("");
  const [goal, setGoal] = useState<ProteinGoal>("building");

  const [out, setOut] = useState<{ grams: number; perMeal: number; weightKg: number } | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const weightKg = units === "metric" ? Number(kg) : lbToKg(Number(lb));
    if (!weightKg) return;
    const grams = weightKg * PROTEIN_G_PER_KG[goal];
    setOut({
      grams: Math.round(grams),
      // Four feedings is the shape the distribution research supports; it is a
      // more useful number to a reader than the daily total alone.
      perMeal: Math.round(grams / 4),
      weightKg,
    });
  };

  const active = GOALS.find((g) => g.value === goal)!;

  return (
    <CalculatorFrame
      onSubmit={submit}
      formTitle="Your details"
      form={
        <>
          <Field label="Units">
            <Segmented
              options={[
                { value: "metric" as Units, label: "Metric (kg)" },
                { value: "imperial" as Units, label: "Imperial (lb)" },
              ]}
              value={units}
              onChange={setUnits}
            />
          </Field>

          <Field label="Bodyweight">
            {units === "metric" ? (
              <NumberInput value={kg} onChange={setKg} min={30} max={300} placeholder="75" suffix="kg" />
            ) : (
              <NumberInput value={lb} onChange={setLb} min={66} max={660} placeholder="165" suffix="lb" />
            )}
          </Field>

          <Field label="What you're doing" hint={active.note}>
            <Segmented
              options={GOALS.map((g) => ({ value: g.value, label: g.label }))}
              value={goal}
              onChange={setGoal}
              columns={2}
            />
          </Field>

          <SubmitButton>CALCULATE PROTEIN</SubmitButton>
        </>
      }
      results={
        <ResultPanel empty="Enter your bodyweight to see your daily protein target.">
          {out && (
            <Reveal delay={0} className="flex flex-col h-full">
              <span className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-2">
                Daily protein target
              </span>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-[56px] font-bold font-body leading-none text-fg tracking-tight tabular-nums">
                  {out.grams}
                </span>
                <span className="text-[18px] text-fg-muted font-medium mb-2">g/day</span>
              </div>

              <div className="mb-auto">
                <Stat label={`Rate used`} value={PROTEIN_G_PER_KG[goal]} unit="g/kg" />
                <Stat label="Across 4 meals" value={`~${out.perMeal}`} unit="g each" tone="accent" />
                <Stat label="Calories from protein" value={(out.grams * 4).toLocaleString()} unit="kcal" />
                <Stat
                  label="Per lb of bodyweight"
                  value={(out.grams / kgToLb(out.weightKg)).toFixed(2)}
                  unit="g"
                />
              </div>

              <ToolCta>
                Hitting {out.grams}g a day is the hard part, not knowing the
                number. Dietly Fit logs a meal from a photo and shows the protein gap
                left in your day, so you find out at lunch rather than at
                midnight.
              </ToolCta>
            </Reveal>
          )}
        </ResultPanel>
      }
    />
  );
}
