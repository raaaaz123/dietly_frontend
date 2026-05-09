"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/auth";

export default function AdminLogin() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(username, password);
      router.replace("/admin/dashboard");
    } catch (err: unknown) {
      setError((err as Error).message ?? "Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <p className="text-accent font-mono text-xs font-bold tracking-widest mb-8">
          VITAL · ADMIN
        </p>
        <h1 className="text-3xl font-black tracking-tight text-fg mb-2">
          Admin login
        </h1>
        <p className="text-sm text-muted mb-8">
          Enter your admin credentials to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-muted tracking-widest mb-2">
              USERNAME
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full bg-elevated border border-border rounded-xl px-4 py-3 text-fg text-sm outline-none focus:border-accent transition-colors"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-muted tracking-widest mb-2">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-elevated border border-border rounded-xl px-4 py-3 text-fg text-sm outline-none focus:border-accent transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-xs font-semibold text-red-400 bg-red-400/10 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-accent-ink font-bold text-sm py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in →"}
          </button>
        </form>
      </div>
    </div>
  );
}
