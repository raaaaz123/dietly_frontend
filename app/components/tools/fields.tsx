"use client";

import Link from "next/link";
import { ReactNode } from "react";

/**
 * The form furniture every calculator shares.
 *
 * The first two calculators on the site each carried their own copy of this
 * markup — the same segmented control, the same input classes, the same results
 * panel, diverging slightly. Six more pages of that would be a redesign nobody
 * can land. The *maths* and the *prose* stay bespoke per tool, because that is
 * what makes a page worth ranking; only the chrome is shared.
 */

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-[12px] font-bold tracking-[1px] text-fg-muted mb-2 uppercase">
        {label}
      </label>
      {children}
      {hint ? <p className="mt-1.5 text-[12px] text-fg-faint">{hint}</p> : null}
    </div>
  );
}

const INPUT =
  "w-full bg-surface border border-border rounded-xl px-4 py-3 text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent transition-colors";

export function NumberInput({
  value,
  onChange,
  placeholder,
  min,
  max,
  step,
  required = true,
  suffix,
}: {
  value: number | "";
  onChange: (v: number | "") => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  suffix?: string;
}) {
  return (
    <div className="relative">
      <input
        type="number"
        inputMode="decimal"
        required={required}
        min={min}
        max={max}
        step={step ?? "any"}
        value={value}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : "")}
        className={`${INPUT} ${suffix ? "pr-14" : ""}`}
        placeholder={placeholder}
      />
      {suffix ? (
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-semibold text-fg-faint">
          {suffix}
        </span>
      ) : null}
    </div>
  );
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  columns,
}: {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  columns?: number;
}) {
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${columns ?? options.length}, minmax(0, 1fr))` }}
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          // `aria-pressed` rather than a plain button: the selected state here
          // is carried entirely by colour, which a screen reader cannot see.
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`py-3 px-2 rounded-xl border text-[13px] font-semibold transition-all ${
            value === o.value
              ? "border-accent bg-accent/10 text-accent"
              : "border-border text-fg-muted hover:border-fg/30"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Select<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => {
        const raw = e.target.value;
        onChange((typeof value === "number" ? Number(raw) : raw) as T);
      }}
      className={`${INPUT} appearance-none`}
    >
      {options.map((o) => (
        <option key={String(o.value)} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="w-full py-4 mt-4 bg-fg text-bg text-[14px] font-bold tracking-[2px] rounded-xl hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
      <span className="relative z-10 group-hover:text-fg transition-colors duration-500">
        {children}
      </span>
    </button>
  );
}

/** The empty state and the frame every results panel sits in. */
export function ResultPanel({
  empty,
  children,
}: {
  empty: string;
  children: ReactNode | null;
}) {
  return (
    <div className="bg-surface rounded-2xl p-8 flex flex-col justify-center relative border border-border">
      {children ?? (
        <div className="text-center opacity-50 flex flex-col items-center justify-center h-full min-h-[300px]">
          <span className="text-[40px] mb-4">✨</span>
          <p className="text-[16px] text-fg-muted font-medium max-w-[220px]">{empty}</p>
        </div>
      )}
    </div>
  );
}

/** The shell: form on the left, results on the right, glass card around both. */
export function CalculatorFrame({
  onSubmit,
  formTitle,
  form,
  results,
}: {
  onSubmit: (e: React.FormEvent) => void;
  formTitle: string;
  form: ReactNode;
  results: ReactNode;
}) {
  return (
    <div className="w-full max-w-[900px] mx-auto mt-12 mb-16 px-6 md:px-0">
      <div className="glass-card rounded-3xl p-6 md:p-10 border border-border bg-bg-elevated/50 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/[0.05] rounded-full blur-[100px] pointer-events-none" />
        <div className="grid md:grid-cols-2 gap-12 relative z-10">
          <div>
            <h2 className="text-[24px] font-bold text-fg mb-6 font-display italic">
              {formTitle}
            </h2>
            <form onSubmit={onSubmit} className="space-y-6">
              {form}
            </form>
          </div>
          {results}
        </div>
      </div>
    </div>
  );
}

/** A labelled number in a results panel. */
export function Stat({
  label,
  value,
  unit,
  tone = "default",
}: {
  label: string;
  value: string | number;
  unit?: string;
  tone?: "default" | "accent";
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5 border-b border-border last:border-0">
      <span className="text-[14px] text-fg-muted">{label}</span>
      <span
        className={`text-[16px] font-bold tabular-nums ${
          tone === "accent" ? "text-accent" : "text-fg"
        }`}
      >
        {value}
        {unit ? <span className="text-[13px] font-medium text-fg-muted ml-1">{unit}</span> : null}
      </span>
    </div>
  );
}

/** The store CTA that closes every results panel. */
export function ToolCta({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 pt-6 border-t border-border">
      <p className="text-[13px] text-fg-muted leading-relaxed mb-4">{children}</p>
      <Link
        href="/#download"
        className="block w-full py-3.5 bg-accent text-accent-ink text-center text-[12px] font-bold tracking-[1.5px] rounded-xl hover:shadow-[0_0_20px_rgba(31,138,67,0.3)] transition-all"
      >
        GET DIETLY FREE
      </Link>
    </div>
  );
}
