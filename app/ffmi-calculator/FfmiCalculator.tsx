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
import { feetInchesToCm, ffmi, kgToLb, lbToKg } from "../lib/formulas";

type Units = "metric" | "imperial";

/** Descriptive bands, phrased as observations rather than verdicts. The page
 *  is explicit that these come from a distribution, not a standard. */
function band(n: number, male: boolean): string {
  const shifted = male ? n : n + 3;
  if (shifted < 18) return "Below average muscle for frame";
  if (shifted < 20) return "Average";
  if (shifted < 22) return "Visibly muscular";
  if (shifted < 24) return "Well-developed, years of training";
  if (shifted < 26) return "Near the drug-free upper range";
  return "Above the drug-free range reported by Kouri";
}

export default function FfmiCalculator() {
  const [units, setUnits] = useState<Units>("metric");
  const [sex, setSex] = useState<"male" | "female">("male");
  const [cm, setCm] = useState<number | "">("");
  const [ft, setFt] = useState<number | "">("");
  const [inch, setInch] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [bf, setBf] = useState<number | "">("");

  const [out, setOut] = useState<
    (ReturnType<typeof ffmi> & { label: string; metric: boolean }) | null
  >(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const heightCm =
      units === "metric" ? Number(cm) : feetInchesToCm(Number(ft), Number(inch || 0));
    const weightKg = units === "metric" ? Number(weight) : lbToKg(Number(weight));
    if (!heightCm || !weightKg || bf === "") return;

    const r = ffmi(weightKg, heightCm, Number(bf));
    setOut({ ...r, label: band(r.normalised, sex === "male"), metric: units === "metric" });
  };

  return (
    <CalculatorFrame
      onSubmit={submit}
      formTitle="Your measurements"
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
                { value: "male" as const, label: "Male" },
                { value: "female" as const, label: "Female" },
              ]}
              value={sex}
              onChange={setSex}
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

          <Field label="Weight">
            <NumberInput
              value={weight}
              onChange={setWeight}
              min={units === "metric" ? 30 : 66}
              max={units === "metric" ? 300 : 660}
              placeholder={units === "metric" ? "80" : "176"}
              suffix={units === "metric" ? "kg" : "lb"}
            />
          </Field>

          <Field
            label="Body fat"
            hint="FFMI is only as good as this number. An estimate that is 4 points out moves your FFMI by about a full point."
          >
            <NumberInput value={bf} onChange={setBf} min={3} max={60} placeholder="15" suffix="%" />
          </Field>

          <SubmitButton>CALCULATE</SubmitButton>
        </>
      }
      results={
        <ResultPanel empty="Enter your height, weight and body fat to see how much muscle you carry for your frame.">
          {out && (
            <Reveal delay={0} className="flex flex-col h-full">
              <span className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-2">
                Normalised FFMI
              </span>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-[56px] font-bold font-body leading-none text-fg tracking-tight tabular-nums">
                  {out.normalised.toFixed(1)}
                </span>
              </div>

              <div className="mb-auto">
                <Stat label="What that looks like" value={out.label} tone="accent" />
                <Stat label="Raw FFMI" value={out.ffmi.toFixed(1)} />
                <Stat
                  label="Lean mass"
                  value={out.metric ? out.leanMassKg.toFixed(1) : kgToLb(out.leanMassKg).toFixed(1)}
                  unit={out.metric ? "kg" : "lb"}
                />
              </div>

              <p className="mt-5 text-[13px] leading-relaxed text-fg-muted border border-border bg-bg-elevated/40 rounded-xl p-4">
                The often-quoted figure of 25 as a &ldquo;natural limit&rdquo;
                comes from one 1995 study of 157 men. It described where most of
                that sample fell — it did not test a ceiling, and drug-free
                lifters above it exist. Read your number as a description of
                where you are, not a verdict on where you can get.
              </p>

              <ToolCta>
                FFMI tells you how much muscle you carry. Dietly Fit tells you
                where it is missing — a weekly photo scored out of 100, the weak
                point named, and the training week built to fix it.
              </ToolCta>
            </Reveal>
          )}
        </ResultPanel>
      }
    />
  );
}
