"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { api } from "../../lib/api";

export interface UserScan {
  id: string;
  uid: string;
  user_email?: string;
  display_name?: string;
  taken_on: string;
  created_at: string;
  image_url?: string | null;
  pose: string;
  source: string;
  weight_kg?: number | null;
  note?: string;
  score?: number | null;
  body_fat_estimate?: number | null;
  subscores?: {
    definition?: number;
    leanness?: number;
    symmetry?: number;
    posture?: number;
  } | null;
  weakest?: string | null;
  ai_note?: string | null;
  usable?: boolean;
  reject_reason?: string | null;
}

interface ScansResponse {
  total: number;
  scans: UserScan[];
  stats?: {
    total_photos: number;
    ai_scans: number;
    manual_photos: number;
  };
}

export default function UserScansSection({ isStandalone = false }: { isStandalone?: boolean }) {
  const [scans, setScans] = useState<UserScan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterSource, setFilterSource] = useState<"all" | "scan" | "manual">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScan, setSelectedScan] = useState<UserScan | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  function loadScans() {
    setLoading(true);
    api.get<ScansResponse>("/admin/scans")
      .then((res) => {
        setScans(res?.scans || []);
        setError("");
      })
      .catch((e) => {
        setError(e.message || "Failed to load scans");
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadScans();
  }, []);

  // Filtered scans
  const filteredScans = useMemo(() => {
    return scans.filter((s) => {
      if (filterSource !== "all" && s.source !== filterSource) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const email = (s.user_email || "").toLowerCase();
        const name = (s.display_name || "").toLowerCase();
        const uid = (s.uid || "").toLowerCase();
        const pose = (s.pose || "").toLowerCase();
        return email.includes(q) || name.includes(q) || uid.includes(q) || pose.includes(q);
      }
      return true;
    });
  }, [scans, filterSource, searchQuery]);

  // Aggregate stats
  const totalCount = scans.length;
  const aiCount = scans.filter((s) => s.source === "scan" || s.score != null).length;
  const manualCount = scans.filter((s) => s.source === "manual" && s.score == null).length;
  const scoredScans = scans.filter((s) => s.score != null);
  const avgScore = scoredScans.length
    ? Math.round(scoredScans.reduce((acc, s) => acc + (s.score || 0), 0) / scoredScans.length)
    : null;
  const avgBf = scoredScans.filter((s) => s.body_fat_estimate != null).length
    ? (
        scoredScans.reduce((acc, s) => acc + (s.body_fat_estimate || 0), 0) /
        scoredScans.filter((s) => s.body_fat_estimate != null).length
      ).toFixed(1)
    : null;

  return (
    <section className="bg-elevated border border-border rounded-2xl p-5 md:p-7 shadow-sm">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 text-accent font-bold text-sm">
              ◱
            </span>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-fg">
              Users Scans
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-ghost border border-border text-muted">
              {totalCount} photos
            </span>
          </div>
          <p className="text-xs md:text-sm text-muted mt-1.5">
            All body composition photos, physique scans, and AI progress readings submitted by users
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          {!isStandalone && (
            <Link
              href="/admin/scans"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-border hover:border-border-strong text-muted hover:text-fg transition-colors flex items-center gap-1.5"
            >
              Expand view
              <span>→</span>
            </Link>
          )}

          <button
            onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
            className="p-1.5 px-2.5 text-xs font-mono rounded-lg border border-border text-muted hover:text-fg hover:bg-ghost transition-colors flex items-center gap-1.5"
            title="Toggle grid/table view"
          >
            {viewMode === "grid" ? "☷ Table" : "▦ Grid"}
          </button>

          <button
            onClick={loadScans}
            disabled={loading}
            className="p-1.5 px-3 text-xs font-medium rounded-lg border border-border text-muted hover:text-fg hover:bg-ghost transition-colors flex items-center gap-1.5 disabled:opacity-50"
            title="Refresh scans"
          >
            <span className={`inline-block ${loading ? "animate-spin" : ""}`}>↻</span>
            Refresh
          </button>
        </div>
      </div>

      {/* Mini Metric Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-bg/60 border border-border/80 rounded-xl p-3">
          <p className="text-[11px] font-bold text-muted uppercase tracking-wider">TOTAL UPLOADS</p>
          <p className="text-xl font-black text-fg mt-1">{totalCount}</p>
          <p className="text-[11px] text-faint mt-0.5">Across all users</p>
        </div>
        <div className="bg-bg/60 border border-border/80 rounded-xl p-3">
          <p className="text-[11px] font-bold text-muted uppercase tracking-wider">AI BODY SCANS</p>
          <p className="text-xl font-black text-accent mt-1">{aiCount}</p>
          <p className="text-[11px] text-faint mt-0.5">Scored by AI</p>
        </div>
        <div className="bg-bg/60 border border-border/80 rounded-xl p-3">
          <p className="text-[11px] font-bold text-muted uppercase tracking-wider">AVG SCAN SCORE</p>
          <p className="text-xl font-black text-fg mt-1">{avgScore ?? "—"}<span className="text-xs text-muted font-normal">/100</span></p>
          <p className="text-[11px] text-faint mt-0.5">Physique score</p>
        </div>
        <div className="bg-bg/60 border border-border/80 rounded-xl p-3">
          <p className="text-[11px] font-bold text-muted uppercase tracking-wider">AVG BODY FAT</p>
          <p className="text-xl font-black text-accent mt-1">{avgBf ? `${avgBf}%` : "—"}</p>
          <p className="text-[11px] text-faint mt-0.5">Estimated BF</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-border">
        {/* Source Filter Tabs */}
        <div className="flex items-center gap-1 bg-bg p-1 rounded-xl border border-border">
          {(
            [
              { id: "all", label: "All Images", count: totalCount },
              { id: "scan", label: "AI Scans", count: aiCount },
              { id: "manual", label: "Manual Photos", count: manualCount },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterSource(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterSource === tab.id
                  ? "bg-accent/15 text-accent border border-accent/20 shadow-xs"
                  : "text-muted hover:text-fg hover:bg-ghost"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 opacity-60 font-mono text-[10px]">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <input
            type="text"
            placeholder="Search email, name, UID or pose…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bg border border-border rounded-xl px-3.5 py-2 pl-9 text-xs text-fg placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
          />
          <svg
            className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-fg text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Loading state */}
      {loading && scans.length === 0 && (
        <div className="py-16 flex flex-col items-center justify-center gap-3">
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-muted font-medium">Loading scanned images from cloud storage…</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center justify-between">
          <span>Failed to load scans: {error}</span>
          <button onClick={loadScans} className="underline hover:text-red-300 ml-4 font-semibold">
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredScans.length === 0 && (
        <div className="py-14 text-center border border-dashed border-border rounded-xl bg-bg/40">
          <p className="text-2xl mb-2">📸</p>
          <p className="text-sm font-semibold text-fg">No scanned images found</p>
          <p className="text-xs text-muted mt-1 max-w-sm mx-auto">
            {searchQuery
              ? `No user scans matching "${searchQuery}". Try clearing search filter.`
              : "No user scans matching this filter have been logged yet."}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-3 text-xs text-accent font-semibold underline"
            >
              Clear search
            </button>
          )}
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && filteredScans.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredScans.map((scan) => {
            const hasAi = scan.source === "scan" || scan.score != null;
            return (
              <div
                key={scan.id}
                onClick={() => setSelectedScan(scan)}
                className="group relative bg-bg border border-border hover:border-accent/40 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex flex-col"
              >
                {/* Photo container */}
                <div className="relative aspect-[3/4] bg-neutral-900 w-full overflow-hidden">
                  {scan.image_url ? (
                    <img
                      src={scan.image_url}
                      alt={`Scan ${scan.id}`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-ghost">
                      <span className="text-3xl mb-2 opacity-40">👤</span>
                      <span className="text-xs text-muted">Protected photo</span>
                      <span className="text-[10px] text-faint mt-1">{scan.pose.toUpperCase()}</span>
                    </div>
                  )}

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 pointer-events-none">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase backdrop-blur-md shadow-xs ${
                        hasAi
                          ? "bg-accent/90 text-black"
                          : "bg-black/60 text-fg border border-white/10"
                      }`}
                    >
                      {hasAi ? "✦ AI Scan" : "Manual"}
                    </span>

                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/70 backdrop-blur-md border border-white/10 text-fg">
                      {scan.pose ? scan.pose.toUpperCase() : "FRONT"}
                    </span>
                  </div>

                  {/* Bottom overlay inside image: Score & Body Fat */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 pointer-events-none">
                    {hasAi && scan.score != null ? (
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-[10px] font-bold text-neutral-300 tracking-wider">SCORE</p>
                          <p className="text-2xl font-black text-white leading-none mt-0.5">
                            {scan.score}
                            <span className="text-xs text-neutral-400 font-normal">/100</span>
                          </p>
                        </div>
                        {scan.body_fat_estimate != null && (
                          <div className="text-right">
                            <p className="text-[10px] font-bold text-neutral-300 tracking-wider">EST. FAT</p>
                            <p className="text-base font-black text-accent leading-none mt-0.5">
                              {scan.body_fat_estimate}%
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        {scan.weight_kg != null && (
                          <p className="text-xs font-bold text-white">
                            {scan.weight_kg} kg
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Info Footer */}
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* User info */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-5 h-5 rounded-full bg-accent/20 text-accent font-bold text-[10px] flex items-center justify-center shrink-0">
                        {(scan.display_name || scan.user_email || "U")[0].toUpperCase()}
                      </div>
                      <p className="text-xs font-bold text-fg truncate">
                        {scan.display_name || scan.user_email?.split("@")[0] || "Anonymous User"}
                      </p>
                    </div>

                    <p className="text-[11px] text-muted truncate mb-2">
                      {scan.user_email || `ID: ${scan.uid.slice(0, 12)}…`}
                    </p>

                    {/* Subscores mini preview if available */}
                    {scan.subscores && (
                      <div className="grid grid-cols-4 gap-1 mb-2.5 pt-1.5 border-t border-border/60 text-[9px] font-mono text-muted text-center">
                        <div title={`Definition: ${scan.subscores.definition ?? "—"}`}>
                          <div className="text-[8px] text-faint">DEF</div>
                          <div className="font-bold text-fg">{scan.subscores.definition ?? "—"}</div>
                        </div>
                        <div title={`Leanness: ${scan.subscores.leanness ?? "—"}`}>
                          <div className="text-[8px] text-faint">LEAN</div>
                          <div className="font-bold text-fg">{scan.subscores.leanness ?? "—"}</div>
                        </div>
                        <div title={`Symmetry: ${scan.subscores.symmetry ?? "—"}`}>
                          <div className="text-[8px] text-faint">SYM</div>
                          <div className="font-bold text-fg">{scan.subscores.symmetry ?? "—"}</div>
                        </div>
                        <div title={`Posture: ${scan.subscores.posture ?? "—"}`}>
                          <div className="text-[8px] text-faint">POST</div>
                          <div className="font-bold text-fg">{scan.subscores.posture ?? "—"}</div>
                        </div>
                      </div>
                    )}

                    {/* Note snippet if present */}
                    {(scan.ai_note || scan.note) && (
                      <p className="text-[11px] text-faint line-clamp-2 italic mb-2">
                        &ldquo;{scan.ai_note || scan.note}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Date & Tap prompt */}
                  <div className="flex items-center justify-between text-[10px] text-muted pt-2 border-t border-border/60">
                    <span>{new Date(scan.created_at || scan.taken_on).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
                    <span className="text-accent group-hover:translate-x-0.5 transition-transform font-semibold">Inspect →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" && filteredScans.length > 0 && (
        <div className="overflow-x-auto border border-border rounded-xl">
          <table className="w-full text-left text-xs text-fg">
            <thead className="bg-bg border-b border-border text-[11px] font-bold text-muted uppercase tracking-wider">
              <tr>
                <th className="py-3 px-3">Photo</th>
                <th className="py-3 px-3">User</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Score</th>
                <th className="py-3 px-3">Est. Fat</th>
                <th className="py-3 px-3">Pose / Wt</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredScans.map((scan) => (
                <tr
                  key={scan.id}
                  onClick={() => setSelectedScan(scan)}
                  className="hover:bg-ghost cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-3">
                    <div className="w-10 h-13 rounded-lg overflow-hidden bg-neutral-900 border border-border shrink-0">
                      {scan.image_url ? (
                        <img src={scan.image_url} alt="" className="w-full h-full object-cover object-top" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted">👤</div>
                      )}
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <p className="font-bold text-fg">{scan.display_name || "User"}</p>
                    <p className="text-[11px] text-muted truncate max-w-[160px]">{scan.user_email || scan.uid}</p>
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        scan.source === "scan" || scan.score != null
                          ? "bg-accent/15 text-accent border border-accent/20"
                          : "bg-ghost text-muted border border-border"
                      }`}
                    >
                      {scan.source === "scan" || scan.score != null ? "AI Scan" : "Manual"}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold">
                    {scan.score != null ? (
                      <span className="text-fg">{scan.score}/100</span>
                    ) : (
                      <span className="text-faint">—</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-accent">
                    {scan.body_fat_estimate != null ? `${scan.body_fat_estimate}%` : "—"}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-muted">
                    {scan.pose.toUpperCase()}
                    {scan.weight_kg != null && ` • ${scan.weight_kg}kg`}
                  </td>
                  <td className="py-2.5 px-3 text-[11px] text-muted whitespace-nowrap">
                    {new Date(scan.created_at || scan.taken_on).toLocaleDateString()}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedScan(scan);
                      }}
                      className="text-xs text-accent hover:underline font-semibold"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Full Modal Lightbox */}
      {selectedScan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedScan(null)}
        >
          <div
            className="relative bg-bg border border-border-strong rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col md:flex-row shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedScan(null)}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/70 border border-white/20 text-white hover:bg-black flex items-center justify-center transition-colors"
              title="Close modal (Esc)"
            >
              ✕
            </button>

            {/* Left: High-Res Image View */}
            <div className="md:w-1/2 bg-black flex items-center justify-center relative p-3 min-h-[320px] max-h-[50vh] md:max-h-[92vh]">
              {selectedScan.image_url ? (
                <img
                  src={selectedScan.image_url}
                  alt={`Scan by ${selectedScan.display_name || selectedScan.uid}`}
                  className="max-h-full max-w-full object-contain rounded-lg shadow-inner"
                />
              ) : (
                <div className="text-center p-8 text-muted">
                  <p className="text-5xl mb-3">👤</p>
                  <p className="text-sm font-semibold">Original image preserved in private bucket</p>
                  <p className="text-xs text-faint mt-1">Presigned read token expired or unconfigured</p>
                </div>
              )}

              {/* Pose badge over image */}
              <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-md text-xs font-mono font-bold text-white border border-white/10">
                POSE: {selectedScan.pose.toUpperCase()}
              </div>

              {selectedScan.image_url && (
                <a
                  href={selectedScan.image_url}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-4 right-4 bg-black/75 hover:bg-black backdrop-blur-md px-3 py-1 rounded-md text-xs font-semibold text-white border border-white/10 transition-colors"
                >
                  Full image ↗
                </a>
              )}
            </div>

            {/* Right: Metrics & User Dossier */}
            <div className="md:w-1/2 p-6 md:p-7 overflow-y-auto max-h-[50vh] md:max-h-[92vh] flex flex-col justify-between">
              <div>
                {/* Header info */}
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      selectedScan.source === "scan" || selectedScan.score != null
                        ? "bg-accent/15 text-accent border border-accent/20"
                        : "bg-ghost text-muted border border-border"
                    }`}
                  >
                    {selectedScan.source === "scan" || selectedScan.score != null
                      ? "✦ AI Body Scan"
                      : "Manual Progress Photo"}
                  </span>
                  <span className="text-xs text-muted">
                    {new Date(selectedScan.created_at || selectedScan.taken_on).toLocaleString()}
                  </span>
                </div>

                <h3 className="text-xl font-black text-fg tracking-tight">
                  {selectedScan.display_name || "User Scan"}
                </h3>
                <p className="text-xs text-muted font-mono mt-0.5">
                  {selectedScan.user_email || `UID: ${selectedScan.uid}`}
                </p>

                {/* Score & Body Fat Banner */}
                {selectedScan.score != null ? (
                  <div className="my-5 p-4 rounded-xl bg-elevated border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-[11px] font-bold text-muted uppercase tracking-wider">COMPOSITION SCORE</p>
                        <p className="text-3xl font-black text-fg mt-0.5">
                          {selectedScan.score}
                          <span className="text-sm font-normal text-muted">/100</span>
                        </p>
                      </div>
                      {selectedScan.body_fat_estimate != null && (
                        <div className="text-right">
                          <p className="text-[11px] font-bold text-muted uppercase tracking-wider">ESTIMATED BODY FAT</p>
                          <p className="text-3xl font-black text-accent mt-0.5">
                            {selectedScan.body_fat_estimate}%
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Subscores breakdown */}
                    {selectedScan.subscores && (
                      <div className="space-y-2 pt-3 border-t border-border/80">
                        <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">
                          SUB-SCORE BREAKDOWN
                        </p>
                        {[
                          { label: "Definition", val: selectedScan.subscores.definition ?? 0 },
                          { label: "Leanness", val: selectedScan.subscores.leanness ?? 0 },
                          { label: "Symmetry", val: selectedScan.subscores.symmetry ?? 0 },
                          { label: "Posture", val: selectedScan.subscores.posture ?? 0 },
                        ].map((sub) => (
                          <div key={sub.label} className="text-xs">
                            <div className="flex justify-between text-muted mb-1 font-semibold">
                              <span>{sub.label}</span>
                              <span className="font-mono text-fg">{sub.val}/100</span>
                            </div>
                            <div className="h-1.5 bg-bg rounded-full overflow-hidden">
                              <div
                                className="h-full bg-accent rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(sub.val, 100)}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="my-5 p-4 rounded-xl bg-elevated border border-border">
                    <p className="text-xs font-bold text-muted uppercase tracking-wider">PHOTO LOG</p>
                    <p className="text-sm text-fg mt-1">
                      Uploaded directly to progress gallery without AI scoring pass.
                    </p>
                  </div>
                )}

                {/* AI / User Note */}
                {(selectedScan.ai_note || selectedScan.note) && (
                  <div className="mb-5">
                    <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-1.5">
                      {selectedScan.ai_note ? "AI COACH OBSERVATION" : "USER NOTE"}
                    </p>
                    <blockquote className="p-3 bg-bg border-l-2 border-accent rounded-r-lg text-xs text-fg italic leading-relaxed">
                      &ldquo;{selectedScan.ai_note || selectedScan.note}&rdquo;
                    </blockquote>
                    {selectedScan.weakest && (
                      <p className="text-xs text-muted mt-2">
                        Primary area to target: <span className="text-accent font-semibold uppercase">{selectedScan.weakest}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Additional Metadata */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-border font-mono">
                  <div>
                    <span className="text-muted block text-[10px]">WEIGHT:</span>
                    <span className="text-fg font-semibold">
                      {selectedScan.weight_kg ? `${selectedScan.weight_kg} kg (${(selectedScan.weight_kg * 2.20462).toFixed(1)} lbs)` : "Not logged"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted block text-[10px]">SCAN ID:</span>
                    <span className="text-fg truncate block" title={selectedScan.id}>{selectedScan.id}</span>
                  </div>
                </div>
              </div>

              {/* Modal footer */}
              <div className="pt-5 mt-4 border-t border-border flex items-center justify-between">
                <Link
                  href={`/admin/users`}
                  className="text-xs text-muted hover:text-fg font-semibold transition-colors"
                >
                  View user in Users directory →
                </Link>
                <button
                  onClick={() => setSelectedScan(null)}
                  className="px-4 py-2 bg-ghost hover:bg-neutral-800 border border-border text-xs font-semibold rounded-lg text-fg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
