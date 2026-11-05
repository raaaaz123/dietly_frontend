"use client";

import { useRef, useState } from "react";
import Reveal from "../components/Reveal";
import { ResultPanel, Segmented, ToolCta } from "../components/tools/fields";
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

export default function PhysiqueScanner() {
  const [state, setState] = useState<State>({ phase: "idle" });
  const [sex, setSex] = useState<Sex>("male");
  const [adult, setAdult] = useState(false);
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  async function send(file: File) {
    const preview = URL.createObjectURL(file);
    setState({ phase: "working", preview });
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
        setState({ phase: "error", preview, message: data.error ?? "That did not work." });
        return;
      }
      if (!data.usable) {
        setState({ phase: "error", preview, message: data.reason });
        return;
      }
      setState({ phase: "done", preview, overall: data.overall, weakest: data.weakest });
    } catch {
      setState({ phase: "error", preview, message: "The connection dropped before the scan finished. Try again." });
    }
  }

  const pick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) void send(file);
  };
  const reset = () => setState({ phase: "idle" });
  const locked = !adult || state.phase === "working";

  return (
    <div className="w-full max-w-[900px] mx-auto mt-12 mb-16 px-6 md:px-0">
      <div className="glass-card rounded-3xl border border-border p-5 sm:p-6 md:p-8 grid md:grid-cols-2 gap-6 md:gap-8">
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

        <div className="flex flex-col">
          <h2 className="text-[13px] font-bold tracking-[2px] text-fg-faint uppercase mb-5">Your photo</h2>

          <div className="aspect-[4/5] max-h-[340px] rounded-2xl border border-border bg-bg-elevated overflow-hidden flex items-center justify-center mb-5">
            {"preview" in state && state.preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={state.preview} alt="The photo you uploaded" className="w-full h-full object-cover" />
            ) : (
              <span className="text-[14px] text-fg-muted px-8 text-center">
                Upper body, front on, even light. Shirtless or a fitted top.
              </span>
            )}
          </div>

          <p id="sex-label" className="text-[13px] font-semibold text-fg mb-2">
            Score against the reference for
          </p>
          <div aria-labelledby="sex-label">
            <Segmented
              options={[
                { value: "male", label: "Men" },
                { value: "female", label: "Women" },
                { value: "unspecified", label: "Not set" },
              ]}
              value={sex}
              onChange={setSex}
            />
          </div>

          <label className="mt-4 flex items-start gap-3 text-[13px] text-fg-muted leading-snug cursor-pointer">
            <input
              type="checkbox"
              checked={adult}
              onChange={(e) => setAdult(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[var(--accent)]"
            />
            <span>I am 18 or over and this is a photo of me.</span>
          </label>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              type="button"
              onClick={() => cameraRef.current?.click()}
              disabled={locked}
              className="py-3.5 px-2 bg-fg text-bg text-[11px] sm:text-[12px] font-bold tracking-[1px] sm:tracking-[1.5px] rounded-xl disabled:opacity-40 hover:scale-[1.02] transition-transform whitespace-nowrap"
            >
              TAKE PHOTO
            </button>
            <button
              type="button"
              onClick={() => galleryRef.current?.click()}
              disabled={locked}
              className="py-3.5 px-2 border border-border text-fg text-[11px] sm:text-[12px] font-bold tracking-[1px] sm:tracking-[1.5px] rounded-xl disabled:opacity-40 hover:border-accent transition-colors whitespace-nowrap"
            >
              FROM GALLERY
            </button>
          </div>

          <p className="mt-5 text-[12px] leading-relaxed text-fg-faint">
            Your photo is read once by the model and never stored, logged or shared. No account. An estimate, not a
            measurement.
          </p>
        </div>

        <ResultPanel empty="Your physique score out of 100, and the one thing holding it down.">
          {state.phase === "working" ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] gap-4">
              <div className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin" />
              <p className="text-[14px] text-fg-muted">Scoring your photo…</p>
            </div>
          ) : state.phase === "error" ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] gap-4 text-center px-6">
              <p className="text-[15px] text-fg-muted">{state.message}</p>
              <button type="button" onClick={reset} className="text-[12px] font-bold tracking-[1.5px] text-accent">
                TRY AGAIN
              </button>
            </div>
          ) : state.phase === "done" ? (
            <Reveal delay={0} className="flex flex-col h-full">
              <span className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-2">Physique score</span>
              <div className="flex items-end gap-2 mb-5">
                <span className="text-[64px] font-bold font-body leading-none text-fg tracking-tight tabular-nums">
                  {state.overall}
                </span>
                <span className="text-[18px] text-fg-muted font-medium mb-2">/ 100</span>
              </div>

              <p className="text-[15px] text-fg leading-relaxed">
                <strong>{LABEL[state.weakest]}</strong> is the one holding you back.
              </p>
              <p className="mt-2 text-[14px] text-fg-muted leading-relaxed">{ADVICE[state.weakest]}</p>

              {/* The breakdown is not in the response at all; these rows are
                  labels, not hidden numbers. */}
              <div className="mt-6 rounded-xl border border-border p-4">
                <p className="text-[11px] font-bold tracking-[2px] text-fg-faint uppercase mb-3">In the app</p>
                <ul className="space-y-2 text-[14px] text-fg-muted">
                  {(["definition", "leanness", "symmetry", "posture"] as Subscore[]).map((k) => (
                    <li key={k} className="flex justify-between">
                      <span>{LABEL[k]}</span>
                      <span aria-hidden className="text-fg-faint">🔒</span>
                    </li>
                  ))}
                  <li className="flex justify-between">
                    <span>Body fat estimate</span>
                    <span aria-hidden className="text-fg-faint">🔒</span>
                  </li>
                </ul>
              </div>

              <ToolCta>
                Get all four sub-scores, a body fat estimate and a training week built around{" "}
                {LABEL[state.weakest].toLowerCase()} in Dietly Fit. Rescan weekly and watch the number move.
              </ToolCta>
              <button type="button" onClick={reset} className="mt-4 text-[12px] text-fg-faint hover:text-fg transition-colors">
                Score another photo
              </button>
            </Reveal>
          ) : null}
        </ResultPanel>
      </div>
    </div>
  );
}
