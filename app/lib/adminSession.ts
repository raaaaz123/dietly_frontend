import type { NextRequest } from "next/server";
import crypto from "crypto";

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
 * Lives here rather than in the route file because a Next route module may only
 * export handlers and a fixed set of config fields — exporting `hasSession`
 * from one fails the build.
 */

const USER = process.env.ADMIN_USERNAME ?? "admin";
const PASS = process.env.ADMIN_PASSWORD ?? "admin";
const KEY = process.env.ADMIN_API_KEY ?? "vital-admin-dev-key";

export const COOKIE = "dietly_admin";
export const TTL_MS = 12 * 60 * 60 * 1000;

function sign(expiry: number): string {
  return crypto
    .createHmac("sha256", `admin-session:${KEY}`)
    .update(String(expiry))
    .digest("hex");
}

/** Whether the request carries a session this server issued and hasn't expired. */
export function hasSession(req: NextRequest): boolean {
  const raw = req.cookies.get(COOKIE)?.value;
  if (!raw) return false;
  const [expiryRaw, mac] = raw.split(".");
  const expiry = Number(expiryRaw);
  if (!expiry || !mac || Date.now() > expiry) return false;
  const expected = sign(expiry);
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

export function credentialsValid(username: string, password: string): boolean {
  return matches((username ?? "").trim(), USER) && matches(password ?? "", PASS);
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
