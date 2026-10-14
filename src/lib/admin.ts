// Server-only admin authorization. ADMIN_EMAIL is read from the
// environment (never hardcoded, never exposed to the client) and compared
// against the authenticated user's verified email. This file has no
// Edge-incompatible dependencies, but it's still only ever meant to be
// used from Server Components / Route Handlers, never client components.

/** True if `email` matches the configured ADMIN_EMAIL (case-insensitive). */
export function isAdminEmail(email?: string | null): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || !email) return false;
  return email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
}
