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
import {
  ACTIVITY_LEVELS,
  KCAL_PER_KG,
  applyDeficit,
  bmr,
  feetInchesToCm,
  kgToLb,
  lbToKg,
  tdee,
  type Sex,
} from "../lib/formulas";

type Units = "metric" | "imperial";

/** Weekly loss rates, as a fraction of bodyweight — the sustainable way to
 *  express this. A flat "1 kg/week" is trivial for a 120 kg person and brutal
 *  for a 55 kg one. */
const RATES = [
  { value: 0.0025, label: "Slow — 0.25%/wk" },
  { value: 0.005, label: "Steady — 0.5%/wk" },
  { value: 0.0075, label: "Fast — 0.75%/wk" },
  { value: 0.01, label: "Aggressive — 1%/wk" },
] as const;

export default function DeficitCalculator() {
  const [units, setUnits] = useState<Units>("metric");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState<number | "">("");
  const [kg, setKg] = useState<number | "">("");
  const [cm, setCm] = useState<number | "">("");
  const [lb, setLb] = useState<number | "">("");
  const [ft, setFt] = useState<number | "">("");
  const [inch, setInch] = useState<number | "">("");
  const [targetKg, setTargetKg] = useState<number | "">("");
  const [targetLb, setTargetLb] = useState<number | "">("");
  const [activity, setActivity] = useState<number>(1.55);
  const [rate, setRate] = useState<number>(0.005);

  const [out, setOut] = useState<{
    maintenance: number;
    target: number;
    deficit: number;
    weeklyKg: number;
    weeks: number | null;
    floored: boolean;
    metric: boolean;
  } | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!age) return;
    const weightKg = units === "metric" ? Number(kg) : lbToKg(Number(lb));
    const heightCm =
      units === "metric" ? Number(cm) : feetInchesToCm(Number(ft), Number(inch || 0));
    if (!weightKg || !heightCm) return;

    const maintenance = tdee(bmr(weightKg, heightCm, Number(age), sex), activity);
    const weeklyKg = weightKg * rate;
    const dailyDelta = -(weeklyKg * KCAL_PER_KG) / 7;

    const { calories, floored } = applyDeficit(maintenance, dailyDelta, sex);

    // If the floor bit, the achieved deficit is smaller than the one asked for,
    // so the timeline has to be recomputed from what is actually being eaten —
    // otherwise the page promises a date it cannot deliver.
    const realDeficit = maintenance - calories;
    const realWeeklyKg = (realDeficit * 7) / KCAL_PER_KG;

    const goalKg = units === "metric" ? Number(targetKg) : lbToKg(Number(targetLb));
    const toLose = goalKg ? weightKg - goalKg : 0;
    const weeks = toLose > 0 && realWeeklyKg > 0 ? toLose / realWeeklyKg : null;

    setOut({
      maintenance: Math.round(maintenance),
      target: Math.round(calories),
      deficit: Math.round(realDeficit),
      weeklyKg: realWeeklyKg,
      weeks: weeks ? Math.ceil(weeks) : null,
      floored,
      metric: units === "metric",
    });
  };

  const fmtWeight = (v: number, metric: boolean) =>
    metric ? `${v.toFixed(2)} kg` : `${kgToLb(v).toFixed(2)} lb`;

  return (
    <CalculatorFrame
      onSubmit={submit}
      formTitle="Your details"
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

          <div className="grid grid-cols-2 gap-4">
            <Field label="Age">
              <NumberInput value={age} onChange={setAge} min={15} max={100} placeholder="28" suffix="yrs" />
            </Field>
            <Field label="Current weight">
              {units === "metric" ? (
                <NumberInput value={kg} onChange={setKg} min={30} max={300} placeholder="85" suffix="kg" />
              ) : (
                <NumberInput value={lb} onChange={setLb} min={66} max={660} placeholder="187" suffix="lb" />
              )}
            </Field>
          </div>

          {units === "metric" ? (
            <Field label="Height">
              <NumberInput value={cm} onChange={setCm} min={120} max={250} placeholder="178" suffix="cm" />
            </Field>
          ) : (
            <Field label="Height">
              <div className="grid grid-cols-2 gap-4">
                <NumberInput value={ft} onChange={setFt} min={3} max={8} placeholder="5" suffix="ft" />
                <NumberInput value={inch} onChange={setInch} min={0} max={11} required={false} placeholder="10" suffix="in" />
              </div>
            </Field>
          )}

          <Field label="Goal weight" hint="Optional — only used for the timeline.">
            {units === "metric" ? (
              <NumberInput value={targetKg} onChange={setTargetKg} required={false} min={30} max={300} placeholder="78" suffix="kg" />
            ) : (
              <NumberInput value={targetLb} onChange={setTargetLb} required={false} min={66} max={660} placeholder="172" suffix="lb" />
            )}
          </Field>

          <Field label="Activity level">
            <Select
              options={ACTIVITY_LEVELS.map((a) => ({ value: a.value, label: a.label }))}
              value={activity}
              onChange={setActivity}
            />
          </Field>

          <Field
            label="Rate of loss"
            hint="As a percentage of bodyweight — 0.5–0.75%/week is where most people keep their muscle."
          >
            <Select
              options={RATES.map((r) => ({ value: r.value, label: r.label }))}
              value={rate}
              onChange={setRate}
            />
          </Field>

          <SubmitButton>CALCULATE DEFICIT</SubmitButton>
        </>
      }
      results={
        <ResultPanel empty="Fill in your details to see the deficit and how long it takes.">
          {out && (
            <Reveal delay={0} className="flex flex-col h-full">
              <span className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-2">
                Eat this much
              </span>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-[56px] font-bold font-body leading-none text-fg tracking-tight tabular-nums">
                  {out.target.toLocaleString()}
                </span>
                <span className="text-[18px] text-fg-muted font-medium mb-2">kcal/day</span>
              </div>

              <div className="mb-auto">
                <Stat label="Maintenance" value={out.maintenance.toLocaleString()} unit="kcal" />
                <Stat label="Daily deficit" value={out.deficit.toLocaleString()} unit="kcal" tone="accent" />
                <Stat label="Expected loss" value={fmtWeight(out.weeklyKg, out.metric)} unit="/week" />
                {out.weeks !== null && (
                  <Stat label="Time to goal" value={out.weeks} unit={out.weeks === 1 ? "week" : "weeks"} tone="accent" />
                )}
              </div>

              {out.floored && (
                <p className="mt-5 text-[13px] leading-relaxed text-amber-400/90 border border-amber-400/30 bg-amber-400/5 rounded-xl p-4">
                  The rate you picked would have put you below a safe intake for
                  your sex, so this has been held at the floor
                  ({out.target.toLocaleString()} kcal) and the timeline
                  recalculated. A slower rate, or more activity, is the honest
                  way to go faster here.
                </p>
              )}

              <ToolCta>
                A deficit only works if you can tell whether you are in one.
                Dietly holds your weekly trend against this target and adjusts it
                when the trend says the estimate was off — and keeps protein high
                enough that what you lose is fat.
              </ToolCta>
            </Reveal>
          )}
        </ResultPanel>
      }
    />
  );
}
