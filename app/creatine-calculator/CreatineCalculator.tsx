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
import { creatineDose, lbToKg } from "../lib/formulas";

type Units = "metric" | "imperial";

export default function CreatineCalculator() {
  const [units, setUnits] = useState<Units>("metric");
  const [weight, setWeight] = useState<number | "">("");
  const [load, setLoad] = useState<"yes" | "no">("no");

  const [out, setOut] = useState<
    (ReturnType<typeof creatineDose> & { loading: boolean }) | null
  >(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const kg = units === "metric" ? Number(weight) : lbToKg(Number(weight));
    if (!kg) return;
    setOut({ ...creatineDose(kg), loading: load === "yes" });
  };

  return (
    <CalculatorFrame
      onSubmit={submit}
      formTitle="Your bodyweight"
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
              min={units === "metric" ? 35 : 77}
              max={units === "metric" ? 200 : 440}
              placeholder={units === "metric" ? "80" : "176"}
              suffix={units === "metric" ? "kg" : "lb"}
            />
          </Field>

          <Field
            label="Loading phase?"
            hint="Optional. It reaches full muscle saturation in about a week instead of about a month — the end point is the same either way."
          >
            <Segmented
              options={[
                { value: "no" as const, label: "No" },
                { value: "yes" as const, label: "Yes" },
              ]}
              value={load}
              onChange={setLoad}
            />
          </Field>

          <SubmitButton>CALCULATE</SubmitButton>
        </>
      }
      results={
        <ResultPanel empty="Enter your bodyweight to get your daily creatine monohydrate dose.">
          {out && (
            <Reveal delay={0} className="flex flex-col h-full">
              <span className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-2">
                Daily maintenance dose
              </span>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-[56px] font-bold font-body leading-none text-fg tracking-tight tabular-nums">
                  {out.maintenance.toFixed(1)}
                </span>
                <span className="text-[18px] text-fg-muted font-medium mb-2">g/day</span>
              </div>

              <div className="mb-auto">
                {out.loading ? (
                  <>
                    <Stat
                      label={`Loading, days 1–${out.loadingDays}`}
                      value={out.loadingDaily.toFixed(1)}
                      unit="g/day"
                      tone="accent"
                    />
                    <Stat
                      label="Split into 4 servings of"
                      value={out.loadingPerServing.toFixed(1)}
                      unit="g"
                    />
                    <Stat label="Then maintenance from day 7" value={out.maintenance.toFixed(1)} unit="g/day" />
                  </>
                ) : (
                  <>
                    <Stat label="Saturation reached in" value="~4 weeks" tone="accent" />
                    <Stat label="Loading alternative" value="~1 week" />
                    <Stat label="Same end point either way" value="Yes" />
                  </>
                )}
                <Stat label="Form" value="Monohydrate" />
              </div>

              <p className="mt-5 text-[13px] leading-relaxed text-fg-muted border border-border bg-bg-elevated/40 rounded-xl p-4">
                Creatine monohydrate is among the most studied supplements in
                sport, and the cheapest form is the one with the evidence behind
                it. Timing barely matters; taking it every day does. Loading is
                optional — it only changes how fast you arrive.
              </p>

              <ToolCta>
                Supplements are the small lever. Dietly Fit handles the big one
                — a weekly photo scored out of 100 and the training week built
                around what it finds.
              </ToolCta>
            </Reveal>
          )}
        </ResultPanel>
      }
    />
  );
}
