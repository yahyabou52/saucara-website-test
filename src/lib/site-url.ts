const localSiteUrl = "http://localhost:3000";

export function resolveSiteUrl(
  configuredUrl = process.env.NEXT_PUBLIC_SITE_URL,
): URL {
  if (!configuredUrl?.trim()) return new URL(localSiteUrl);

  try {
    const candidate = new URL(configuredUrl);
    if (!["http:", "https:"].includes(candidate.protocol)) {
      return new URL(localSiteUrl);
    }

    return new URL(candidate.origin);
  } catch {
    return new URL(localSiteUrl);
  }
}
