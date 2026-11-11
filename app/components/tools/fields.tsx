"use client";

import { InstallSteps } from "../GetApp";
import { track } from "../../lib/analytics";
import { ReactNode, createContext, useContext, useId, useRef } from "react";

/**
 * The id of the control inside the current `Field`, so its `<label>` can name
 * it. Without this every calculator rendered labels that pointed at nothing:
 * Lighthouse flagged "Select elements do not have associated label elements",
 * and a screen reader announced each input as just "edit text".
 */
const FieldId = createContext<string | undefined>(undefined);

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
  const id = useId();
  return (
    <div>
      <label id={`${id}-label`} htmlFor={id} className="block text-[12px] font-bold tracking-[1px] text-fg-muted mb-2 uppercase">
        {label}
      </label>
      <FieldId.Provider value={id}>{children}</FieldId.Provider>
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
  const id = useContext(FieldId);
  return (
    <div className="relative">
      <input
        id={id}
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
  // A row of buttons is not labelable, so the Field's label names the group.
  const id = useContext(FieldId);
  return (
    <div
      role="group"
      aria-labelledby={id ? `${id}-label` : undefined}
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
  const id = useContext(FieldId);
  return (
    <select
      id={id}
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
  const filled = children !== null && children !== undefined && children !== false;
  return (
    <div
      data-result={filled ? "filled" : "empty"}
      className={`result-anchor rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-center relative border ${
        filled ? "bg-surface border-[rgba(200,245,96,0.28)]" : "bg-surface/60 border-dashed border-border"
      }`}
    >
      {filled ? (
        children
      ) : (
        <div className="text-center flex flex-col items-center justify-center h-full min-h-[220px] md:min-h-[300px]">
          <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden className="mb-4 opacity-70">
            <circle cx="32" cy="32" r="26" fill="none" stroke="var(--border)" strokeWidth="6" />
            <circle cx="32" cy="32" r="26" fill="none" stroke="var(--signal)" strokeWidth="6" strokeLinecap="round"
              strokeDasharray="163" strokeDashoffset="110" transform="rotate(-90 32 32)" />
          </svg>
          <p className="text-[15px] text-fg-muted font-medium max-w-[240px] leading-relaxed">{empty}</p>
        </div>
      )}
    </div>
  );
}

/**
 * Brings a fresh result into view. On phones the result panel sits under the
 * form, so before this a visitor tapped "Calculate", saw nothing change, and
 * often left (seen in session replays). Desktop shows both columns already.
 */
export function revealResult(root: HTMLElement | null) {
  if (!root) return;
  window.setTimeout(() => {
    const panel = root.querySelector<HTMLElement>('[data-result="filled"]');
    if (!panel) return;
    track("tool_result_shown");
    panel.classList.remove("result-flash");
    void panel.offsetWidth;
    panel.classList.add("result-flash");
    if (window.innerWidth < 768) panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 60);
}

/** The shell: form on the left, results on the right (below on phones). */
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
  const root = useRef<HTMLDivElement>(null);
  return (
    <div ref={root} className="w-full max-w-[960px] mx-auto mt-10 mb-12 px-4 sm:px-6 md:px-0">
      <div className="rounded-3xl p-4 sm:p-6 md:p-10 border border-border bg-bg-elevated relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] bg-[rgba(200,245,96,0.06)] rounded-full blur-[90px] pointer-events-none" />
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
          <div>
            <h2 className="text-[20px] md:text-[22px] font-bold text-fg mb-5 tracking-tight">
              {formTitle}
            </h2>
            <form
              onSubmit={(e) => {
                onSubmit(e);
                revealResult(root.current);
              }}
              className="space-y-5"
            >
              {form}
            </form>
          </div>
          <div className="md:sticky md:top-24 self-start w-full">{results}</div>
        </div>
      </div>
    </div>
  );
}

/** A horizontal stacked bar for a macro split. */
export function MacroBar({ protein, carbs, fat }: { protein: number; carbs: number; fat: number }) {
  const kcal = protein * 4 + carbs * 4 + fat * 9 || 1;
  const parts = [
    { k: "Protein", g: protein, pct: (protein * 4) / kcal, c: "var(--data-protein)" },
    { k: "Carbs", g: carbs, pct: (carbs * 4) / kcal, c: "var(--data-carbs)" },
    { k: "Fat", g: fat, pct: (fat * 9) / kcal, c: "var(--data-fat)" },
  ];
  return (
    <div className="my-5">
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-border/40" role="img"
        aria-label={parts.map((p) => `${p.k} ${Math.round(p.pct * 100)}%`).join(", ")}>
        {parts.map((p) => (
          <div key={p.k} style={{ width: `${p.pct * 100}%`, background: p.c }} className="h-full first:rounded-l-full last:rounded-r-full" />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {parts.map((p) => (
          <div key={p.k} className="rounded-xl border border-border bg-bg/40 px-3 py-3">
            <span className="flex items-center gap-1.5 text-[12px] text-fg-muted">
              <span className="h-2 w-2 rounded-full" style={{ background: p.c }} />
              {p.k}
            </span>
            <span className="mt-1 block text-[22px] font-bold text-fg tabular-nums leading-none">
              {p.g}
              <span className="text-[13px] font-medium text-fg-muted ml-0.5">g</span>
            </span>
            <span className="mt-1 block text-[11px] text-fg-faint tabular-nums">{Math.round(p.pct * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** A circular 0-100 gauge. */
export function ScoreRing({ value, max = 100, size = 148, label }: { value: number; max?: number; size?: number; label?: string }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value / max));
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--border)" strokeWidth="10" />
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--signal)" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct)} transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.2,.8,.2,1)" }} />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[44px] font-bold text-fg leading-none tabular-nums">{value}</span>
        <span className="text-[12px] text-fg-muted mt-1">{label ?? `out of ${max}`}</span>
      </span>
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

/** The install step-by-step that closes every results panel. */
export function ToolCta({ children, payoff = "Get your plan built around this number" }: { children: ReactNode; payoff?: string }) {
  return (
    <div className="mt-7">
      <InstallSteps
        compact
        placement="tool_result_panel"
        title="Turn this into a plan"
        body={children}
        payoff={payoff}
      />
    </div>
  );
}
