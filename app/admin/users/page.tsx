"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { api } from "../../lib/api";

type User = {
  uid: string;
  display_name: string | null;
  email: string | null;
  tier: string;
  platform: string | null;
  device_model: string | null;
  last_seen: string | null;
  language: string | null;
  country: string | null;
};

const TIER_BADGE: Record<string, string> = {
  pro: "bg-accent/15 text-accent border-accent/30",
  free: "bg-ghost text-muted border-border",
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const params = new URLSearchParams({ limit: "100" });
      if (tierFilter) params.set("tier", tierFilter);
      const res = await api.get<{ users: User[]; total: number }>(
        `/admin/users?${params}`
      );
      setUsers(res.users);
      setTotal(res.total);
    } finally {
      setLoading(false);
    }
  }, [tierFilter]);

  useEffect(() => { load(); }, [load]);

  const filtered = filter
    ? users.filter(
        (u) =>
          u.email?.toLowerCase().includes(filter.toLowerCase()) ||
          u.display_name?.toLowerCase().includes(filter.toLowerCase()) ||
          u.uid.includes(filter)
      )
    : users;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-fg">Users</h1>
          <p className="text-sm text-muted mt-1">{total.toLocaleString()} total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search by name, email, UID…"
          className="flex-1 bg-elevated border border-border rounded-xl px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors placeholder:text-faint"
        />
        <select
          value={tierFilter}
          onChange={(e) => {
            setLoading(true);
            setTierFilter(e.target.value);
          }}
          className="bg-elevated border border-border rounded-xl px-4 py-2.5 text-sm text-fg outline-none focus:border-accent"
        >
          <option value="">All tiers</option>
          <option value="free">Free</option>
          <option value="pro">Pro</option>
        </select>
      </div>

      <div className="bg-elevated border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["User", "Tier", "Platform", "Language", "Country", "Last seen", ""].map((h) => (
                <th key={h} className="text-left text-xs font-bold text-muted tracking-widest px-5 py-3.5">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-muted text-sm">
                  Loading…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-muted text-sm">
                  No users found
                </td>
              </tr>
            ) : (
              filtered.map((u) => (
                <tr key={u.uid} className="border-b border-border last:border-0 hover:bg-ghost/50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-fg">{u.display_name ?? "—"}</p>
                    <p className="text-xs text-muted mt-0.5">{u.email ?? u.uid}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${TIER_BADGE[u.tier] ?? TIER_BADGE.free}`}>
                      {u.tier.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-muted">{u.platform ?? "—"}</td>
                  <td className="px-5 py-4 text-muted">{u.language ?? "—"}</td>
                  <td className="px-5 py-4 text-muted">{u.country ?? "—"}</td>
                  <td className="px-5 py-4 text-faint text-xs">
                    {u.last_seen ? new Date(u.last_seen).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/users/${u.uid}`}
                      className="text-xs font-bold text-accent hover:underline"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
