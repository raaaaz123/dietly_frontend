"use client";

import { useState } from "react";
import Reveal from "../components/Reveal";
import {
  CalculatorFrame,
  Field,
  NumberInput,
  ResultPanel,
  Segmented,
  Select,
  Stat,
  SubmitButton,
  ToolCta,
} from "../components/tools/fields";
import { ACTIVITIES, STEPS_PER_KM, activity as findActivity } from "../lib/activities";
import { caloriesBurned, lbToKg } from "../lib/formulas";

type Units = "metric" | "imperial";
type Mode = "time" | "steps";

export default function CaloriesBurnedCalculator() {
  const [units, setUnits] = useState<Units>("metric");
  const [mode, setMode] = useState<Mode>("time");
  const [weight, setWeight] = useState<number | "">("");
  const [minutes, setMinutes] = useState<number | "">("");
  const [steps, setSteps] = useState<number | "">("");
  const [slug, setSlug] = useState<string>("walking");

  const [out, setOut] = useState<{
    gross: number;
    net: number;
    met: number;
    name: string;
    minutes: number;
    perHour: number;
  } | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const kg = units === "metric" ? Number(weight) : lbToKg(Number(weight));
    const a = findActivity(mode === "steps" ? "walking" : slug);
    if (!kg || !a) return;

    // Steps become minutes via an average stride, then follow the same path.
    // The page is explicit that this conversion is the loosest part.
    const mins =
      mode === "steps"
        ? (Number(steps) / STEPS_PER_KM / 4.8) * 60
        : Number(minutes);
    if (!mins) return;

    const r = caloriesBurned(a.met, kg, mins);
    setOut({
      ...r,
      met: a.met,
      name: a.name,
      minutes: mins,
      perHour: caloriesBurned(a.met, kg, 60).gross,
    });
  };

  const grouped = ACTIVITIES.map((a) => ({ value: a.slug, label: a.name }));

  return (
    <CalculatorFrame
      onSubmit={submit}
      formTitle="What you did"
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

          <Field label="Weight">
            <NumberInput
              value={weight}
              onChange={setWeight}
              min={units === "metric" ? 30 : 66}
              max={units === "metric" ? 300 : 660}
              placeholder={units === "metric" ? "75" : "165"}
              suffix={units === "metric" ? "kg" : "lb"}
            />
          </Field>

          <Field label="Measure by">
            <Segmented
              options={[
                { value: "time" as Mode, label: "Time" },
                { value: "steps" as Mode, label: "Steps" },
              ]}
              value={mode}
              onChange={setMode}
            />
          </Field>

          {mode === "time" ? (
            <>
              <Field label="Activity">
                <Select options={grouped} value={slug} onChange={setSlug} />
              </Field>
              <Field label="Duration">
                <NumberInput value={minutes} onChange={setMinutes} min={1} max={600} placeholder="45" suffix="min" />
              </Field>
            </>
          ) : (
            <Field
              label="Steps"
              hint="Converted to walking minutes using an average stride. Stride length varies by more than 20% between people, so treat this as the roughest figure on the page."
            >
              <NumberInput value={steps} onChange={setSteps} min={100} max={100000} placeholder="10000" suffix="steps" />
            </Field>
          )}

          <SubmitButton>CALCULATE</SubmitButton>
        </>
      }
      results={
        <ResultPanel empty="Pick an activity and a duration to see what it actually costs.">
          {out && (
            <Reveal delay={0} className="flex flex-col h-full">
              <span className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-2">
                Calories burned
              </span>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-[56px] font-bold font-body leading-none text-fg tracking-tight tabular-nums">
                  {Math.round(out.gross)}
                </span>
                <span className="text-[18px] text-fg-muted font-medium mb-2">kcal</span>
              </div>

              <div className="mb-auto">
                <Stat label="Beyond just existing" value={Math.round(out.net)} unit="kcal" tone="accent" />
                <Stat label="Per hour at this effort" value={Math.round(out.perHour)} unit="kcal" />
                <Stat label="Duration" value={Math.round(out.minutes)} unit="min" />
                <Stat label="MET value used" value={out.met.toFixed(1)} />
              </div>

              <p className="mt-5 text-[13px] leading-relaxed text-fg-muted border border-border bg-bg-elevated/40 rounded-xl p-4">
                The big number is <strong className="text-fg">gross</strong> — it
                includes the calories you would have burned sitting still for the
                same {Math.round(out.minutes)} minutes. The second line strips
                those out, and it is the honest figure if you are thinking about
                eating any of it back.
              </p>

              <ToolCta>
                Burning calories is the easy half. Dietly Fit scores a photo each
                week out of 100 and builds the training that changes what your
                body is made of, not just what it weighs.
              </ToolCta>
            </Reveal>
          )}
        </ResultPanel>
      }
    />
  );
}
