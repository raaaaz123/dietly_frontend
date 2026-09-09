import type { NextRequest } from "next/server";
import crypto from "crypto";
import { secret } from "./adminSecrets";

/**
 * The admin session, issued and checked on the server.
 *
 * There was no server-side session at all before this: `app/lib/auth.tsx`
 * compared the typed password against `process.env.ADMIN_PASSWORD` *in the
 * browser* — inlined into the bundle by `next.config.ts` — and set a
 * `sessionStorage` flag. That is a UI gate, not authentication: the password
 * was readable in the bundle, and setting one sessionStorage key by hand walked
 * straight past it.
 *
 * It became load-bearing the moment `/api/admin/[...path]` started attaching
 * the real admin key server-side. That proxy has to refuse anyone without a
 * session, and "a flag in the caller's own sessionStorage" is not something a
 * server can refuse on.
 *
 * The cookie is `<expiry>.<hmac>`, signed with a key derived from
 * `ADMIN_API_KEY`. Deriving rather than adding a new required secret is
 * deliberate: a separate `SESSION_SECRET` that nobody had set yet would either
 * fail closed on deploy (admin locked out) or fail open with a default (worse
 * than what it replaced). `ADMIN_API_KEY` is already secret, already required
 * for any of this to work, and never leaves the server.
 *
 * Which is exactly why the secrets are read through `adminSecrets` rather than
 * with a `??` default. They used to have one, and a deployment missing
 * `ADMIN_API_KEY` signed these cookies with a value published in this repo —
 * so the argument above ("already secret") was only true when somebody had
 * remembered to set it. `hasSession` now returns false rather than validating
 * against a known key, and issuing a cookie fails loudly.
 *
 * Lives here rather than in the route file because a Next route module may only
 * export handlers and a fixed set of config fields — exporting `hasSession`
 * from one fails the build.
 */

export const COOKIE = "dietly_admin";
export const TTL_MS = 12 * 60 * 60 * 1000;

function sign(expiry: number): string {
  return crypto
    .createHmac("sha256", `admin-session:${secret("ADMIN_API_KEY")}`)
    .update(String(expiry))
    .digest("hex");
}

/**
 * Whether the request carries a session this server issued and hasn't expired.
 *
 * False when the signing key is unconfigured. That is the fail-closed
 * direction and the one that matters: a proxy that treats "cannot verify" as
 * "verified" is the unauthenticated admin gateway this file exists to prevent.
 */
export function hasSession(req: NextRequest): boolean {
  const raw = req.cookies.get(COOKIE)?.value;
  if (!raw) return false;
  const [expiryRaw, mac] = raw.split(".");
  const expiry = Number(expiryRaw);
  if (!expiry || !mac || Date.now() > expiry) return false;

  let expected: string;
  try {
    expected = sign(expiry);
  } catch {
    return false;
  }
  // Constant-time: a plain `===` on a hex digest leaks it a byte at a time.
  if (mac.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected));
}

/** Hashed before comparing so inputs of different lengths are still safe to compare. */
function matches(a: string, b: string): boolean {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

/**
 * Both halves checked, and both throw rather than default when unconfigured.
 *
 * `ADMIN_PASSWORD` used to fall back to `admin`, so a deployment that forgot
 * it accepted `admin`/`admin` — a worse hole than the key fallback the audit
 * named, because it needs no knowledge of the repo at all.
 */
export function credentialsValid(username: string, password: string): boolean {
  return (
    matches((username ?? "").trim(), secret("ADMIN_USERNAME")) &&
    matches(password ?? "", secret("ADMIN_PASSWORD"))
  );
}

export function issueCookie(): string {
  const expiry = Date.now() + TTL_MS;
  return [
    `${COOKIE}=${expiry}.${sign(expiry)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Secure",
    `Max-Age=${Math.floor(TTL_MS / 1000)}`,
  ].join("; ");
}

export function clearCookie(): string {
  return `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0`;
}

/**
 * A stable, non-reversible id for the session making this request.
 *
 * The backend's audit log (`app/services/admin_audit.py`) needs to say *which*
 * signed-in session changed a subscription tier or edited an exercise. The
 * admin key cannot answer that — there is one of it, shared — but the session
 * cookie can: it is issued per sign-in, so two operators, or the same operator
 * on two days, are two different ids.
 *
 * Hashed rather than sent as-is, and that is the whole design. The cookie is
 * the credential; forwarding it to the API would put a valid admin session in
 * another service's logs, which is how a log becomes a way in. A SHA-256 over
 * the cookie plus a fixed label is enough to correlate rows and useless to
 * anybody who reads them.
 *
 * Returns null when there is no valid session or the signing key is unset —
 * the proxy refuses those requests anyway, and a null lands in the log as
 * "unknown", which is the honest answer.
 */
export function sessionId(req: NextRequest): string | null {
  const raw = req.cookies.get(COOKIE)?.value;
  if (!raw) return null;
  try {
    return crypto
      .createHash("sha256")
      .update(`admin-session-id:${raw}`)
      .digest("hex")
      .slice(0, 16);
  } catch {
    return null;
  }
}
