"use client";

import { useState } from "react";
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

/**
 * Macro calculator.
 *
 * Rebuilt on the shared calculator furniture. The old version was metric only
 * (most of the search demand for "macro calculator" is American and types
 * pounds), split every goal 30/35/35 regardless of bodyweight, and closed on a
 * "START TRACKING FREE" link to `/#download`, an anchor the homepage does not
 * have.
 *
 * Protein is now set from bodyweight (what the evidence actually supports),
 * fat gets a floor of its own, and carbohydrate takes what is left. The result
 * also splits into meals, because "macros per meal" is one of the queries this
 * page is already shown for.
 */

type Units = "imperial" | "metric";
type Sex = "male" | "female";
type Goal = "cut" | "maintain" | "bulk";
type Diet = "balanced" | "high-protein" | "low-carb" | "keto";

const ACTIVITY = [
  { value: 1.2, label: "Sedentary (desk job, little exercise)" },
  { value: 1.375, label: "Lightly active (1-3 sessions a week)" },
  { value: 1.55, label: "Moderately active (3-5 sessions a week)" },
  { value: 1.725, label: "Very active (6-7 sessions a week)" },
  { value: 1.9, label: "Extra active (physical job and training)" },
];

const GOAL_ADJUST: Record<Goal, number> = { cut: -0.2, maintain: 0, bulk: 0.1 };

/** Protein in g per kg of bodyweight, by goal. Higher in a deficit, where it protects muscle. */
const PROTEIN_G_PER_KG: Record<Goal, number> = { cut: 2.2, maintain: 1.8, bulk: 1.8 };

/** Share of calories from fat, and a carb cap for the low-carb styles. */
const DIET: Record<Diet, { fatShare: number; carbCapG?: number; proteinBoost?: number; label: string }> = {
  balanced: { fatShare: 0.3, label: "Balanced" },
  "high-protein": { fatShare: 0.25, proteinBoost: 0.2, label: "High protein" },
  "low-carb": { fatShare: 0.4, carbCapG: 100, label: "Low carb" },
  keto: { fatShare: 0.7, carbCapG: 30, label: "Keto" },
};

type Result = {
  calories: number;
  tdee: number;
  protein: number;
  carbs: number;
  fat: number;
};

