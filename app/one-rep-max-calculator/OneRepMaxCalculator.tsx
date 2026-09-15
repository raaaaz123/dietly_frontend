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
import { RM_PERCENTAGES, oneRepMax } from "../lib/formulas";

type Units = "kg" | "lb";

export default function OneRepMaxCalculator() {
  const [units, setUnits] = useState<Units>("kg");
  const [weight, setWeight] = useState<number | "">("");
  const [reps, setReps] = useState<number | "">("");

  const [out, setOut] = useState<ReturnType<typeof oneRepMax> & { reps: number } | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight || !reps) return;
    const rm = oneRepMax(Number(weight), Number(reps));
    if (!rm) return;
    setOut({ ...rm, reps: Number(reps) });
  };

  // Round to the nearest 2.5 — the smallest jump most gyms can actually load.
  const plate = (v: number) => (Math.round(v / 2.5) * 2.5).toFixed(1).replace(/\.0$/, "");

  return (
    <CalculatorFrame
      onSubmit={submit}
      formTitle="Your set"
      form={
        <>
          <Field label="Units">
            <Segmented
              options={[
                { value: "kg" as Units, label: "Kilograms" },
                { value: "lb" as Units, label: "Pounds" },
              ]}
              value={units}
              onChange={setUnits}
            />
          </Field>

          <Field label="Weight lifted">
            <NumberInput value={weight} onChange={setWeight} min={1} placeholder="100" suffix={units} />
          </Field>

          <Field
            label="Reps completed"
            hint="Reps taken close to failure. Above 10, the estimate measures endurance more than strength."
          >
            <NumberInput value={reps} onChange={setReps} min={1} max={20} step={1} placeholder="5" suffix="reps" />
          </Field>

          <SubmitButton>ESTIMATE 1RM</SubmitButton>
        </>
      }
      results={
        <ResultPanel empty="Enter a set you have actually done to estimate your max.">
          {out && (
            <Reveal delay={0} className="flex flex-col h-full">
              <span className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-2">
                Estimated one-rep max
              </span>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-[56px] font-bold font-body leading-none text-fg tracking-tight tabular-nums">
                  {plate(out.average)}
                </span>
                <span className="text-[18px] text-fg-muted font-medium mb-2">{units}</span>
              </div>

              <div className="mb-6">
                <Stat label="Epley" value={plate(out.epley)} unit={units} />
                <Stat label="Brzycki" value={plate(out.brzycki)} unit={units} />
                <Stat label="Lombardi" value={plate(out.lombardi)} unit={units} />
                <Stat label="O'Conner" value={plate(out.oconner)} unit={units} />
              </div>

              {out.reps > 10 && (
                <p className="mb-5 text-[13px] leading-relaxed text-amber-400/90 border border-amber-400/30 bg-amber-400/5 rounded-xl p-4">
                  Above ten reps these formulas drift badly — a set of 15 says
                  more about your work capacity than your maximum strength. Test
                  with a heavier set of 3–5 for a number worth programming from.
                </p>
              )}

              <div className="mb-auto">
                <p className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-3">
                  Working weights
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {RM_PERCENTAGES.map((r) => (
                    <div key={r.reps} className="bg-bg-elevated/60 rounded-lg px-2 py-2 text-center border border-border">
                      <div className="text-[11px] text-fg-faint">{r.reps} rep{r.reps > 1 ? "s" : ""}</div>
                      <div className="text-[14px] font-bold text-fg tabular-nums">
                        {plate(out.average * r.pct)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <ToolCta>
                Knowing the max is the easy part — programming around it week
                after week is the work. Dietly builds the week from your last
                scan and your available equipment, and rewrites any session when
                the rack is taken or the shoulder is sore.
              </ToolCta>
            </Reveal>
          )}
        </ResultPanel>
      }
    />
  );
}
