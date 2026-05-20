"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../lib/auth";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "◈" },
  { href: "/admin/users", label: "Users", icon: "○" },
  { href: "/admin/subscriptions", label: "Subscriptions", icon: "◇" },
  { href: "/admin/influencers", label: "Influencers", icon: "✦" },
  { href: "/admin/withdrawals", label: "Withdrawals", icon: "⊕" },
  { href: "/admin/freemium", label: "Freemium Config", icon: "◎" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isLoginPage) return;
    if (!loading && !isAdmin) router.replace("/admin/login");
  }, [loading, isAdmin, router, isLoginPage]);

  // Login page renders with no wrapper
  if (isLoginPage) return <>{children}</>;

  // Show spinner while checking session
  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-bg text-fg flex-col md:flex-row relative">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-bg sticky top-0 z-30">
        <span className="text-accent font-mono text-xs font-bold tracking-widest">VITAL · ADMIN</span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-fg">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/60" onClick={() => setIsSidebarOpen(false)} />
      )}

      <aside className={`fixed md:relative inset-y-0 left-0 z-50 w-56 shrink-0 border-r border-border bg-bg flex flex-col transform transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 h-full`}>
        <div className="px-5 py-5 border-b border-border">
          <span className="text-accent font-mono text-xs font-bold tracking-widest">VITAL · ADMIN</span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-0.5">
          {NAV.map((n) => {
            const active = pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:text-fg hover:bg-ghost"
                }`}
              >
                <span className="text-base">{n.icon}</span>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-4 py-4 border-t border-border">
          <p className="text-xs text-faint mb-3">admin</p>
          <button
            onClick={signOut}
            className="w-full text-xs text-muted hover:text-fg border border-border hover:border-border-strong px-3 py-2 rounded-lg transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