export default function MacroCalculator() {
  const [units, setUnits] = useState<Units>("imperial");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [heightCm, setHeightCm] = useState<number | "">("");
  const [feet, setFeet] = useState<number | "">("");
  const [inches, setInches] = useState<number | "">("");
  const [activity, setActivity] = useState<number>(1.55);
  const [goal, setGoal] = useState<Goal>("cut");
  const [diet, setDiet] = useState<Diet>("balanced");
  const [meals, setMeals] = useState<"3" | "4" | "5">("4");
  const [result, setResult] = useState<Result | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const kg = units === "metric" ? Number(weight) : Number(weight) * 0.453592;
    const cm =
      units === "metric"
        ? Number(heightCm)
        : (Number(feet || 0) * 12 + Number(inches || 0)) * 2.54;
    if (!age || !kg || !cm) return;

    // Mifflin-St Jeor.
    const bmr = 10 * kg + 6.25 * cm - 5 * Number(age) + (sex === "male" ? 5 : -161);
    const tdee = bmr * activity;
    const floor = sex === "male" ? 1500 : 1200;
    const calories = Math.max(floor, tdee * (1 + GOAL_ADJUST[goal]));

    const d = DIET[diet];
    let protein = kg * PROTEIN_G_PER_KG[goal] * (1 + (d.proteinBoost ?? 0));
    // Never more than 40% of calories from protein, which on a small cut would
    // otherwise squeeze carbs and fat to nothing.
    protein = Math.min(protein, (calories * 0.4) / 4);
    let fat = (calories * d.fatShare) / 9;
    let carbs = (calories - protein * 4 - fat * 9) / 4;
    if (d.carbCapG !== undefined && carbs > d.carbCapG) {
      // The calories a carb cap removes go to fat, so the total still holds.
      fat += ((carbs - d.carbCapG) * 4) / 9;
      carbs = d.carbCapG;
    }
    carbs = Math.max(0, carbs);

    setResult({
      calories: Math.round(calories),
      tdee: Math.round(tdee),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat),
    });
  };

  const n = Number(meals);
  const pct = (g: number, kcalPerG: number) =>
    result ? Math.round(((g * kcalPerG) / result.calories) * 100) : 0;

  return (
    <CalculatorFrame
      onSubmit={calculate}
      formTitle="Your details"
      form={
        <>
          <Field label="Units">
            <Segmented
              value={units}
              onChange={setUnits}
              options={[
                { value: "imperial", label: "lb / ft" },
                { value: "metric", label: "kg / cm" },
              ]}
            />
          </Field>
          <Field label="Sex">
            <Segmented
              value={sex}
              onChange={setSex}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Age">
              <NumberInput value={age} onChange={setAge} min={15} max={100} placeholder="28" suffix="yrs" />
            </Field>
            <Field label="Weight">
              <NumberInput
                value={weight}
                onChange={setWeight}
                min={units === "metric" ? 35 : 77}
                max={units === "metric" ? 300 : 660}
                placeholder={units === "metric" ? "70" : "155"}
                suffix={units === "metric" ? "kg" : "lb"}
              />
            </Field>
          </div>
          {units === "metric" ? (
            <Field label="Height">
              <NumberInput value={heightCm} onChange={setHeightCm} min={120} max={230} placeholder="175" suffix="cm" />
            </Field>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <Field label="Height (feet)">
                <NumberInput value={feet} onChange={setFeet} min={4} max={7} placeholder="5" suffix="ft" />
              </Field>
              <Field label="Height (inches)">
                <NumberInput value={inches} onChange={setInches} min={0} max={11.9} required={false} placeholder="9" suffix="in" />
              </Field>
            </div>
          )}
          <Field label="Activity level">
            <Select value={activity} onChange={setActivity} options={ACTIVITY} />
          </Field>
          <Field label="Goal">
            <Segmented
              value={goal}
              onChange={setGoal}
              options={[
                { value: "cut", label: "Lose fat" },
                { value: "maintain", label: "Maintain" },
                { value: "bulk", label: "Build muscle" },
              ]}
            />
          </Field>
          <Field label="Diet style">
            <Segmented
              value={diet}
              onChange={setDiet}
              columns={2}
              options={(Object.keys(DIET) as Diet[]).map((k) => ({ value: k, label: DIET[k].label }))}
            />
          </Field>
          <Field label="Meals a day">
            <Segmented
              value={meals}
              onChange={setMeals}
              options={[
                { value: "3", label: "3" },
                { value: "4", label: "4" },
                { value: "5", label: "5" },
              ]}
            />
          </Field>
          <SubmitButton>CALCULATE MACROS</SubmitButton>
        </>
      }
      results={
        <ResultPanel empty="Enter your details to get calories and macros for your goal.">
          {result ? (
            <div aria-live="polite">
              <span className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-2 block">
                Your daily target
              </span>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-[56px] font-bold font-body leading-none text-fg tracking-tight tabular-nums">
                  {result.calories.toLocaleString()}
                </span>
                <span className="text-[18px] text-fg-muted font-medium mb-2">kcal</span>
              </div>
              <Stat label={`Protein (${pct(result.protein, 4)}%)`} value={result.protein} unit="g" tone="accent" />
              <Stat label={`Carbs (${pct(result.carbs, 4)}%)`} value={result.carbs} unit="g" />
              <Stat label={`Fat (${pct(result.fat, 9)}%)`} value={result.fat} unit="g" />
              <Stat label="Maintenance (TDEE)" value={result.tdee.toLocaleString()} unit="kcal" />

              <p className="mt-6 text-[11px] font-bold tracking-[2px] text-fg-faint uppercase">
                Per meal, {n} meals a day
              </p>
              <Stat label="Calories" value={Math.round(result.calories / n)} unit="kcal" />
              <Stat label="Protein" value={Math.round(result.protein / n)} unit="g" />
              <Stat label="Carbs" value={Math.round(result.carbs / n)} unit="g" />
              <Stat label="Fat" value={Math.round(result.fat / n)} unit="g" />

              <ToolCta>
                Dietly Fit sets these targets for you, logs a meal from a photo or a sentence, and builds the training week around them.
              </ToolCta>
            </div>
          ) : null}
        </ResultPanel>
      }
    />
  );
}
