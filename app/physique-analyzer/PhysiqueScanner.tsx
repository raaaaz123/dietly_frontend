"use client";

import { useRef, useState } from "react";
import { ResultPanel, ScoreRing, Segmented } from "../components/tools/fields";
import { InstallSteps } from "../components/GetApp";
import { track } from "../lib/analytics";
import type { PhysiqueResult, Sex, Subscore } from "../lib/physiqueVision";

const MAX_BYTES = 3 * 1024 * 1024;

const LABEL: Record<Subscore, string> = {
  definition: "Definition",
  leanness: "Leanness",
  symmetry: "Symmetry",
  posture: "Posture",
};

const ADVICE: Record<Subscore, string> = {
  definition: "Muscle separation is what holds the score down. More training volume on the lagging areas, and patience, moves this one.",
  leanness: "Body fat is what holds the score down. A modest calorie deficit with high protein moves this one fastest.",
  symmetry: "Balance between sides and proportions holds the score down. Single-arm and single-leg work helps even it out.",
  posture: "Posture holds the score down. Upper back work and a consistent photo stance usually lift it within weeks.",
};

/** The same bands the FAQ on this page explains. */
function tier(score: number): { name: string; note: string } {
  if (score >= 85) return { name: "Elite", note: "Rare outside years of training and a full diet." };
  if (score >= 70) return { name: "Lean and muscular", note: "Clearly trained and lean. Details decide the next points." };
  if (score >= 50) return { name: "Trained", note: "The base is there. Getting leaner shows it." };
  return { name: "Building the base", note: "The biggest gains come fastest from here." };
}

type State =
  | { phase: "idle" }
  | { phase: "working"; preview: string }
  | { phase: "done"; preview: string; overall: number; weakest: Subscore }
  | { phase: "error"; preview?: string; message: string };

/**
 * Phone photos are routinely 4 to 8 MB, over Bedrock's 3 MB limit. Shrinking
 * to 1600px on the long edge in the browser keeps every detail the model can
 * use and makes the upload quick on mobile. Formats the browser cannot decode
 * (HEIC outside Safari) fall through and are sent as they are.
 */
async function shrink(file: File): Promise<Blob> {
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    bmp.close();
    const out = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.85));
    return out && out.size < file.size ? out : file;
  } catch {
    return file;
  }
}

/**
 * Session replays (Nov 2026) showed three problems with the old layout:
 * visitors tapped the empty photo box and the "Your photo" heading (nothing
 * happened), the upload buttons sat greyed out until an 18+ checkbox was
 * ticked, and on phones the score appeared below the fold. Now the photo box
 * is the upload button, consent is stated next to the action (the server still
 * receives `adult=yes`, and the model still refuses minors), and the result
 * scrolls into view.
 */
