import { NextRequest } from "next/server";
import { hasSession, sessionId } from "../../../lib/adminSession";
import { notConfiguredResponse, secret } from "../../../lib/adminSecrets";

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
 *
 * And why the key is read through `adminSecrets` rather than with a `??`
 * default. It had one — `"vital-admin-dev-key"`, committed to this repo — so a
 * deployment missing `ADMIN_API_KEY` did not fail, it quietly signed every
 * upstream request with a published credential that the backend accepts if it
 * happens to be the deployed value too. Now the request is refused instead.
 *
 * Which is exactly why it has to check a session first. Attaching the admin key
 * to whatever arrives turns this route into an unauthenticated admin gateway on
 * the public internet — strictly worse than the leaked-key problem it replaced,
 * because that one at least required opening the bundle. Verified by calling it
 * with curl and no credentials at all and getting a 200 back. The login was
 * client-side (`app/lib/auth.tsx` compared an inlined password and set a
 * sessionStorage flag), so there was nothing here to check against; see
 * `../session/route.ts`, which is where the real one now lives.
 */

const API = process.env.API_URL ?? "http://localhost:8000";

/** Long enough for `build-media` and `select-core`, which are not quick. */
export const maxDuration = 60;

async function forward(req: NextRequest, path: string[]) {
  if (!hasSession(req)) {
    return Response.json({ detail: "Admin sign-in required" }, { status: 401 });
  }

  // Read before anything else is done with the request, so a misconfigured
  // deployment refuses rather than reaching upstream with a default key.
  let key: string;
  try {
    key = secret("ADMIN_API_KEY");
  } catch (e) {
    return notConfiguredResponse(e) ?? Response.json(
      { detail: "Admin is not configured on this deployment" }, { status: 503 }
    );
  }

  const session = sessionId(req);
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
        "X-Admin-Key": key,
        // Attribution, not authentication — see `sessionId`. The backend
        // writes it into `admin_audit` so a change made through this proxy can
        // be traced to the session that made it. The key alone cannot say
        // that: there is one of it and everybody shares it.
        ...(session ? { "X-Admin-Session": session } : {}),
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
