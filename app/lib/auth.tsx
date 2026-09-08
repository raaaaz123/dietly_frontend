"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

/**
 * The admin session, as far as the browser is concerned.
 *
 * This used to *be* the authentication: it compared the typed password against
 * `process.env.ADMIN_PASSWORD` here in the client — inlined into the bundle by
 * `next.config.ts` — and set a `sessionStorage` flag. Anyone could read the
 * password out of the bundle, and anyone could set the flag by hand.
 *
 * The check now happens in `app/api/admin/session/route.ts` and the result is
 * an HTTP-only cookie this file cannot read, forge, or set. What is left here
 * is presentation: whether to draw the login form or the dashboard. The thing
 * that actually protects the data is `/api/admin/[...path]` refusing to attach
 * the admin key without that cookie.
 */

interface AuthCtx {
  isAdmin: boolean;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
}

const Ctx = createContext<AuthCtx>({
  isAdmin: false,
  loading: true,
  signIn: async () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Asks the server rather than reading local state, so a cookie that expired
  // overnight lands on the login form instead of on a dashboard whose every
  // request 401s.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/session", { cache: "no-store" });
        const data = await res.json().catch(() => ({ admin: false }));
        if (!cancelled) setIsAdmin(Boolean(data?.admin));
      } catch {
        if (!cancelled) setIsAdmin(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const signIn = async (username: string, password: string) => {
    const res = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail ?? "Invalid username or password");
    }
    setIsAdmin(true);
  };

  const signOut = () => {
    // Fire-and-forget: the cookie is the session, and the UI should not sit on
    // a spinner waiting for a logout to round-trip.
    void fetch("/api/admin/session", { method: "DELETE" });
    setIsAdmin(false);
  };

  return (
    <Ctx.Provider value={{ isAdmin, loading, signIn, signOut }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
