import Image from "next/image";
import { CheckIcon, DropIcon, FlameIcon, MicIcon, SparkIcon } from "./Icons";

/* ─────────────────────────────────────────────
   Phone frame — light UI inside an ink bezel
   ───────────────────────────────────────────── */
export function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full rounded-[38px] bg-fg p-[7px] shadow-[0_32px_70px_-24px_rgba(14,26,18,0.45)] ${className}`}
    >
      <div className="relative overflow-hidden rounded-[31px] bg-white">
        {/* status bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          <span className="text-[10px] font-bold text-fg">9:41</span>
          <span className="flex items-center gap-1">
            <span className="h-[7px] w-[7px] rounded-full bg-fg/80" />
            <span className="h-[7px] w-[11px] rounded-[2px] bg-fg/80" />
          </span>
        </div>
        {children}
        {/* home indicator */}
        <div className="flex justify-center py-2.5">
          <span className="h-[3px] w-[74px] rounded-full bg-fg/15" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Screen 1 — snap a meal, get macros
   ───────────────────────────────────────────── */
export function ScanScreen() {
  return (
    <PhoneFrame>
      <div className="px-3.5 pb-1">
        <div className="relative aspect-[4/3.4] w-full overflow-hidden rounded-2xl">
          <Image
            src="/images/feature_food.png"
            alt="Poke bowl being scanned by the Dietly camera"
            fill
            sizes="(max-width: 768px) 60vw, 300px"
            className="object-cover"
          />
          {/* scan corners */}
          <span className="absolute left-3 top-3 h-5 w-5 rounded-tl-md border-l-2 border-t-2 border-white/90" />
          <span className="absolute right-3 top-3 h-5 w-5 rounded-tr-md border-r-2 border-t-2 border-white/90" />
          <span className="absolute left-3 bottom-3 h-5 w-5 rounded-bl-md border-l-2 border-b-2 border-white/90" />
          <span className="absolute right-3 bottom-3 h-5 w-5 rounded-br-md border-r-2 border-b-2 border-white/90" />
          <span className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold tracking-wide text-accent-deep shadow-sm">
            ● DETECTING
          </span>
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          <span className="flex items-center gap-1 rounded-full bg-accent-soft px-2 py-1 text-[9.5px] font-bold text-accent-deep">
            <CheckIcon size={10} /> Salmon poke
          </span>
          <span className="rounded-full bg-surface px-2 py-1 text-[9.5px] font-semibold text-fg-muted">
            Avocado
          </span>
          <span className="rounded-full bg-surface px-2 py-1 text-[9.5px] font-semibold text-fg-muted">
            Edamame
          </span>
        </div>

        <div className="mt-3 rounded-2xl border border-border bg-bg p-3.5">
          <div className="flex items-baseline justify-between">
            <p className="text-[12.5px] font-bold text-fg">Salmon Poke Bowl</p>
            <p className="font-mono text-[11px] text-fg-faint">1 serving</p>
          </div>
          <p className="mt-2.5 text-[26px] font-extrabold leading-none tracking-[-0.03em] text-fg">
            564
            <span className="ml-1 text-[11px] font-bold text-fg-faint">kcal</span>
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { k: "Protein", v: "34g", w: "78%" },
              { k: "Carbs", v: "52g", w: "62%" },
              { k: "Fat", v: "19g", w: "40%" },
            ].map((m) => (
              <div key={m.k}>
                <p className="text-[9px] font-bold uppercase tracking-wide text-fg-faint">
                  {m.k}
                </p>
                <p className="text-[12px] font-bold text-fg">{m.v}</p>
                <span className="mt-1 block h-[3px] w-full rounded-full bg-green-100">
                  <span
                    className="block h-full rounded-full bg-accent"
                    style={{ width: m.w }}
                  />
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3.5 flex gap-2">
            <span className="flex-1 rounded-xl bg-accent py-2 text-center text-[11px] font-bold text-white">
              Log meal
            </span>
            <span className="flex items-center gap-1 rounded-xl border border-border-strong px-3 py-2 text-[11px] font-bold text-fg-muted">
              <SparkIcon size={12} /> Fix
            </span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ─────────────────────────────────────────────
   Screen 2 — today's summary
   ───────────────────────────────────────────── */
export function TodayScreen() {
  const pct = 0.68;
  const r = 46;
  const circ = 2 * Math.PI * r;

  return (
    <PhoneFrame>
      <div className="px-4 pb-2">
        <p className="text-[11px] font-semibold text-fg-faint">Good morning</p>
        <p className="text-[16px] font-extrabold tracking-[-0.03em] text-fg">
          Today
        </p>

        <div className="mt-3 flex items-center gap-4 rounded-2xl border border-border bg-bg p-3.5">
          <div className="relative h-[112px] w-[112px] shrink-0">
            <svg viewBox="0 0 110 110" className="h-full w-full -rotate-90">
              <circle
                cx="55"
                cy="55"
                r={r}
                fill="none"
                stroke="var(--green-100)"
                strokeWidth="9"
              />
              <circle
                cx="55"
                cy="55"
                r={r}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={`${circ * pct} ${circ}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-[21px] font-extrabold leading-none tracking-[-0.04em] text-fg">
                1,412
              </p>
              <p className="text-[9px] font-bold text-fg-faint">of 2,080 kcal</p>
            </div>
          </div>
          <div className="min-w-0 flex-1 space-y-2.5">
            {[
              { k: "Protein", v: "112 / 150g", w: "74%" },
              { k: "Carbs", v: "148 / 210g", w: "70%" },
              { k: "Fat", v: "44 / 68g", w: "64%" },
            ].map((m) => (
              <div key={m.k}>
                <div className="flex items-baseline justify-between">
                  <p className="text-[10px] font-bold text-fg">{m.k}</p>
                  <p className="font-mono text-[9px] text-fg-faint">{m.v}</p>
                </div>
                <span className="mt-1 block h-[5px] w-full rounded-full bg-green-100">
                  <span
                    className="block h-full rounded-full bg-accent"
                    style={{ width: m.w }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          <div className="rounded-2xl border border-border bg-bg p-3">
            <span className="flex items-center gap-1.5 text-accent">
              <DropIcon size={13} />
              <span className="text-[9.5px] font-bold uppercase tracking-wide text-fg-faint">
                Water
              </span>
            </span>
            <p className="mt-1.5 text-[15px] font-extrabold text-fg">
              1.75<span className="text-[10px] font-bold text-fg-faint">/3L</span>
            </p>
            <div className="mt-2 flex gap-1">
              {[1, 1, 1, 1, 0, 0].map((f, i) => (
                <span
                  key={i}
                  className={`h-4 flex-1 rounded-[3px] ${
                    f ? "bg-accent" : "bg-green-100"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-bg p-3">
            <span className="flex items-center gap-1.5 text-accent">
              <FlameIcon size={13} />
              <span className="text-[9.5px] font-bold uppercase tracking-wide text-fg-faint">
                Streak
              </span>
            </span>
            <p className="mt-1.5 text-[15px] font-extrabold text-fg">
              14<span className="text-[10px] font-bold text-fg-faint"> days</span>
            </p>
            <p className="mt-2 text-[9.5px] font-semibold text-accent-deep">
              Level 6 · 1,240 XP
            </p>
          </div>
        </div>

        <div className="mt-2.5 flex items-center gap-2.5 rounded-2xl border border-border-accent bg-green-50 p-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white">
            <MicIcon size={13} />
          </span>
          <p className="text-[10.5px] font-semibold leading-snug text-accent-deep">
            &ldquo;Add 30g whey and a banana&rdquo;
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ─────────────────────────────────────────────
   Screen 3 — Rexa coach chat
   ───────────────────────────────────────────── */
export function CoachScreen() {
  return (
    <PhoneFrame>
      <div className="px-4 pb-2">
        <div className="flex items-center gap-2.5 border-b border-border pb-3">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white">
            <SparkIcon size={15} />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-400" />
          </span>
          <span>
            <p className="text-[13px] font-extrabold leading-tight text-fg">Rexa</p>
            <p className="text-[9.5px] font-semibold text-accent-deep">
              Your AI coach · online
            </p>
          </span>
        </div>

        <div className="space-y-2.5 pt-3">
          <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-surface px-3 py-2">
            <p className="text-[11px] leading-snug text-fg">
              I trained legs and I&apos;m starving. What should dinner be?
            </p>
          </div>

          <div className="w-fit max-w-[88%] rounded-2xl rounded-bl-md bg-green-50 border border-border-accent px-3 py-2.5">
            <p className="text-[11px] leading-snug text-fg">
              You&apos;re 38g of protein short today and you burned 620 kcal. Go
              with 200g grilled salmon, jasmine rice and greens — that lands you
              right on target.
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-white px-2 py-0.5 text-[8.5px] font-bold text-accent-deep border border-border-accent">
                get_daily_summary
              </span>
              <span className="rounded-full bg-white px-2 py-0.5 text-[8.5px] font-bold text-accent-deep border border-border-accent">
                get_workouts
              </span>
            </div>
          </div>

          <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-surface px-3 py-2">
            <p className="text-[11px] leading-snug text-fg">
              Log it and remind me at 8.
            </p>
          </div>

          <div className="w-fit max-w-[70%] rounded-2xl rounded-bl-md bg-green-50 border border-border-accent px-3 py-2.5">
            <p className="text-[11px] leading-snug text-fg">
              Logged. I&apos;ll nudge you at 8:00 pm. ✓
            </p>
          </div>
        </div>

        <div className="mt-3.5 flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-2">
          <p className="flex-1 text-[10.5px] text-fg-faint">Message Rexa…</p>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white">
            <MicIcon size={12} />
          </span>
        </div>
      </div>
    </PhoneFrame>
  );
}
