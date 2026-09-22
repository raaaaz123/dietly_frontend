"use client";

import { useRef, useState } from "react";
import Reveal from "../components/Reveal";
import { ResultPanel, Stat, ToolCta } from "../components/tools/fields";
import type { MealResult } from "../lib/foodVision";

/** Bedrock's own limit for this model. Enforced here so the user learns the
 *  file is too big before spending a slow mobile upload discovering it. */
const MAX_BYTES = 3 * 1024 * 1024;

type State =
  | { phase: "idle" }
  | { phase: "working"; preview: string }
  | { phase: "done"; preview: string; result: MealResult }
  | { phase: "error"; preview?: string; message: string };

export default function FoodScanner() {
  const [state, setState] = useState<State>({ phase: "idle" });
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  async function send(file: File) {
    if (file.size > MAX_BYTES) {
      setState({
        phase: "error",
        message: "That photo is over 3 MB. Most phones can shrink it, or try another shot.",
      });
      return;
    }

    const preview = URL.createObjectURL(file);
    setState({ phase: "working", preview });

    try {
      const body = new FormData();
      body.append("image", file);
      const res = await fetch("/api/food-scan", { method: "POST", body });
      const data = await res.json();

      if (!res.ok) {
        setState({ phase: "error", preview, message: data?.error ?? "That did not work." });
        return;
      }
      if (!data.items?.length) {
        setState({
          phase: "error",
          preview,
          message:
            data.notes === "not a food image"
              ? "That does not look like food. Try a photo of a meal."
              : "Nothing recognisable came back. Try a clearer photo, taken from above.",
        });
        return;
      }
      setState({ phase: "done", preview, result: data as MealResult });
    } catch {
      setState({
        phase: "error",
        preview,
        message: "The connection dropped before the scan finished. Try again.",
      });
    }
  }

  const pick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Reset the input so picking the same file twice still fires a change.
    e.target.value = "";
    if (file) void send(file);
  };

  const reset = () => setState({ phase: "idle" });

  return (
    // Same outer container as `CalculatorFrame` in components/tools/fields.tsx.
    // Without it the widget rendered bare: `ToolPage` wraps the widget slot in a
    // `Reveal` and nothing else, while every sibling section carries its own
    // `max-w-* mx-auto px-6`. So this card stretched the full 1910px on a
    // desktop and touched both screen edges on a phone, with no gutter at all.
    <div className="w-full max-w-[900px] mx-auto mt-12 mb-16 px-6 md:px-0">
      <div className="glass-card rounded-3xl border border-border p-5 sm:p-6 md:p-8 grid md:grid-cols-2 gap-6 md:gap-8">
      {/* Hidden inputs. `capture` opens the camera directly on a phone; the
          second input deliberately omits it so it opens the photo library —
          the two entry points people actually expect. On desktop both fall
          back to a file picker, which is the correct behaviour there. */}
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={pick}
        className="sr-only"
        aria-hidden
        tabIndex={-1}
      />
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
        <h2 className="text-[13px] font-bold tracking-[2px] text-fg-faint uppercase mb-5">
          Your meal
        </h2>

        <div className="aspect-[4/3] rounded-2xl border border-border bg-bg-elevated overflow-hidden flex items-center justify-center mb-5">
          {"preview" in state && state.preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={state.preview}
              alt="The meal you uploaded"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-[14px] text-fg-muted px-8 text-center">
              Take a photo, or pick one from your gallery.
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => cameraRef.current?.click()}
            disabled={state.phase === "working"}
            className="py-3.5 px-2 bg-fg text-bg text-[11px] sm:text-[12px] font-bold tracking-[1px] sm:tracking-[1.5px] rounded-xl disabled:opacity-40 hover:scale-[1.02] transition-transform whitespace-nowrap"
          >
            TAKE PHOTO
          </button>
          <button
            type="button"
            onClick={() => galleryRef.current?.click()}
            disabled={state.phase === "working"}
            className="py-3.5 px-2 border border-border text-fg text-[11px] sm:text-[12px] font-bold tracking-[1px] sm:tracking-[1.5px] rounded-xl disabled:opacity-40 hover:border-accent transition-colors whitespace-nowrap"
          >
            FROM GALLERY
          </button>
        </div>

        {state.phase !== "idle" && (
          <button
            type="button"
            onClick={reset}
            className="mt-3 text-[12px] text-fg-faint hover:text-fg transition-colors"
          >
            Start over
          </button>
        )}

        <p className="mt-5 text-[12px] leading-relaxed text-fg-faint">
          Your photo is sent to the model that reads it and is not stored by us.
          Estimates only — see the limits below.
        </p>
      </div>

      <ResultPanel empty="Your calories, protein, carbs and fat will appear here.">
        {state.phase === "working" ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[300px] gap-4">
            <div className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin" />
            <p className="text-[14px] text-fg-muted">Reading your plate…</p>
          </div>
        ) : state.phase === "error" ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[300px] gap-4 text-center px-6">
            <p className="text-[15px] text-fg-muted">{state.message}</p>
            <button
              type="button"
              onClick={reset}
              className="text-[12px] font-bold tracking-[1.5px] text-accent"
            >
              TRY AGAIN
            </button>
          </div>
        ) : state.phase === "done" ? (
          <Reveal delay={0} className="flex flex-col h-full">
            <span className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-2">
              Estimated total
            </span>
            <div className="flex items-end gap-2 mb-7">
              <span className="text-[52px] font-bold font-body leading-none text-fg tracking-tight tabular-nums">
                {Math.round(state.result.totals.calories)}
              </span>
              <span className="text-[18px] text-fg-muted font-medium mb-2">kcal</span>
            </div>

            <div className="mb-6">
              <Stat label="Protein" value={Math.round(state.result.totals.protein_g)} unit="g" tone="accent" />
              <Stat label="Carbs" value={Math.round(state.result.totals.carbs_g)} unit="g" />
              <Stat label="Fat" value={Math.round(state.result.totals.fat_g)} unit="g" />
              {state.result.totals.fiber_g > 0 && (
                <Stat label="Fibre" value={Math.round(state.result.totals.fiber_g)} unit="g" />
              )}
            </div>

            <div className="mb-auto">
              <h3 className="text-[11px] font-bold tracking-[2px] text-fg-faint uppercase mb-3">
                What it found
              </h3>
              <ul className="space-y-2.5">
                {state.result.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline justify-between gap-3 text-[14px]"
                  >
                    <span className="text-fg-muted min-w-0 break-words">
                      {item.name}
                      <span className="text-fg-faint"> · {item.quantity}</span>
                      {/* Low confidence is shown rather than hidden. A number
                          the model is unsure about should look unsure. */}
                      {item.confidence < 0.55 && (
                        <span className="text-fg-faint italic"> · unsure</span>
                      )}
                    </span>
                    <span className="text-fg font-bold tabular-nums shrink-0">
                      {Math.round(item.calories)}
                      <span className="text-[12px] font-medium text-fg-muted ml-1">kcal</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <ToolCta>
              This is one photo, read once. Dietly Fit keeps the log, learns your
              portions, and ties what you eat to a weekly Form Score out of 100.
            </ToolCta>
          </Reveal>
        ) : null}
        </ResultPanel>
      </div>
    </div>
  );
}
