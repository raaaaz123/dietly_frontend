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
import { armyBodyFat, armyBodyFatLimit, cmToIn, kgToLb, type Sex } from "../lib/formulas";

type Units = "imperial" | "metric";

export default function ArmyBodyFatCalculator() {
  const [units, setUnits] = useState<Units>("imperial");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [abdomen, setAbdomen] = useState<number | "">("");
  const [out, setOut] = useState<{ bf: number; limit: number } | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!age || !weight || !abdomen) return;
    const lb = units === "imperial" ? Number(weight) : kgToLb(Number(weight));
    // The Army rounds the abdomen to the nearest half inch before applying the formula.
    const inches = Math.round((units === "imperial" ? Number(abdomen) : cmToIn(Number(abdomen))) * 2) / 2;
    setOut({ bf: armyBodyFat(lb, inches, sex), limit: armyBodyFatLimit(Number(age), sex) });
  };

  const pass = out ? out.bf <= out.limit : false;

  return (
    <CalculatorFrame
      onSubmit={submit}
      formTitle="Tape test"
      form={
        <>
          <Field label="Units">
            <Segmented
              options={[
                { value: "imperial" as Units, label: "lb / in" },
                { value: "metric" as Units, label: "kg / cm" },
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
              <NumberInput value={age} onChange={setAge} min={17} max={70} placeholder="24" suffix="yrs" />
            </Field>
          </div>
          <Field label="Weight">
            <NumberInput
              value={weight}
              onChange={setWeight}
              min={units === "imperial" ? 80 : 36}
              max={units === "imperial" ? 400 : 180}
              step={0.1}
              placeholder={units === "imperial" ? "180" : "82"}
              suffix={units === "imperial" ? "lb" : "kg"}
            />
          </Field>
          <Field label="Abdomen" hint="Around the belly button, relaxed, at the end of a normal breath out.">
            <NumberInput
              value={abdomen}
              onChange={setAbdomen}
              min={units === "imperial" ? 20 : 50}
              max={units === "imperial" ? 70 : 180}
              step={0.5}
              placeholder={units === "imperial" ? "34" : "86"}
              suffix={units === "imperial" ? "in" : "cm"}
            />
          </Field>
          <SubmitButton>CHECK MY TAPE</SubmitButton>
        </>
      }
      results={
        <ResultPanel empty="Enter your weight and abdomen measurement to see your Army body fat and whether it meets the standard.">
          {out && (
            <Reveal delay={0} className="flex flex-col h-full">
              <span className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-2">
                Army body fat
              </span>
              <div className="flex items-end gap-3 mb-8">
                <span className="text-[56px] font-bold font-body leading-none text-fg tracking-tight tabular-nums">
                  {out.bf}%
                </span>
                <span className={`text-[18px] font-bold mb-2 ${pass ? "text-accent" : "text-red-400"}`}>
                  {pass ? "Within standard" : "Over standard"}
                </span>
              </div>
              <div className="mb-auto">
                <Stat label="Maximum for your age and sex" value={`${out.limit}%`} />
                <Stat
                  label={pass ? "Margin" : "To lose"}
                  value={`${Math.abs(out.limit - out.bf)} points`}
                  tone="accent"
                />
              </div>
              <p className="mt-5 text-[13px] leading-relaxed text-fg-muted border border-border bg-bg-elevated/40 rounded-xl p-4">
                An estimate using the published formula. Your official result
                comes from a trained tape measurer, and the rules can change, so
                check the current AR 600-9 with your unit.
              </p>
              <ToolCta>
                Getting under the line is about losing fat while holding strength.
                Dietly Fit logs your training and scores one photo a week, so you
                see the change before tape day.
              </ToolCta>
            </Reveal>
          )}
        </ResultPanel>
      }
    />
  );
}
