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
  boerLeanBodyMass,
  feetInchesToCm,
  kgToLb,
  lbToKg,
  leanBodyMass,
  navyBodyFat,
  proteinTarget,
  type Sex,
} from "../lib/formulas";

type Units = "metric" | "imperial";
/** Three routes in, because people arrive knowing different things. */
type Method = "bodyfat" | "tape" | "estimate";

export default function LbmCalculator() {
  const [units, setUnits] = useState<Units>("metric");
  const [method, setMethod] = useState<Method>("bodyfat");
  const [sex, setSex] = useState<Sex>("male");
  const [kg, setKg] = useState<number | "">("");
  const [lb, setLb] = useState<number | "">("");
  const [cm, setCm] = useState<number | "">("");
  const [ft, setFt] = useState<number | "">("");
  const [inch, setInch] = useState<number | "">("");
  const [bf, setBf] = useState<number | "">("");
  const [neck, setNeck] = useState<number | "">("");
  const [waist, setWaist] = useState<number | "">("");
  const [hip, setHip] = useState<number | "">("");

  const [out, setOut] = useState<{
    lbm: number;
    fatMass: number;
    bodyFat: number | null;
    protein: number;
    metric: boolean;
    source: string;
  } | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const weightKg = units === "metric" ? Number(kg) : lbToKg(Number(lb));
    const heightCm =
      units === "metric" ? Number(cm) : feetInchesToCm(Number(ft), Number(inch || 0));
    if (!weightKg) return;

    let lbm: number;
    let bodyFat: number | null = null;
    let source: string;

    if (method === "bodyfat") {
      if (!bf) return;
      bodyFat = Number(bf);
      lbm = leanBodyMass(weightKg, bodyFat);
      source = "your body fat percentage";
    } else if (method === "tape") {
      if (!heightCm || !neck || !waist) return;
      const toCm = (v: number) => (units === "metric" ? v : v * 2.54);
      const pct = navyBodyFat({
        sex,
        heightCm,
        neckCm: toCm(Number(neck)),
        waistCm: toCm(Number(waist)),
        hipCm: hip ? toCm(Number(hip)) : undefined,
      });
      if (pct === null) return;
      bodyFat = pct;
      lbm = leanBodyMass(weightKg, pct);
      source = "the US Navy tape method";
    } else {
      if (!heightCm) return;
      lbm = boerLeanBodyMass(weightKg, heightCm, sex);
      bodyFat = ((weightKg - lbm) / weightKg) * 100;
      source = "the Boer formula (height and weight only)";
    }

    setOut({
      lbm,
      fatMass: weightKg - lbm,
      bodyFat,
      // The most useful thing lean mass unlocks: a protein target that ignores
      // fat tissue, which does not need feeding.
      protein: proteinTarget(lbm, "cutting"),
      metric: units === "metric",
      source,
    });
  };

  const w = (v: number, metric: boolean) =>
    metric ? `${v.toFixed(1)} kg` : `${kgToLb(v).toFixed(1)} lb`;
  const lenSuffix = units === "metric" ? "cm" : "in";

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

          <Field
            label="What do you know?"
            hint={
              method === "bodyfat"
                ? "The most accurate route, if you have a recent figure."
                : method === "tape"
                  ? "Three measurements with a tape. Better than a height-only estimate."
                  : "Height and weight only — a rough estimate that cannot see your training."
            }
          >
            <Segmented
              options={[
                { value: "bodyfat" as Method, label: "Body fat %" },
                { value: "tape" as Method, label: "Tape measure" },
                { value: "estimate" as Method, label: "Neither" },
              ]}
              value={method}
              onChange={setMethod}
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
            {units === "metric" ? (
              <NumberInput value={kg} onChange={setKg} min={30} max={300} placeholder="80" suffix="kg" />
            ) : (
              <NumberInput value={lb} onChange={setLb} min={66} max={660} placeholder="176" suffix="lb" />
            )}
          </Field>

          {method === "bodyfat" ? (
            <Field label="Body fat percentage">
              <NumberInput value={bf} onChange={setBf} min={3} max={70} placeholder="18" suffix="%" />
            </Field>
          ) : (
            <Field label="Height">
              {units === "metric" ? (
                <NumberInput value={cm} onChange={setCm} min={120} max={250} placeholder="180" suffix="cm" />
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <NumberInput value={ft} onChange={setFt} min={3} max={8} placeholder="5" suffix="ft" />
                  <NumberInput value={inch} onChange={setInch} min={0} max={11} required={false} placeholder="11" suffix="in" />
                </div>
              )}
            </Field>
          )}

          {method === "tape" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Neck">
                  <NumberInput value={neck} onChange={setNeck} min={20} max={80} placeholder={units === "metric" ? "38" : "15"} suffix={lenSuffix} />
                </Field>
                <Field label="Waist">
                  <NumberInput value={waist} onChange={setWaist} min={40} max={200} placeholder={units === "metric" ? "85" : "33"} suffix={lenSuffix} />
                </Field>
              </div>
              {sex === "female" && (
                <Field label="Hip">
                  <NumberInput value={hip} onChange={setHip} min={50} max={200} placeholder={units === "metric" ? "95" : "37"} suffix={lenSuffix} />
                </Field>
              )}
            </>
          )}

          <SubmitButton>CALCULATE LEAN MASS</SubmitButton>
        </>
      }
      results={
        <ResultPanel empty="Enter your details to see what your weight is made of.">
          {out && (
            <Reveal delay={0} className="flex flex-col h-full">
              <span className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-2">
                Lean body mass
              </span>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-[56px] font-bold font-body leading-none text-fg tracking-tight tabular-nums">
                  {out.metric ? out.lbm.toFixed(1) : kgToLb(out.lbm).toFixed(1)}
                </span>
                <span className="text-[18px] text-fg-muted font-medium mb-2">
                  {out.metric ? "kg" : "lb"}
                </span>
              </div>

              <div className="mb-auto">
                <Stat label="Fat mass" value={w(out.fatMass, out.metric)} />
                {out.bodyFat !== null && (
                  <Stat label="Body fat" value={out.bodyFat.toFixed(1)} unit="%" />
                )}
                <Stat
                  label="Protein, on lean mass"
                  value={`${Math.round(out.protein)}`}
                  unit="g/day"
                  tone="accent"
                />
              </div>

              <p className="mt-5 text-[12px] text-fg-faint leading-relaxed">
                Calculated from {out.source}.
              </p>

              <ToolCta>
                Lean mass is the number that should move, and the scale cannot
                see it. Dietly Fit scores a weekly photo out of 100 and names the
                weak point, so you can tell whether the shape is changing even in
                a week the scale does not.
              </ToolCta>
            </Reveal>
          )}
        </ResultPanel>
      }
    />
  );
}
