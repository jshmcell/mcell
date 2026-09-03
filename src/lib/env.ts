/**
 * Env resolution helper.
 *
 * Production (Vercel) exposes DB secrets under the MCELL_ prefix
 * (e.g. MCELL_DATABASE_URL), while local dev uses the plain names
 * (DATABASE_URL = ${MCELL_DATABASE_URL} expansion). This resolves either.
 */
export function prefixedEnv(
  name: string,
  ...fallbacks: string[]
): string | undefined {
  const candidates = [`MCELL_${name}`, name, ...fallbacks];
  for (const key of candidates) {
    const v = process.env[key];
    if (v) return v;
  }
  return undefined;
}
