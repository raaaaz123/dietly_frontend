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
import { KG_PLATES, LB_PLATES, platesPerSide } from "../lib/formulas";

type Units = "kg" | "lb";

const BARS: Record<Units, { value: number; label: string }[]> = {
  kg: [
    { value: 20, label: "Olympic bar (20 kg)" },
    { value: 15, label: "Women's bar (15 kg)" },
    { value: 10, label: "Training bar (10 kg)" },
  ],
  lb: [
    { value: 45, label: "Olympic bar (45 lb)" },
    { value: 35, label: "Women's bar (35 lb)" },
    { value: 15, label: "Training bar (15 lb)" },
  ],
};

/** Plate colours, IWF style for kg; lb plates are usually all black. */
const KG_COLOUR: Record<number, string> = {
  25: "#d83a3a",
  20: "#2f6fdb",
  15: "#e3b52b",
  10: "#2f9e5b",
  5: "#f5f5f5",
  2.5: "#d83a3a",
  1.25: "#bdbdbd",
};

export default function PlateCalculator() {
  const [units, setUnits] = useState<Units>("kg");
  const [bar, setBar] = useState<number>(20);
  const [target, setTarget] = useState<number | "">("");
  const [out, setOut] = useState<(ReturnType<typeof platesPerSide> & { units: Units }) | null>(null);

  const switchUnits = (u: Units) => {
    setUnits(u);
    setBar(BARS[u][0].value);
    setOut(null);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!target) return;
    setOut({ ...platesPerSide(Number(target), bar, units === "kg" ? KG_PLATES : LB_PLATES), units });
  };

  const grouped = (plates: number[]) => {
    const m = new Map<number, number>();
    plates.forEach((p) => m.set(p, (m.get(p) ?? 0) + 1));
    return [...m.entries()];
  };

  return (
    <CalculatorFrame
      onSubmit={submit}
      formTitle="Load the bar"
      form={
        <>
          <Field label="Units">
            <Segmented
              options={[
                { value: "kg" as Units, label: "Kilograms" },
                { value: "lb" as Units, label: "Pounds" },
              ]}
              value={units}
              onChange={switchUnits}
            />
          </Field>
          <Field label="Bar">
            <Select options={BARS[units]} value={bar} onChange={setBar} />
          </Field>
          <Field label="Target weight" hint="The total, bar included.">
            <NumberInput
              value={target}
              onChange={setTarget}
              min={bar}
              max={units === "kg" ? 500 : 1100}
              step={units === "kg" ? 0.5 : 1}
              placeholder={units === "kg" ? "100" : "225"}
              suffix={units}
            />
          </Field>
          <SubmitButton>SHOW PLATES</SubmitButton>
        </>
      }
      results={
        <ResultPanel empty="Enter the total you want on the bar to see the plates for each side.">
          {out && (
            <Reveal delay={0} className="flex flex-col h-full">
              <span className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-2">
                Each side
              </span>

              {out.plates.length ? (
                <div className="flex items-center gap-1.5 my-4 h-[120px]" aria-hidden>
                  <div className="h-3 w-10 rounded-sm bg-fg-faint" />
                  {out.plates.map((p, i) => {
                    const max = out.units === "kg" ? 25 : 45;
                    const h = 40 + (p / max) * 80;
                    return (
                      <div
                        key={i}
                        className="rounded-[4px] border border-black/30"
                        style={{
                          height: `${h}px`,
                          width: p >= (out.units === "kg" ? 10 : 25) ? "16px" : "10px",
                          background: out.units === "kg" ? KG_COLOUR[p] ?? "#888" : "#2b2b2b",
                        }}
                      />
                    );
                  })}
                </div>
              ) : (
                <p className="text-[16px] text-fg-muted my-4">Just the empty bar.</p>
              )}

              <div className="mb-auto">
                {grouped(out.plates).map(([p, n]) => (
                  <Stat key={p} label={`${p} ${out.units} plates`} value={`${n} per side`} tone="accent" />
                ))}
                <Stat label="Weight per side" value={out.perSide.toFixed(out.units === "kg" ? 2 : 1)} unit={out.units} />
                <Stat label="Total loaded" value={out.loaded} unit={out.units} />
              </div>

              {out.remainder > 0.001 ? (
                <p className="mt-5 text-[13px] leading-relaxed text-fg-muted border border-border bg-bg-elevated/40 rounded-xl p-4">
                  Standard plates cannot make that exact number. The closest you
                  can load is {out.loaded} {out.units}, {out.remainder.toFixed(2)}{" "}
                  {out.units} short. Fractional plates or collars will close the gap.
                </p>
              ) : null}

              <ToolCta>
                Dietly Fit logs every set as you lift, suggests the next weight
                to load, and shows which muscles are falling behind.
              </ToolCta>
            </Reveal>
          )}
        </ResultPanel>
      }
    />
  );
}
