/**
 * Every admin request, routed through this app's own server.
 *
 * `BASE` used to be `process.env.API_URL` — the browser called
 * `api.dietly.life` directly and attached `X-Admin-Key` itself. Two problems,
 * one of them serious:
 *
 * 1. The key was inlined into the client bundle (this module is imported by
 *    `"use client"` pages, and `next.config.ts` re-exported `ADMIN_API_KEY`
 *    through its `env` block), so it shipped to every visitor of /admin.
 * 2. The calls were cross-origin, which is why an ordinary 500 surfaced as
 *    "blocked by CORS policy" with the status and message thrown away.
 *
 * `/api/admin/*` is same-origin and adds the credential server-side. See
 * `app/api/admin/[...path]/route.ts`.
 */
const BASE = "/api/admin";

async function request<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail ?? "Request failed");
  }
  // 204, or an endpoint that answers with an empty body. `res.json()` throws
  // on those, which turned a successful delete into a failed one.
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}

export const api = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body?: unknown) => request<T>("POST", path, body),
  put: <T>(path: string, body?: unknown) => request<T>("PUT", path, body),
  del: <T>(path: string) => request<T>("DELETE", path),
};
