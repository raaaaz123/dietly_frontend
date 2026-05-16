"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "../components/Reveal";

export default function BodyFatCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState<number | "">("");
  const [neck, setNeck] = useState<number | "">("");
  const [waist, setWaist] = useState<number | "">("");
  const [hip, setHip] = useState<number | "">("");
  
  const [results, setResults] = useState<{
    bodyFat: number;
    category: string;
  } | null>(null);

  const calculateBodyFat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!height || !neck || !waist) return;
    if (gender === "female" && !hip) return;

    let bodyFat = 0;
    
    // US Navy Method (measurements in cm)
    if (gender === "male") {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(Number(waist) - Number(neck)) + 0.15456 * Math.log10(Number(height))) - 450;
    } else {
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(Number(waist) + Number(hip) - Number(neck)) + 0.22100 * Math.log10(Number(height))) - 450;
    }

    // Safety checks for mathematically invalid logs or extreme outliers
    if (isNaN(bodyFat) || bodyFat <= 0 || bodyFat > 70) {
      alert("Please check your measurements. The numbers provided do not compute a realistic body fat percentage.");
      return;
    }

    let category = "Average";
    if (gender === "male") {
        if (bodyFat < 6) category = "Essential Fat";
        else if (bodyFat < 14) category = "Athlete";
        else if (bodyFat < 18) category = "Fitness";
        else if (bodyFat < 25) category = "Average";
        else category = "High Body Fat";
    } else {
        if (bodyFat < 14) category = "Essential Fat";
        else if (bodyFat < 21) category = "Athlete";
        else if (bodyFat < 25) category = "Fitness";
        else if (bodyFat < 32) category = "Average";
        else category = "High Body Fat";
    }

    setResults({
      bodyFat: Number(bodyFat.toFixed(1)),
      category
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
            <h3 className="text-[24px] font-bold text-fg mb-6 font-display italic">Your Measurements</h3>
            <form onSubmit={calculateBodyFat} className="space-y-6">
              
              {/* Gender */}
              <div>
                <label className="block text-[12px] font-bold tracking-[1px] text-fg-muted mb-2 uppercase">Gender</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => { setGender("male"); setResults(null); }}
                    className={`flex-1 py-3 rounded-xl border text-[14px] font-semibold transition-all ${gender === "male" ? "border-accent bg-accent/10 text-accent" : "border-border text-fg-muted hover:border-fg/30"}`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => { setGender("female"); setResults(null); }}
                    className={`flex-1 py-3 rounded-xl border text-[14px] font-semibold transition-all ${gender === "female" ? "border-accent bg-accent/10 text-accent" : "border-border text-fg-muted hover:border-fg/30"}`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Height & Neck */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold tracking-[1px] text-fg-muted mb-2 uppercase">Height (cm)</label>
                  <input 
                    type="number" 
                    required 
                    min="100" 
                    max="250"
                    step="0.1"
                    value={height}
                    onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : "")}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent transition-colors"
                    placeholder="e.g. 175"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold tracking-[1px] text-fg-muted mb-2 uppercase">Neck (cm)</label>
                  <input 
                    type="number" 
                    required 
                    min="20" 
                    max="80"
                    step="0.1"
                    value={neck}
                    onChange={(e) => setNeck(e.target.value ? Number(e.target.value) : "")}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent transition-colors"
                    placeholder="e.g. 38"
                  />
                </div>
              </div>

              {/* Waist & Hip */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold tracking-[1px] text-fg-muted mb-2 uppercase">Waist (cm)</label>
                  <input 
                    type="number" 
                    required 
                    min="40" 
                    max="200"
                    step="0.1"
                    value={waist}
                    onChange={(e) => setWaist(e.target.value ? Number(e.target.value) : "")}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent transition-colors"
                    placeholder="e.g. 85"
                  />
                </div>
                {gender === "female" && (
                  <div>
                    <label className="block text-[12px] font-bold tracking-[1px] text-fg-muted mb-2 uppercase">Hip (cm)</label>
                    <input 
                      type="number" 
                      required 
                      min="40" 
                      max="200"
                      step="0.1"
                      value={hip}
                      onChange={(e) => setHip(e.target.value ? Number(e.target.value) : "")}
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent transition-colors"
                      placeholder="e.g. 95"
                    />
                  </div>
                )}
              </div>

              <button 
                type="submit"
                className="w-full py-4 mt-4 bg-fg text-bg text-[14px] font-bold tracking-[2px] rounded-xl hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative z-10 group-hover:text-fg transition-colors duration-500">CALCULATE BODY FAT %</span>
              </button>
            </form>
          </div>

          {/* Results Side */}
          <div className="bg-surface rounded-2xl p-8 flex flex-col justify-center relative border border-border">
            {!results ? (
              <div className="text-center opacity-50 flex flex-col items-center justify-center h-full min-h-[300px]">
                <span className="text-[40px] mb-4">⚖️</span>
                <p className="text-[16px] text-fg-muted font-medium max-w-[200px]">Enter your measurements to determine your body fat percentage.</p>
              </div>
            ) : (
              <Reveal delay={0} className="flex flex-col h-full">
                <span className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-2">Estimated Result</span>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-[64px] font-bold font-body leading-none text-fg tracking-tight">{results.bodyFat}</span>
                  <span className="text-[24px] text-fg-muted font-medium mb-2">%</span>
                </div>
                
                <div className="inline-flex items-center gap-2 mb-8 mt-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse-ring" />
                    <span className="text-[14px] font-bold text-fg tracking-[1px] uppercase">{results.category} Category</span>
                </div>

                <div className="mt-auto pt-8 border-t border-border">
                  <p className="text-[13px] text-fg-muted leading-relaxed mb-4">
                    Knowing your body fat is just the baseline. Lowering it requires precise nutrition tracking. Let Dietly&apos;s AI log your meals automatically from a single photo.
                  </p>
                  <Link href="/#download" className="block w-full py-3.5 bg-accent text-accent-ink text-center text-[12px] font-bold tracking-[1.5px] rounded-xl hover:shadow-[0_0_20px_rgba(31,138,67,0.3)] transition-all">
                    START LOSING FAT FREE
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
