"use client";
import { useEffect, useState, useCallback } from "react";
import { api } from "../../lib/api";

type Withdrawal = {
  id: string;
  influencer_uid: string;
  influencer_name: string;
  amount: number;
  payment_method: string;
  payment_details: string;
  status: string;
  created_at: string;
  resolved_at: string | null;
  notes: string | null;
};

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-400/15 text-yellow-400 border-yellow-400/30",
  approved: "bg-accent/15 text-accent border-accent/30",
  paid: "bg-ghost text-muted border-border",
  rejected: "bg-red-400/15 text-red-400 border-red-400/30",
};

export default function WithdrawalsPage() {
  const [items, setItems] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [actionId, setActionId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const load = useCallback(() => {
    const params = statusFilter ? `?status_filter=${statusFilter}` : "";
    api.get<{ withdrawals: Withdrawal[] }>(`/admin/withdrawals${params}`)
      .then((r) => setItems(r.withdrawals))
      .finally(() => setLoading(false));
  }, [statusFilter]);

  useEffect(() => { load(); }, [load]);

  const act = async (id: string, action: "approve" | "reject" | "paid") => {
    setActionId(id);
    try {
      await api.put(`/admin/withdrawals/${id}/${action}`, { notes });
      setNotes("");
      load();
    } finally {
      setActionId(null);
    }
  };

  const pendingTotal = items.filter((i) => i.status === "pending")
    .reduce((s, i) => s + i.amount, 0);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-fg">Withdrawals</h1>
          {statusFilter === "pending" && items.length > 0 && (
            <p className="text-sm text-accent mt-1">
              ${pendingTotal.toFixed(2)} pending across {items.length} request{items.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setLoading(true);
            setStatusFilter(e.target.value);
          }}
          className="bg-elevated border border-border rounded-xl px-4 py-2.5 text-sm text-fg outline-none focus:border-accent"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="paid">Paid</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="text-sm text-muted py-8 text-center">Loading…</div>
        ) : items.length === 0 ? (
          <div className="bg-elevated border border-border rounded-2xl px-5 py-12 text-center text-muted text-sm">
            No withdrawals
          </div>
        ) : (
          items.map((w) => (
            <div key={w.id} className="bg-elevated border border-border rounded-2xl p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-bold text-fg">{w.influencer_name}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${STATUS_STYLES[w.status] ?? STATUS_STYLES.pending}`}>
                      {w.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-3xl font-black text-accent tracking-tight">${w.amount.toFixed(2)}</p>
                  <div className="flex gap-4 mt-2 text-xs text-muted">
                    <span className="capitalize">{w.payment_method}</span>
                    <span>{w.payment_details}</span>
                    <span>{new Date(w.created_at).toLocaleDateString()}</span>
                  </div>
                  {w.notes && (
                    <p className="text-xs text-muted mt-2 italic">{w.notes}</p>
                  )}
                </div>

                {w.status === "pending" && (
                  <div className="flex flex-col gap-2 min-w-[160px]">
                    <input
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Notes (optional)"
                      className="text-xs bg-bg border border-border rounded-lg px-3 py-2 text-fg outline-none focus:border-accent"
                    />
                    <button
                      onClick={() => act(w.id, "approve")}
                      disabled={actionId === w.id}
                      className="bg-accent text-accent-ink text-xs font-bold px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
                    >
                      {actionId === w.id ? "…" : "✓ Approve"}
                    </button>
                    <button
                      onClick={() => act(w.id, "reject")}
                      disabled={actionId === w.id}
                      className="border border-red-400/30 text-red-400 text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-400/10 disabled:opacity-50"
                    >
                      ✕ Reject
                    </button>
                  </div>
                )}

                {w.status === "approved" && (
                  <button
                    onClick={() => act(w.id, "paid")}
                    disabled={actionId === w.id}
                    className="bg-accent text-accent-ink text-xs font-bold px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
                  >
                    {actionId === w.id ? "…" : "Mark as Paid"}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
