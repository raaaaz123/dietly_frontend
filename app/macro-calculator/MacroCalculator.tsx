"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "../components/Reveal";

export default function MacroCalculator() {
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [activity, setActivity] = useState<number>(1.2);
  const [goal, setGoal] = useState<"lose" | "maintain" | "gain">("lose");
  
  const [results, setResults] = useState<{
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);

  const calculateMacros = (e: React.FormEvent) => {
    e.preventDefault();
    if (!age || !weight || !height) return;

    // Mifflin-St Jeor Equation
    // Weight in kg, Height in cm, Age in years
    let bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age);
    bmr += gender === "male" ? 5 : -161;

    // TDEE
    const tdee = bmr * activity;

    // Goal adjustments
    let targetCalories = tdee;
    if (goal === "lose") targetCalories -= 500;
    if (goal === "gain") targetCalories += 500;

    // Ensure it doesn't drop too low for safety
    if (gender === "male" && targetCalories < 1500) targetCalories = 1500;
    if (gender === "female" && targetCalories < 1200) targetCalories = 1200;

    // Macro Split (Standard: 30% P, 35% C, 35% F)
    // Protein: 4 cals/g, Carbs: 4 cals/g, Fat: 9 cals/g
    const proteinCalories = targetCalories * 0.30;
    const carbsCalories = targetCalories * 0.35;
    const fatCalories = targetCalories * 0.35;

    setResults({
      calories: Math.round(targetCalories),
      protein: Math.round(proteinCalories / 4),
      carbs: Math.round(carbsCalories / 4),
      fat: Math.round(fatCalories / 9),
    });
  };

  return (
    <div className="w-full max-w-[900px] mx-auto mt-12 mb-24">
      <div className="glass-card rounded-3xl p-6 md:p-10 border border-border bg-bg-elevated/50 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/[0.05] rounded-full blur-[100px] pointer-events-none" />

        <div className="grid md:grid-cols-2 gap-12 relative z-10">
          
          {/* Input Form */}
          <div>
            <h3 className="text-[24px] font-bold text-fg mb-6 font-display italic">Your Details</h3>
            <form onSubmit={calculateMacros} className="space-y-6">
              
              {/* Gender */}
              <div>
                <label className="block text-[12px] font-bold tracking-[1px] text-fg-muted mb-2 uppercase">Gender</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={`flex-1 py-3 rounded-xl border text-[14px] font-semibold transition-all ${gender === "male" ? "border-accent bg-accent/10 text-accent" : "border-border text-fg-muted hover:border-fg/30"}`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={`flex-1 py-3 rounded-xl border text-[14px] font-semibold transition-all ${gender === "female" ? "border-accent bg-accent/10 text-accent" : "border-border text-fg-muted hover:border-fg/30"}`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Age & Height */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold tracking-[1px] text-fg-muted mb-2 uppercase">Age (yrs)</label>
                  <input 
                    type="number" 
                    required 
                    min="15" 
                    max="100"
                    value={age}
                    onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent transition-colors"
                    placeholder="e.g. 28"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold tracking-[1px] text-fg-muted mb-2 uppercase">Height (cm)</label>
                  <input 
                    type="number" 
                    required 
                    min="100" 
                    max="250"
                    value={height}
                    onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : "")}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent transition-colors"
                    placeholder="e.g. 175"
                  />
                </div>
              </div>

              {/* Weight */}
              <div>
                <label className="block text-[12px] font-bold tracking-[1px] text-fg-muted mb-2 uppercase">Weight (kg)</label>
                <input 
                  type="number" 
                  required 
                  min="40" 
                  max="300"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : "")}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent transition-colors"
                  placeholder="e.g. 70"
                />
              </div>

              {/* Activity */}
              <div>
                <label className="block text-[12px] font-bold tracking-[1px] text-fg-muted mb-2 uppercase">Activity Level</label>
                <select 
                  value={activity}
                  onChange={(e) => setActivity(Number(e.target.value))}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-fg focus:outline-none focus:border-accent transition-colors appearance-none"
                >
                  <option value={1.2}>Sedentary (office job, little exercise)</option>
                  <option value={1.375}>Lightly active (1-3 days/week)</option>
                  <option value={1.55}>Moderately active (3-5 days/week)</option>
                  <option value={1.725}>Very active (6-7 days/week)</option>
                  <option value={1.9}>Extra active (physical job & training)</option>
                </select>
              </div>

              {/* Goal */}
              <div>
                <label className="block text-[12px] font-bold tracking-[1px] text-fg-muted mb-2 uppercase">Your Goal</label>
                <div className="grid grid-cols-3 gap-3">
                  {(["lose", "maintain", "gain"] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGoal(g)}
                      className={`py-3 rounded-xl border text-[13px] font-semibold capitalize transition-all ${goal === g ? "border-accent bg-accent/10 text-accent" : "border-border text-fg-muted hover:border-fg/30"}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-4 mt-4 bg-fg text-bg text-[14px] font-bold tracking-[2px] rounded-xl hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative z-10 group-hover:text-fg transition-colors duration-500">CALCULATE MACROS</span>
              </button>
            </form>
          </div>

          {/* Results Side */}
          <div className="bg-surface rounded-2xl p-8 flex flex-col justify-center relative border border-border">
            {!results ? (
              <div className="text-center opacity-50 flex flex-col items-center justify-center h-full min-h-[300px]">
                <span className="text-[40px] mb-4">✨</span>
                <p className="text-[16px] text-fg-muted font-medium max-w-[200px]">Fill out your details to generate your custom AI macro plan.</p>
              </div>
            ) : (
              <Reveal delay={0} className="flex flex-col h-full">
                <span className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-2">Your Daily Target</span>
                <div className="flex items-end gap-2 mb-8">
                  <span className="text-[56px] font-bold font-body leading-none text-fg tracking-tight">{results.calories}</span>
                  <span className="text-[18px] text-fg-muted font-medium mb-2">kcal</span>
                </div>

                <div className="space-y-4 mb-auto">
                  {/* Protein */}
                  <div>
                    <div className="flex justify-between text-[14px] mb-1.5">
                      <span className="font-semibold text-fg">Protein</span>
                      <span className="font-bold text-fg">{results.protein}g</span>
                    </div>
                    <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full w-[30%]" />
                    </div>
                  </div>

                  {/* Carbs */}
                  <div>
                    <div className="flex justify-between text-[14px] mb-1.5">
                      <span className="font-semibold text-fg">Carbs</span>
                      <span className="font-bold text-fg">{results.carbs}g</span>
                    </div>
                    <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full w-[35%]" />
                    </div>
                  </div>

                  {/* Fat */}
                  <div>
                    <div className="flex justify-between text-[14px] mb-1.5">
                      <span className="font-semibold text-fg">Fat</span>
                      <span className="font-bold text-fg">{results.fat}g</span>
                    </div>
                    <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full w-[35%]" />
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-border">
                  <p className="text-[13px] text-fg-muted leading-relaxed mb-4">
                    Tracking <strong className="text-fg">{results.calories} calories</strong> manually is exhausting. Let Dietly&apos;s AI vision track it for you with just a photo.
                  </p>
                  <Link href="/#download" className="block w-full py-3.5 bg-accent text-accent-ink text-center text-[12px] font-bold tracking-[1.5px] rounded-xl hover:shadow-[0_0_20px_rgba(31,138,67,0.3)] transition-all">
                    START TRACKING FREE
                  </Link>
                </div>
              </Reveal>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
