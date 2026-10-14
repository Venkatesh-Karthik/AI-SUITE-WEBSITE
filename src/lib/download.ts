// Single source of truth for the installer. Reads server-side env vars
// so the real URL is never hardcoded into components, and can be
// swapped (e.g. for a signed CDN URL) without touching UI code.

export function getDownloadInfo() {
  const url = process.env.DOWNLOAD_URL || null;
  const version = process.env.DOWNLOAD_VERSION || null;
  const sizeMb = process.env.DOWNLOAD_SIZE_MB || null;
  const releaseDate = process.env.DOWNLOAD_RELEASE_DATE || null;

  return {
    url,
    version,
    sizeMb,
    releaseDate,
    configured: Boolean(url),
  };
}
