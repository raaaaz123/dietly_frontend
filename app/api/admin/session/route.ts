import { NextRequest } from "next/server";
import {
  clearCookie,
  credentialsValid,
  hasSession,
  issueCookie,
} from "../../../lib/adminSession";

/** Sign in, sign out, and "am I still signed in". See `app/lib/adminSession.ts`. */

export async function POST(req: NextRequest) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ detail: "Bad request" }, { status: 400 });
  }

  if (!credentialsValid(body.username ?? "", body.password ?? "")) {
    // One message for both halves — saying which was wrong tells an attacker
    // when they have found a real username.
    return Response.json({ detail: "Invalid username or password" }, { status: 401 });
  }

  const res = Response.json({ ok: true });
  res.headers.append("Set-Cookie", issueCookie());
  return res;
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