export default function PhysiqueScanner() {
  const [state, setState] = useState<State>({ phase: "idle" });
  const [sex, setSex] = useState<Sex>("male");
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const showResult = () =>
    window.setTimeout(() => {
      const el = resultRef.current;
      if (!el) return;
      el.classList.remove("result-flash");
      void el.offsetWidth;
      el.classList.add("result-flash");
      if (window.innerWidth < 768) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);

  async function send(file: File) {
    const preview = URL.createObjectURL(file);
    setState({ phase: "working", preview });
    showResult();
    track("physique_scan_started", { sex });
    const blob = await shrink(file);
    if (blob.size > MAX_BYTES) {
      setState({ phase: "error", preview, message: "That photo is over 3 MB. Try a smaller one or a screenshot of it." });
      return;
    }
    try {
      const body = new FormData();
      body.append("image", blob, "photo.jpg");
      body.append("sex", sex);
      body.append("adult", "yes");
      const res = await fetch("/api/physique-scan", { method: "POST", body });
      const data = (await res.json()) as PhysiqueResult & { error?: string };
      if (!res.ok) {
        track("physique_scan_failed", { status: res.status });
        setState({ phase: "error", preview, message: data.error ?? "That did not work." });
        return;
      }
      if (!data.usable) {
        track("physique_scan_rejected");
        setState({ phase: "error", preview, message: data.reason });
        return;
      }
      track("physique_scan_scored", { score: data.overall, weakest: data.weakest });
      setState({ phase: "done", preview, overall: data.overall, weakest: data.weakest });
      showResult();
    } catch {
      setState({ phase: "error", preview, message: "The connection dropped before the scan finished. Try again." });
    }
  }

  const pick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) void send(file);
  };
  const busy = state.phase === "working";
  const openGallery = () => !busy && galleryRef.current?.click();
  const preview = "preview" in state ? state.preview : undefined;

  return (
    <div className="w-full max-w-[960px] mx-auto mt-10 mb-12 px-4 sm:px-6 md:px-0">
      <div className="rounded-3xl border border-border bg-bg-elevated p-4 sm:p-6 md:p-8 grid md:grid-cols-2 gap-6 md:gap-8 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] bg-[rgba(200,245,96,0.06)] rounded-full blur-[90px] pointer-events-none" />
        <input ref={cameraRef} type="file" accept="image/*" capture="user" onChange={pick} className="sr-only" aria-hidden tabIndex={-1} />
        <input
          ref={galleryRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
          onChange={pick}
          className="sr-only"
          aria-hidden
          tabIndex={-1}
        />

        <div className="flex flex-col relative">
          <p className="text-[13px] font-semibold text-fg mb-2">1. Score against</p>
          <Segmented
            options={[
              { value: "male", label: "Men" },
              { value: "female", label: "Women" },
              { value: "unspecified", label: "Not set" },
            ]}
            value={sex}
            onChange={setSex}
          />

          <p className="text-[13px] font-semibold text-fg mt-5 mb-2">2. Add an upper-body photo</p>
          <button
            type="button"
            onClick={openGallery}
            disabled={busy}
            aria-label="Choose a photo to score"
            className="group relative aspect-[4/3] md:aspect-[4/5] max-h-[260px] md:max-h-[340px] w-full rounded-2xl border-2 border-dashed border-border hover:border-[var(--signal)] bg-bg/40 overflow-hidden flex items-center justify-center transition-colors"
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="The photo you uploaded" className="w-full h-full object-cover" />
            ) : (
              <span className="flex flex-col items-center gap-3 px-6 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--signal-soft)] text-[var(--signal)] text-[24px] font-light">
                  +
                </span>
                <span className="text-[15px] font-semibold text-fg">Tap to choose a photo</span>
                <span className="text-[13px] text-fg-muted">Front on, even light, shirtless or a fitted top</span>
              </span>
            )}
            {busy ? (
              <span className="absolute inset-0 flex items-center justify-center bg-bg/60">
                <span className="w-9 h-9 border-[3px] border-border border-t-[var(--signal)] rounded-full animate-spin" />
              </span>
            ) : null}
          </button>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <button
              type="button"
              onClick={() => !busy && cameraRef.current?.click()}
              disabled={busy}
              className="py-3.5 px-2 rounded-xl bg-fg text-bg text-[14px] font-bold disabled:opacity-40 active:scale-[0.98] transition-transform"
            >
              Take photo
            </button>
            <button
              type="button"
              onClick={openGallery}
              disabled={busy}
              className="py-3.5 px-2 rounded-xl border border-border text-fg text-[14px] font-bold disabled:opacity-40 hover:border-fg/40 transition-colors"
            >
              From gallery
            </button>
          </div>

          <p className="mt-4 text-[12px] leading-relaxed text-fg-faint">
            By adding a photo you confirm you are 18 or over and it is a photo of you. It is read once by the model and never
            stored, logged or shared. An estimate, not a measurement.
          </p>
        </div>

        <div ref={resultRef} className="result-anchor rounded-2xl">
          <ResultPanel empty="Your physique score out of 100, and the one thing holding it down.">
            {state.phase === "working" ? (
              <div className="flex flex-col items-center justify-center min-h-[260px] gap-4 text-center">
                <div className="w-10 h-10 border-[3px] border-border border-t-[var(--signal)] rounded-full animate-spin" />
                <p className="text-[16px] font-semibold text-fg">Scoring your photo</p>
                <p className="text-[13px] text-fg-muted">Checking definition, leanness, symmetry and posture. About 10 seconds.</p>
              </div>
            ) : state.phase === "error" ? (
              <div className="flex flex-col items-center justify-center min-h-[260px] gap-4 text-center px-2">
                <span className="text-[28px]" aria-hidden>📸</span>
                <p className="text-[15px] text-fg">{state.message}</p>
                <button
                  type="button"
                  onClick={openGallery}
                  className="mt-1 py-3 px-6 rounded-xl bg-fg text-bg text-[14px] font-bold"
                >
                  Try another photo
                </button>
              </div>
            ) : state.phase === "done" ? (
              <div className="flex flex-col" aria-live="polite">
                <div className="flex items-center gap-5">
                  <ScoreRing value={state.overall} size={132} />
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold tracking-[1.5px] text-fg-faint uppercase">Physique score</span>
                    <p className="text-[22px] font-bold text-fg leading-tight mt-1">{tier(state.overall).name}</p>
                    <p className="text-[13px] text-fg-muted mt-1 leading-snug">{tier(state.overall).note}</p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-[rgba(200,245,96,0.25)] bg-[var(--signal-soft)] p-4">
                  <p className="text-[12px] font-bold tracking-[1px] uppercase text-[var(--signal)]">Holding you back</p>
                  <p className="text-[17px] font-bold text-fg mt-1">{LABEL[state.weakest]}</p>
                  <p className="mt-1.5 text-[14px] text-fg-muted leading-relaxed">{ADVICE[state.weakest]}</p>
                </div>

                {/* The breakdown is not in the response at all: these bars are
                    placeholders behind a blur, not hidden numbers. */}
                <div className="mt-5 rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[12px] font-bold tracking-[1px] text-fg-faint uppercase">Full breakdown</p>
                    <span className="text-[11px] font-semibold text-fg-muted">🔒 In the app</span>
                  </div>
                  <ul className="space-y-3">
                    {(["definition", "leanness", "symmetry", "posture"] as Subscore[]).map((k, i) => (
                      <li key={k}>
                        <div className="flex justify-between text-[13px] text-fg-muted mb-1">
                          <span>{LABEL[k]}</span>
                          <span className="blur-[5px] select-none" aria-hidden>00</span>
                        </div>
                        <div className="h-2 rounded-full bg-border/50 overflow-hidden">
                          <div className="h-full rounded-full bg-fg/25 blur-[2px]" style={{ width: `${[62, 48, 71, 55][i]}%` }} />
                        </div>
                      </li>
                    ))}
                    <li className="flex justify-between text-[13px] text-fg-muted pt-1">
                      <span>Body fat estimate</span>
                      <span className="blur-[5px] select-none" aria-hidden>00%</span>
                    </li>
                  </ul>
                </div>

                <InstallSteps
                  compact
                  className="mt-5"
                  placement="physique_result"
                  title="See your full breakdown"
                  body={`Get all four sub-scores, a body fat estimate and a training week built around ${LABEL[state.weakest].toLowerCase()}. Rescan weekly and watch the number move.`}
                  payoff="Do your first scan to unlock every sub-score"
                />
                <button type="button" onClick={openGallery} className="mt-4 text-[13px] text-fg-faint hover:text-fg transition-colors">
                  Score another photo
                </button>
              </div>
            ) : null}
          </ResultPanel>
        </div>
      </div>
    </div>
  );
}
