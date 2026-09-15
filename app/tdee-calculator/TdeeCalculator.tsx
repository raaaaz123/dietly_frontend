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
  tdee,
  lbToKg,
  feetInchesToCm,
  type Sex,
} from "../lib/formulas";

type Units = "metric" | "imperial";

export default function TdeeCalculator() {
  const [units, setUnits] = useState<Units>("metric");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState<number | "">("");
  const [kg, setKg] = useState<number | "">("");
  const [cm, setCm] = useState<number | "">("");
  const [lb, setLb] = useState<number | "">("");
  const [ft, setFt] = useState<number | "">("");
  const [inch, setInch] = useState<number | "">("");
  const [activity, setActivity] = useState<number>(1.55);

  const [out, setOut] = useState<{ basal: number; total: number } | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!age) return;

    // Imperial is converted here, at the edge, and never reaches the formulas.
    const weightKg = units === "metric" ? Number(kg) : lbToKg(Number(lb));
    const heightCm =
      units === "metric" ? Number(cm) : feetInchesToCm(Number(ft), Number(inch || 0));
    if (!weightKg || !heightCm) return;

    const basal = bmr(weightKg, heightCm, Number(age), sex);
    setOut({ basal: Math.round(basal), total: Math.round(tdee(basal, activity)) });
  };

  return (
    <CalculatorFrame
      onSubmit={submit}
      formTitle="Your details"
      form={
        <>
          <Field label="Units">
            <Segmented
              options={[
                { value: "metric" as Units, label: "Metric (kg/cm)" },
                { value: "imperial" as Units, label: "Imperial (lb/ft)" },
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
            {units === "metric" ? (
              <Field label="Weight">
                <NumberInput value={kg} onChange={setKg} min={30} max={300} placeholder="75" suffix="kg" />
              </Field>
            ) : (
              <Field label="Weight">
                <NumberInput value={lb} onChange={setLb} min={66} max={660} placeholder="165" suffix="lb" />
              </Field>
            )}
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

          <Field
            label="Activity level"
            hint="Count deliberate training, not a busy day. Most people overestimate this by one step."
          >
            <Select
              options={ACTIVITY_LEVELS.map((a) => ({ value: a.value, label: a.label }))}
              value={activity}
              onChange={setActivity}
            />
          </Field>

          <SubmitButton>CALCULATE TDEE</SubmitButton>
        </>
      }
      results={
        <ResultPanel empty="Fill in your details to see what you burn in a day.">
          {out && (
            <Reveal delay={0} className="flex flex-col h-full">
              <span className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-2">
                Maintenance calories
              </span>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-[56px] font-bold font-body leading-none text-fg tracking-tight tabular-nums">
                  {out.total.toLocaleString()}
                </span>
                <span className="text-[18px] text-fg-muted font-medium mb-2">kcal/day</span>
              </div>

              <div className="mb-auto">
                <Stat label="BMR (at complete rest)" value={out.basal.toLocaleString()} unit="kcal" />
                <Stat label="Burned through activity" value={(out.total - out.basal).toLocaleString()} unit="kcal" />
                <Stat label="To lose ~0.5 kg/week" value={(out.total - 500).toLocaleString()} unit="kcal" tone="accent" />
                <Stat label="To gain ~0.5 kg/week" value={(out.total + 500).toLocaleString()} unit="kcal" tone="accent" />
              </div>

              <ToolCta>
                A maintenance number is a starting estimate, not a measurement.
                Dietly tracks what you actually eat and train, and moves the
                target when your weekly trend says the estimate was off.
              </ToolCta>
            </Reveal>
          )}
        </ResultPanel>
      }
    />
  );
}
