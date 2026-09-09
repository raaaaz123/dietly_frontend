/**
 * The three admin secrets, read once and refused when they are placeholders.
 *
 * `ADMIN_API_KEY` used to be read at two call sites, each with the same
 * `?? "vital-admin-dev-key"` fallback — a value committed to this repo. A
 * missing environment variable in production therefore did not fail; it
 * silently degraded, in two directions at once:
 *
 *   1. `api/admin/[...path]` signed every upstream request with a published
 *      key, which the backend accepts if that is also its deployed value.
 *   2. `lib/adminSession` derives the session cookie's HMAC key from the same
 *      variable, so the cookie was signed with a published secret — meaning
 *      anyone who read this repo could *forge* an admin session rather than
 *      merely reuse a key. That is the worse half, and the audit that found
 *      the first one did not mention it.
 *
 * `ADMIN_PASSWORD` had the same shape and defaulted to `admin`.
 *
 * Fail closed here rather than at module load. `next build` imports route
 * modules, and the environment a container gets at build time is not the one
 * it gets at runtime — a module-load throw would turn "the key is missing"
 * into "the image cannot be built", permanently, on any platform that injects
 * secrets at start rather than at build. Throwing on first *use* fails every
 * real request instead, which is the behaviour that was wanted: no request is
 * ever signed with a default, and the admin panel returns an error that names
 * the missing variable.
 *
 * Outside production the documented dev values still work, so `npm run dev`
 * against a local backend needs no setup.
 */

/** The values committed to `.env.example`. Treated as "not set" in production. */
const PLACEHOLDERS = new Set(["vital-admin-dev-key", "admin", "change-me", ""]);

const DEV_DEFAULTS = {
  ADMIN_API_KEY: "vital-admin-dev-key",
  ADMIN_USERNAME: "admin",
  ADMIN_PASSWORD: "admin",
} as const;

type SecretName = keyof typeof DEV_DEFAULTS;

const isProduction = process.env.NODE_ENV === "production";

/** Every secret that is missing or still set to its published placeholder. */
export function missingSecrets(): SecretName[] {
  return (Object.keys(DEV_DEFAULTS) as SecretName[]).filter((name) => {
    const value = (process.env[name] ?? "").trim();
    return !value || PLACEHOLDERS.has(value);
  });
}

// Said once at startup, so the reason is in the logs before the first request
// rather than only in whatever the browser happens to show.
if (isProduction) {
  const missing = missingSecrets();
  if (missing.length) {
    console.error(
      `[admin] FAIL CLOSED: ${missing.join(", ")} ${
        missing.length === 1 ? "is" : "are"
      } unset or still the published placeholder. Admin sign-in and every ` +
        `admin API call will be refused until these are set in the deployment ` +
        `environment.`
    );
  }
}

/**
 * One secret, or a thrown error naming it.
 *
 * The message is deliberately specific: the failure this replaces was silent,
 * and an operator who sees "Admin is not configured" with no variable name
 * gets to guess between three of them.
 */
export function secret(name: SecretName): string {
  const value = (process.env[name] ?? "").trim();

  if (!value || PLACEHOLDERS.has(value)) {
    if (!isProduction) return DEV_DEFAULTS[name];
    throw new AdminNotConfigured(name);
  }

  return value;
}

export class AdminNotConfigured extends Error {
  constructor(readonly variable: SecretName) {
    super(
      `${variable} is not set in this environment. Refusing to fall back to ` +
        `the development value, which is published in the repository.`
    );
    this.name = "AdminNotConfigured";
  }
}

/**
 * A 503 for a route that cannot proceed without a secret.
 *
 * 503 rather than 500: the deployment is misconfigured, not the request. The
 * body names the variable, because the person who hits this is the person who
 * can set it — and it leaks nothing, the name of an unset variable being the
 * one thing an attacker already knows from this open-source-shaped repo.
 */
export function notConfiguredResponse(error: unknown): Response | null {
  if (!(error instanceof AdminNotConfigured)) return null;
  return Response.json(
    { detail: `Admin is not configured on this deployment: ${error.message}` },
    { status: 503 }
  );
}
