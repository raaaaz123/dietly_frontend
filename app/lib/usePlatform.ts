"use client";

import { useEffect, useState } from "react";
import { detectPlatform, type Platform } from "./platform";

/** The visitor's platform, or null until after hydration (server render shows both stores). */
export function usePlatform(): Platform | null {
  const [p, setP] = useState<Platform | null>(null);
  useEffect(() => setP(detectPlatform()), []);
  return p;
}
