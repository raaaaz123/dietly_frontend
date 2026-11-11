/**
 * `/exercises.json`: the whole exercise catalogue, machine-readable, for AI
 * agents, assistants and developers. Linked from llms.txt, from a
 * `rel="alternate"` on /exercises and from the Dataset markup there.
 * Built once at deploy time.
 */
import { catalogueJson } from "../lib/exerciseData";

export const dynamic = "force-static";

export function GET() {
  return Response.json(catalogueJson(), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
