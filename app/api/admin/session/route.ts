import { NextRequest } from "next/server";
import {
  clearCookie,
  credentialsValid,
  hasSession,
  issueCookie,
} from "../../../lib/adminSession";
import { notConfiguredResponse } from "../../../lib/adminSecrets";

/**
 * Sign in, sign out, and "am I still signed in". See `app/lib/adminSession.ts`.
 *
 * Sign-in is where an unconfigured deployment surfaces: `credentialsValid` and
 * `issueCookie` both throw rather than fall back to the published defaults, so
 * this answers 503 naming the missing variable instead of accepting
 * `admin`/`admin` and issuing a forgeable cookie. `GET` needs no such branch —
 * `hasSession` already returns false when it cannot verify.
 */

export async function POST(req: NextRequest) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ detail: "Bad request" }, { status: 400 });
  }

  try {
    if (!credentialsValid(body.username ?? "", body.password ?? "")) {
      // One message for both halves — saying which was wrong tells an attacker
      // when they have found a real username.
      return Response.json({ detail: "Invalid username or password" }, { status: 401 });
    }

    const res = Response.json({ ok: true });
    res.headers.append("Set-Cookie", issueCookie());
    return res;
  } catch (e) {
    const refusal = notConfiguredResponse(e);
    if (refusal) return refusal;
    throw e;
  }
}

/** Used on load so a refresh doesn't drop the admin back to the login form. */
export async function GET(req: NextRequest) {
  return Response.json({ admin: hasSession(req) });
}

export async function DELETE() {
  const res = Response.json({ ok: true });
  res.headers.append("Set-Cookie", clearCookie());
  return res;
}
