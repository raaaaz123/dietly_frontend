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

  const row = await fetchRow(base, key, slug);
  if (!row) return new NextResponse("Clip unavailable", { status: 502 });

  const url = row.demo_video_url || row.thumbnail_url;
  if (!url) return new NextResponse("No clip for this movement", { status: 404 });
  return NextResponse.redirect(url, { status: 302, headers: NO_STORE });
}

/** Tries the watermarked route, then the clean one.
 *
 *  Not belt-and-braces: pointing this at `web-media` alone broke every clip and
 *  thumbnail on the site the moment it shipped, because the frontend deployed
 *  before the backend route existed and a 404 upstream became a 502 here. Two
 *  independently deployed services cannot be assumed to move together, so the
 *  newer route is an upgrade rather than a dependency. */
async function fetchRow(
  base: string,
  key: string,
  slug: string,
): Promise<Record<string, string> | null> {
  const paths = [
    `/exercises/admin/web-media/${encodeURIComponent(slug)}`,
    `/exercises/admin/item/${encodeURIComponent(slug)}`,
  ];
  for (const path of paths) {
    try {
      const res = await fetch(`${base}${path}`, {
        headers: { "X-Admin-Key": key },
        // The upstream signature is short-lived, so there is nothing worth
        // caching beyond the few minutes a crawler might re-request within.
        next: { revalidate: 300 },
      });
      if (res.ok) return (await res.json()) as Record<string, string>;
    } catch {
      // A network error on the first path must still let the second try.
    }
  }
  return null;
}
