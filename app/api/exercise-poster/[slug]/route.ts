import { NextRequest, NextResponse } from "next/server";
import { exercise } from "../../../lib/exercises";
import { guardMedia, NO_STORE } from "../../../lib/mediaGuard";

/**
 * A stable URL for one movement's still, alongside `exercise-clip`.
 *
 * Same problem, same shape: the poster lives in the private bucket behind a
 * signature that expires within the hour, so it cannot be baked into a static
 * page. Without it the `<video>` on a detail page renders as an empty black
 * rectangle until somebody presses play, and the library grid has nothing to
 * show at all — which is how this shipped the first time.
 *
 * The upstream sign is cached for five minutes, so a category page drawing
 * ninety thumbnails re-signs each key at most once per window rather than once
 * per visitor.
 */
export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const blocked = guardMedia(_req);
  if (blocked) return blocked;

  const { slug } = await params;
  if (!exercise(slug)) return new NextResponse("Unknown exercise", { status: 404 });

  const base = (process.env.API_URL || "").replace(/\/$/, "");
  const key = process.env.ADMIN_API_KEY;
  if (!base || !key) return new NextResponse("Media not configured", { status: 503 });

  // The **web-media** endpoint, not the plain item one: it returns the
  // watermarked rendition where `build-media` has produced it, and falls back
  // to the clean file where it has not. The app keeps calling the clean
  // endpoint, so a subscriber never sees a mark on their own session.
  const res = await fetch(`${base}/exercises/admin/web-media/${encodeURIComponent(slug)}`, {
    headers: { "X-Admin-Key": key },
    next: { revalidate: 300 },
  });
  if (!res.ok) return new NextResponse("Poster unavailable", { status: 502 });

  const row = await res.json();
  const url = row.thumbnail_url;
  if (!url) return new NextResponse("No poster for this movement", { status: 404 });
  return NextResponse.redirect(url, { status: 302, headers: NO_STORE });
}
