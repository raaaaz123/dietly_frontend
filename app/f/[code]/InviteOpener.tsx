"use client";

import { useEffect } from "react";

/**
 * Try to hand the code straight to the app.
 *
 * Only ever a fallback. When the association file is doing its job, iOS opens
 * the app before this page loads and nothing here runs. This is for the case
 * where it does not — an old iOS, a link opened inside an in-app browser that
 * swallows universal links, or a device where the association has not been
 * fetched yet.
 *
 * Fired after a beat rather than immediately: a custom-scheme navigation that
 * finds no app shows an error dialog, and doing that before the page has even
 * rendered means the visitor sees the failure and never sees the code.
 */
export default function InviteOpener({ code }: { code: string }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = `dietly://friend/${code}`;
    }, 600);
    return () => clearTimeout(timer);
  }, [code]);

  return null;
}
