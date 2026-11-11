/** The compact search index /exercises loads when a visitor starts searching. */
import { searchIndex } from "../lib/exerciseData";

export const dynamic = "force-static";

export function GET() {
  return Response.json(searchIndex(), {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
