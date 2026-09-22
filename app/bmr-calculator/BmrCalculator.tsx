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
  bmr,
  feetInchesToCm,
  lbToKg,
  tdee,
  type Sex,
} from "../lib/formulas";

type Units = "metric" | "imperial";

export default function BmrCalculator() {
  const [units, setUnits] = useState<Units>("metric");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState<number | "">("");
  const [cm, setCm] = useState<number | "">("");
  const [ft, setFt] = useState<number | "">("");
  const [inch, setInch] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [activity, setActivity] = useState<number>(ACTIVITY_LEVELS[1].value);

  const [out, setOut] = useState<{
    basal: number;
    maintenance: number;
    perHour: number;
    share: number;
  } | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const heightCm =
      units === "metric" ? Number(cm) : feetInchesToCm(Number(ft), Number(inch || 0));
    const weightKg = units === "metric" ? Number(weight) : lbToKg(Number(weight));
    if (!heightCm || !weightKg || !age) return;

    const basal = bmr(weightKg, heightCm, Number(age), sex);
    const maintenance = tdee(basal, activity);
    setOut({
      basal,
      maintenance,
      perHour: basal / 24,
      // The number that makes BMR click: most of what you burn is not exercise.
      share: (basal / maintenance) * 100,
    });
  };

  return (
    <CalculatorFrame
      onSubmit={submit}
      formTitle="About you"
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

          <Field label="Age">
            <NumberInput value={age} onChange={setAge} min={15} max={100} placeholder="30" suffix="yrs" />
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

          <Field
            label="Activity level"
            hint="Only used for the maintenance figure. Your BMR itself does not change with activity."
          >
            <Select
              options={ACTIVITY_LEVELS.map((a) => ({ value: a.value, label: a.label }))}
              value={activity}
              onChange={setActivity}
            />
          </Field>

          <SubmitButton>CALCULATE</SubmitButton>
        </>
      }
      results={
        <ResultPanel empty="Fill in your details to see the calories you burn at complete rest.">
          {out && (
            <Reveal delay={0} className="flex flex-col h-full">
              <span className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-2">
                Your BMR
              </span>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-[52px] font-bold font-body leading-none text-fg tracking-tight tabular-nums">
                  {Math.round(out.basal)}
                </span>
                <span className="text-[18px] text-fg-muted font-medium mb-2">kcal/day</span>
              </div>

              <div className="mb-auto">
                <Stat label="Per hour, doing nothing" value={Math.round(out.perHour)} unit="kcal" />
                <Stat label="Maintenance (BMR + activity)" value={Math.round(out.maintenance)} unit="kcal" tone="accent" />
                <Stat label="Share of your burn that is BMR" value={`${Math.round(out.share)}%`} />
              </div>

              <p className="mt-5 text-[13px] leading-relaxed text-fg-muted border border-border bg-bg-elevated/40 rounded-xl p-4">
                Roughly {Math.round(out.share)}% of everything you burn happens
                while you are doing nothing in particular. That is the reason
                changing what you eat moves the needle faster than adding a
                cardio session — and the reason keeping muscle matters, because
                muscle is part of what sets this number.
              </p>

              <ToolCta>
                Your BMR sets the floor. Dietly Fit builds the week of training
                that protects the muscle holding it up, from a weekly photo
                scored out of 100.
              </ToolCta>
            </Reveal>
          )}
        </ResultPanel>
      }
    />
  );
}
