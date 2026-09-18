import { NextRequest, NextResponse } from "next/server";
import { exercise } from "../../../lib/exercises";
import { guardMedia, NO_STORE } from "../../../lib/mediaGuard";

/**
 * A stable URL for one movement's demo clip.
 *
 * The catalogue's media lives in a private bucket and the API hands out
 * presigned GETs that **expire within the hour** — deliberately, because the
 * footage is licensed and a public URL is a copy of the library anyone can
 * mirror. So a signed URL cannot be baked into a static page: it would 403
 * before most visitors arrived.
 *
 * This route is the indirection that fixes it. The page links here, this asks
 * the API for a fresh signature with the admin key (server-side only, never
 * shipped to a browser) and redirects. The page gets a URL that never goes
 * stale, the bucket keeps its short TTL, and `VideoObject.contentUrl` gets to
 * name something permanent — which is what a crawler needs.
 */
export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const blocked = guardMedia(_req);
  if (blocked) return blocked;

  const { slug } = await params;
  const found = exercise(slug);
  if (!found) return new NextResponse("Unknown exercise", { status: 404 });

  const base = (process.env.API_URL || "").replace(/\/$/, "");
  const key = process.env.ADMIN_API_KEY;
  if (!base || !key) return new NextResponse("Media not configured", { status: 503 });

  // The **web-media** endpoint, not the plain item one: it returns the
  // watermarked rendition where `build-media` has produced it, and falls back
  // to the clean file where it has not. The app keeps calling the clean
  // endpoint, so a subscriber never sees a mark on their own session.
  const res = await fetch(`${base}/exercises/admin/web-media/${encodeURIComponent(slug)}`, {
    headers: { "X-Admin-Key": key },
    // The upstream signature is short-lived, so there is nothing worth caching
    // here beyond the few minutes a crawler might re-request within.
    next: { revalidate: 300 },
  });
  if (!res.ok) return new NextResponse("Clip unavailable", { status: 502 });

  const row = await res.json();
  const url = row.demo_video_url || row.thumbnail_url;
  if (!url) return new NextResponse("No clip for this movement", { status: 404 });
  return NextResponse.redirect(url, { status: 302, headers: NO_STORE });
}
