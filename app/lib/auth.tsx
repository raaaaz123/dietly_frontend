"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USERNAME ?? "admin";
const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "admin";
const SESSION_KEY = "vital_admin_session";

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

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    setIsAdmin(stored === "1");
    setLoading(false);
  }, []);

  const signIn = async (username: string, password: string) => {
    if (username.trim() === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setIsAdmin(true);
    } else {
      throw new Error("Invalid username or password");
    }
  };

  const signOut = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAdmin(false);
  };

  return (
    <Ctx.Provider value={{ isAdmin, loading, signIn, signOut }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
