const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL;

export const siteUrl = configuredSiteUrl
  ? new URL(/^https?:\/\//i.test(configuredSiteUrl) ? configuredSiteUrl : `https://${configuredSiteUrl}`)
  : new URL('http://localhost:3000');