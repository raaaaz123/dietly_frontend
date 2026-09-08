import { NextRequest } from "next/server";

/**
 * Server-side proxy for every admin call.
 *
 * The browser used to talk to `api.dietly.life` directly, with
 * `X-Admin-Key` attached in `app/lib/api.ts`. That key came from
 * `process.env.ADMIN_API_KEY`, which `next.config.ts` re-exported through its
 * `env` block — and `app/lib/api.ts` is imported by `"use client"` pages, so
 * Next inlined the key into the JavaScript bundle served to every visitor of
 * /admin. Anyone who opened that bundle had write and delete on the exercise
 * catalogue. The CORS preflight asking permission for `x-admin-key` was the
 * visible symptom: a header only travels cross-origin because the browser is
 * the one sending it.
 *
 * Routing through here fixes both halves at once. The key is read on the
 * server, where `process.env` is genuinely private, so it never reaches a
 * bundle. And the requests stop being cross-origin, so the admin app no longer
 * depends on the API's CORS policy at all — which is what turned an ordinary
 * 500 into "blocked by CORS policy" and hid the real error.
 *
 * Deliberately a catch-all rather than one handler per endpoint: the admin app
 * calls a couple of dozen paths and a per-path allowlist would be a second
 * routing table to keep in sync with the backend's. Everything here is already
 * behind `require_admin` server-side; this proxy adds the credential, it does
 * not decide what may be called.
 */

const API = process.env.API_URL ?? "http://localhost:8000";
const KEY = process.env.ADMIN_API_KEY ?? "vital-admin-dev-key";

/** Long enough for `build-media` and `select-core`, which are not quick. */
export const maxDuration = 60;

async function forward(req: NextRequest, path: string[]) {
  const search = req.nextUrl.search;
  const target = `${API}/${path.join("/")}${search}`;

  // Only the body-carrying verbs read one. `GET`/`DELETE` with a body throws
  // in undici rather than being ignored.
  const hasBody = !["GET", "HEAD", "DELETE"].includes(req.method);
  const body = hasBody ? await req.text() : undefined;

  let res: Response;
  try {
    res = await fetch(target, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        "X-Admin-Key": KEY,
      },
      body: body || undefined,
      cache: "no-store",
    });
  } catch (e) {
    // The upstream was unreachable. Answered as JSON because every caller in
    // `app/lib/api.ts` does `res.json()` on failure, and an HTML error page
    // there surfaces as "Unexpected token <" instead of the real cause.
    return Response.json(
      { detail: e instanceof Error ? e.message : "Upstream unreachable" },
      { status: 502 }
    );
  }

  // Passed through verbatim, status included, so the client keeps seeing the
  // backend's own `detail` messages rather than a proxy's paraphrase.
  const text = await res.text();
  return new Response(text, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("content-type") ?? "application/json",
    },
  });
}

// Next 15 hands params in as a promise.
type Ctx = { params: Promise<{ path: string[] }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  return forward(req, (await ctx.params).path);
}
export async function POST(req: NextRequest, ctx: Ctx) {
  return forward(req, (await ctx.params).path);
}
export async function PUT(req: NextRequest, ctx: Ctx) {
  return forward(req, (await ctx.params).path);
}
export async function PATCH(req: NextRequest, ctx: Ctx) {
  return forward(req, (await ctx.params).path);
}
export async function DELETE(req: NextRequest, ctx: Ctx) {
  return forward(req, (await ctx.params).path);
}
