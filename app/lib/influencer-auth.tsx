"use client";
import {
  createContext, useContext, useEffect, useState, ReactNode,
} from "react";
import {
  User, onAuthStateChanged, signInWithPopup, signOut as fbSignOut,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type AppStatus = "loading" | "none" | "pending" | "active" | "rejected" | "suspended";

export interface InfluencerData {
  uid: string;
  name: string;
  email: string;
  referral_code: string;
  commission_rate: number;
  status: string;
  instagram?: string | null;
  tiktok?: string | null;
  youtube?: string | null;
  niche?: string | null;
  audience_size?: string | null;
  total_referrals: number;
  paid_conversions: number;
  total_earned: number;
  available_balance: number;
  pending_balance: number;
}

interface InfluencerAuthCtx {
  firebaseUser: User | null;
  loading: boolean;
  appStatus: AppStatus;
  influencerData: InfluencerData | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
  refreshStatus: () => Promise<void>;
  getToken: () => Promise<string>;
  apiFetch: <T>(method: string, path: string, body?: unknown) => Promise<T>;
}

const Ctx = createContext<InfluencerAuthCtx>({
  firebaseUser: null,
  loading: true,
  appStatus: "loading",
  influencerData: null,
  signInWithGoogle: async () => {},
  signOut: () => {},
  refreshStatus: async () => {},
  getToken: async () => "",
  apiFetch: async () => { throw new Error("not ready"); },
});

async function fetchStatus(user: User): Promise<{ appStatus: AppStatus; data: InfluencerData | null }> {
  try {
    const token = await user.getIdToken();
    const res = await fetch(`${BASE}/referrals/application-status`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 404) return { appStatus: "none", data: null };
    if (!res.ok) return { appStatus: "none", data: null };
    const data: InfluencerData = await res.json();
    return { appStatus: data.status as AppStatus, data };
  } catch {
    return { appStatus: "none", data: null };
  }
}

export function InfluencerAuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [appStatus, setAppStatus] = useState<AppStatus>("loading");
  const [influencerData, setInfluencerData] = useState<InfluencerData | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setFirebaseUser(u);
      if (u) {
        const { appStatus: s, data } = await fetchStatus(u);
        setAppStatus(s);
        setInfluencerData(data);
      } else {
        setAppStatus("none");
        setInfluencerData(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const signInWithGoogle = async () => {
    const cred = await signInWithPopup(auth, googleProvider);
    const { appStatus: s, data } = await fetchStatus(cred.user);
    setAppStatus(s);
    setInfluencerData(data);
  };

  const signOut = () => {
    fbSignOut(auth);
    setFirebaseUser(null);
    setAppStatus("none");
    setInfluencerData(null);
  };

  const refreshStatus = async () => {
    if (!firebaseUser) return;
    const { appStatus: s, data } = await fetchStatus(firebaseUser);
    setAppStatus(s);
    setInfluencerData(data);
  };

  const getToken = async (): Promise<string> => {
    if (!firebaseUser) return "";
    return firebaseUser.getIdToken();
  };

  const apiFetch = async <T,>(method: string, path: string, body?: unknown): Promise<T> => {
    const token = await getToken();
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${BASE}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: res.statusText }));
      throw new Error(err.detail ?? "Request failed");
    }
    return res.json() as Promise<T>;
  };

  return (
    <Ctx.Provider value={{
      firebaseUser, loading, appStatus, influencerData,
      signInWithGoogle, signOut, refreshStatus, getToken, apiFetch,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export const useInfluencerAuth = () => useContext(Ctx);
