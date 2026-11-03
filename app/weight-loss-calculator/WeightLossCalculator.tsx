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
  feetInchesToCm,
  kgToLb,
  lbToKg,
  weightLossPlan,
  type Sex,
} from "../lib/formulas";

type Units = "metric" | "imperial";

const RATES_KG = [
  { value: 0.25, label: "Slow (0.25 kg / 0.5 lb a week)" },
  { value: 0.5, label: "Steady (0.5 kg / 1 lb a week)" },
  { value: 0.75, label: "Fast (0.75 kg / 1.5 lb a week)" },
  { value: 1, label: "Aggressive (1 kg / 2 lb a week)" },
] as const;

export default function WeightLossCalculator() {
  const [units, setUnits] = useState<Units>("metric");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState<number | "">("");
  const [cm, setCm] = useState<number | "">("");
  const [ft, setFt] = useState<number | "">("");
  const [inch, setInch] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [goal, setGoal] = useState<number | "">("");
  const [activity, setActivity] = useState<number>(1.375);
  const [rate, setRate] = useState<number>(0.5);
  const [out, setOut] = useState<(ReturnType<typeof weightLossPlan> & { metric: boolean }) | null>(
    null,
  );
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const heightCm =
      units === "metric" ? Number(cm) : feetInchesToCm(Number(ft), Number(inch || 0));
    const weightKg = units === "metric" ? Number(weight) : lbToKg(Number(weight));
    const goalKg = units === "metric" ? Number(goal) : lbToKg(Number(goal));
    if (!heightCm || !weightKg || !goalKg || !age) return;
    if (goalKg >= weightKg) {
      setError("Your goal weight needs to be below your current weight.");
      setOut(null);
      return;
    }
    setError("");
    setOut({
      ...weightLossPlan({
        weightKg,
        goalKg,
        heightCm,
        age: Number(age),
        sex,
        activity,
        kgPerWeek: rate,
      }),
      metric: units === "metric",
    });
  };

  const mass = (kg: number, metric: boolean) =>
    metric ? `${kg.toFixed(1)} kg` : `${kgToLb(kg).toFixed(1)} lb`;

  return (
    <CalculatorFrame
      onSubmit={submit}
      formTitle="You and your goal"
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
          <div className="grid grid-cols-2 gap-4">
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
            <Field label="Age">
              <NumberInput value={age} onChange={setAge} min={16} max={90} placeholder="30" suffix="yrs" />
            </Field>
          </div>
          <Field label="Height">
            {units === "metric" ? (
              <NumberInput value={cm} onChange={setCm} min={120} max={250} placeholder="175" suffix="cm" />
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <NumberInput value={ft} onChange={setFt} min={3} max={8} placeholder="5" suffix="ft" />
                <NumberInput value={inch} onChange={setInch} min={0} max={11} required={false} placeholder="9" suffix="in" />
              </div>
            )}
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Current weight">
              <NumberInput
                value={weight}
                onChange={setWeight}
                min={units === "metric" ? 35 : 77}
                max={units === "metric" ? 300 : 660}
                step={0.1}
                placeholder={units === "metric" ? "85" : "187"}
                suffix={units === "metric" ? "kg" : "lb"}
              />
            </Field>
            <Field label="Goal weight">
              <NumberInput
                value={goal}
                onChange={setGoal}
                min={units === "metric" ? 35 : 77}
                max={units === "metric" ? 300 : 660}
                step={0.1}
                placeholder={units === "metric" ? "75" : "165"}
                suffix={units === "metric" ? "kg" : "lb"}
              />
            </Field>
          </div>
          <Field label="Activity">
            <Select
              options={ACTIVITY_LEVELS.map((a) => ({ value: a.value as number, label: a.label }))}
              value={activity}
              onChange={setActivity}
            />
          </Field>
          <Field label="Pace" hint="0.5 kg (1 lb) a week is the pace most people can hold without losing muscle.">
            <Select
              options={RATES_KG.map((r) => ({ value: r.value as number, label: r.label }))}
              value={rate}
              onChange={setRate}
            />
          </Field>
          {error ? <p className="text-[13px] text-red-400">{error}</p> : null}
          <SubmitButton>SHOW MY DATE</SubmitButton>
        </>
      }
      results={
        <ResultPanel empty="Enter your details and goal to see the date you reach it and what to eat each day.">
          {out && (
            <Reveal delay={0} className="flex flex-col h-full">
              <span className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-2">
                You reach your goal around
              </span>
              <div className="mb-2">
                <span className="text-[40px] md:text-[44px] font-bold font-body leading-none text-fg tracking-tight">
                  {out.goalDate.toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <p className="text-[15px] text-fg-muted mb-6">
                {out.weeks} weeks to lose {mass(out.toLose, out.metric)}
              </p>

              <div className="mb-auto">
                <Stat label="Eat per day now" value={Math.round(out.startCalories)} unit="kcal" tone="accent" />
                <Stat label="Eat per day near your goal" value={Math.round(out.endCalories)} unit="kcal" />
                <Stat label="Maintenance now" value={Math.round(out.startMaint)} unit="kcal" />
                <Stat label="Daily deficit" value={Math.round(out.dailyDeficit)} unit="kcal" />
              </div>

              {out.floored || out.aggressive ? (
                <p className="mt-5 text-[13px] leading-relaxed text-fg-muted border border-border bg-bg-elevated/40 rounded-xl p-4">
                  {out.floored
                    ? "This pace would take you below the minimum intake we recommend without supervision, so the target is held at that floor and the real date will be later. Try a slower pace."
                    : "This pace is more than 1% of your bodyweight a week. Expect more muscle loss and more hunger. Keep protein high and keep lifting."}
                </p>
              ) : null}

              <ToolCta>
                The scale only shows weight. Dietly Fit tracks what you are losing:
                log every lift and score one photo a week out of 100, so you can see
                you kept the muscle.
              </ToolCta>
            </Reveal>
          )}
        </ResultPanel>
      }
    />
  );
}
