/**
 * Kimi K2.5 on Amazon Bedrock, for the public tools on this site.
 *
 * ## Why this exists separately from the backend
 *
 * `dietly_backend` already recognises meals — `app/services/food_vision.py`,
 * on Gemini — but every one of its routes sits behind `Depends(current_user)`
 * and a plan quota (`_enforce(uid, "scans", …)`). That is correct for the app
 * and unusable for a public marketing page, which has no logged-in user to
 * charge the scan against. Loosening the app's endpoint to serve anonymous web
 * traffic would put the product's paid quota and a public demo on the same
 * meter, which is the wrong trade in both directions.
 *
 * So the website gets its own recogniser, its own model and its own budget.
 * The *prompt and the normalisation are deliberately mirrored* from
 * `food_vision.py`, because a demo that describes a meal differently from the
 * app it is advertising is worse than no demo.
 *
 * ## Why the OpenAI-compatible endpoint, and no AWS SDK
 *
 * Bedrock exposes three APIs for this model — Converse, Invoke, and an
 * OpenAI-compatible Chat Completions surface at
 * `https://bedrock-runtime.{region}.amazonaws.com/openai/v1`. Only the last
 * one authenticates with a plain bearer token; the other two want SigV4, which
 * would mean pulling `@aws-sdk/client-bedrock-runtime` and its credential
 * chain into a Next.js app that currently has no AWS dependency at all.
 *
 * A bearer token and `fetch` need neither. Generate the key in the Bedrock
 * console under API keys.
 *
 * ## Facts about this model, checked against the AWS model card on 2026-09-22
 *
 * - Model ID is `moonshotai.kimi-k2.5` — no `us.` inference-profile prefix,
 *   because this model supports **in-region inference only**. Geo and global
 *   cross-region inference are both unsupported, so the region in the URL is
 *   the region that serves the request.
 * - Image input is supported. Text and image in, text out.
 * - **Maximum image payload is 3 MB.** The backend's equivalent cap is 8 MB;
 *   copying that number here would produce a Bedrock-side rejection on large
 *   photos, so `MAX_IMAGE_BYTES` below is set from the model card, not from
 *   the backend.
 * - Context window 256K, max output 16K.
 * - Available in us-east-1/2, us-west-2, eu-north-1, eu-west-2, ap-south-1,
 *   ap-northeast-1, ap-southeast-2/3/4 and sa-east-1. `ap-south-1` (Mumbai) is
 *   worth noting given where the search demand in `KEYWORD_PLAN.md` comes from.
 */

export const KIMI_MODEL = "moonshotai.kimi-k2.5";

/** From the model card. Do not raise this to match the backend's 8 MB. */
export const MAX_IMAGE_BYTES = 3 * 1024 * 1024;

export type BedrockConfig = {
  apiKey: string;
  region: string;
  model: string;
};

/**
 * Reads the Bedrock credentials, or returns null.
 *
 * Null means "the feature is off", and every caller must treat it as such
 * rather than throwing. This is the same switch-not-just-a-credential pattern
 * `POSTHOG_KEY` already uses in this codebase: an unset key on a preview build
 * or a local checkout should disable the tool cleanly, not crash a page or
 * start spending money nobody budgeted.
 */
export function bedrockConfig(): BedrockConfig | null {
  const apiKey = process.env.BEDROCK_API_KEY;
  if (!apiKey) return null;
  return {
    apiKey,
    region: process.env.BEDROCK_REGION || "us-east-1",
    model: process.env.BEDROCK_MODEL || KIMI_MODEL,
  };
}

type ChatContent =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string | ChatContent[];
};

export class BedrockError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "BedrockError";
  }
}

/**
 * One chat completion against Bedrock.
 *
 * `signal` is required in practice rather than optional in spirit: a vision
 * request that hangs holds a serverless function open until the platform kills
 * it, and the caller is the only party that knows how long it is willing to
 * wait.
 */
export type ChatResult = {
  text: string;
  /** "stop" is a complete answer. "length" means the model was cut off at
   *  `maxTokens` and `text` is a fragment — for a JSON response that means
   *  unparseable output, so callers must check this rather than assume. */
  finishReason: string;
};

export async function chat(
  cfg: BedrockConfig,
  messages: ChatMessage[],
  opts: { maxTokens?: number; temperature?: number; signal?: AbortSignal } = {},
): Promise<ChatResult> {
  const url = `https://bedrock-runtime.${cfg.region}.amazonaws.com/openai/v1/chat/completions`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cfg.apiKey}`,
    },
    body: JSON.stringify({
      model: cfg.model,
      messages,
      // Kimi K2.5 allows 16K output. The old default of 1600 silently truncated
      // a busy plate mid-object — `finish_reason: "length"`, invalid JSON, and
      // a "we could not read that photo" message for a photo that had been
      // read perfectly well. Measured: a 12-item spread needs well over 1600.
      max_tokens: opts.maxTokens ?? 4000,
      temperature: opts.temperature ?? 0.2,
      // `response_format` is honoured by this model — the card lists structured
      // outputs as supported on bedrock-runtime. It is not a guarantee of
      // schema-perfect output, which is why the caller still validates.
      response_format: { type: "json_object" },
    }),
    signal: opts.signal,
  });

  if (!res.ok) {
    // Bedrock returns JSON errors, but a gateway failure in front of it
    // returns HTML — and an unreadable error is what turned a real debugging
    // session in this repo into guesswork once already. Read the body, try
    // JSON, and fall back to something that at least names the status.
    const raw = await res.text().catch(() => "");
    let detail = "";
    try {
      const parsed = JSON.parse(raw);
      detail = parsed?.message ?? parsed?.error?.message ?? "";
    } catch {
      // HTML or empty. Not worth echoing verbatim to a caller.
    }
    throw new BedrockError(
      detail || `Bedrock request failed — HTTP ${res.status}`,
      res.status,
    );
  }

  const data = await res.json();
  const choice = data?.choices?.[0];
  return {
    text: choice?.message?.content ?? "",
    finishReason: choice?.finish_reason ?? "stop",
  };
}
