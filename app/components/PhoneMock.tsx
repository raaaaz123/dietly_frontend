/**
 * The hero's phone — drawn, not screenshotted.
 *
 * A real capture would be better and this is deliberately not one. The app's
 * home screen only fills with data behind a signed-in account with a plan on
 * it, so every screenshot available today is either half skeleton or a paywall,
 * and the images the old site shipped are of the pre-pivot calorie app. A
 * marketing page arguing for a training app with pictures of a food diary is
 * the same mismatch that was wrong on the App Store listing.
 *
 * So this renders the one object the product is actually about — the Form
 * Score, its weak point, and the session that follows from it — in the app's
 * own palette, at any resolution, with no asset to go stale. Swap it for a real
 * capture the moment there's a seeded account to take one from.
 */

const SIZE = 168;
const STROKE = 13;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SCORE = 72;

export default function PhoneMock() {
  return (
    <div className="relative mx-auto w-full max-w-[300px]">
      <div className="rounded-[2.75rem] border border-border-strong bg-bg p-3">
        <div className="overflow-hidden rounded-[2.15rem] bg-bg">
          {/* Status bar. Nine-forty-one, as every Apple mock is. */}
          <div className="flex items-center justify-between px-6 pt-4 pb-1 text-[11px] font-semibold text-fg">
            <span>9:41</span>
            <div className="h-4 w-16 rounded-full bg-black" />
            <span className="tracking-tight text-fg-muted">▮▮▮</span>
          </div>

          <div className="px-5 pt-4 pb-6">
            <p className="text-[10px] font-bold tracking-[0.16em] text-fg-faint uppercase">
              Your form score
            </p>

            <div className="mt-4 flex justify-center">
              <div className="relative">
                <svg
                  width={SIZE}
                  height={SIZE}
                  viewBox={`0 0 ${SIZE} ${SIZE}`}
                  className="-rotate-90"
                  role="img"
                  aria-label={`Form Score ${SCORE} out of 100`}
                >
                  <circle
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={RADIUS}
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth={STROKE}
                  />
                  <circle
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={RADIUS}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth={STROKE}
                    strokeLinecap="round"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={CIRCUMFERENCE * (1 - SCORE / 100)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[44px] leading-none font-extrabold tracking-tight text-fg">
                    {SCORE}
                  </span>
                  <span className="mt-1 text-[11px] font-semibold text-fg-faint">
                    / 100
                  </span>
                </div>
              </div>
            </div>

            {/* The weak point. This is the line that makes the score a
                diagnosis instead of a number. */}
            <div className="mt-5 rounded-2xl border border-border bg-elevated p-3.5">
              <p className="text-[10px] font-bold tracking-[0.12em] text-fg-faint uppercase">
                Weakest area
              </p>
              <p className="mt-1 text-[15px] font-bold text-fg">
                Shoulders &amp; upper back
              </p>
              <p className="mt-0.5 text-[12px] leading-snug text-fg-muted">
                Three sessions this week are built to fix it.
              </p>
            </div>

            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-border-accent bg-mint p-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-[15px] font-black text-accent-ink">
                1
              </span>
              <div>
                <p className="text-[14px] font-bold text-fg">Today · Push</p>
                <p className="text-[12px] text-fg-muted">
                  6 movements · 38 min
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-full bg-accent py-3 text-center text-[14px] font-bold text-accent-ink">
              Start today&apos;s session
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
