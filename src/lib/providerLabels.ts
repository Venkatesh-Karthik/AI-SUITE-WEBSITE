// Human-readable labels for the NextAuth provider ids stored on Account
// rows. Falls back to the raw id (capitalized) for any future provider.
const PROVIDER_LABELS: Record<string, string> = {
  google: "Google",
  "email-otp": "Email code",
};

export function providerLabel(id: string): string {
  return PROVIDER_LABELS[id] ?? id.charAt(0).toUpperCase() + id.slice(1);
}
