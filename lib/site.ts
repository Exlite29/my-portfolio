/**
 * Canonical site origin used by metadata, sitemap and robots.
 * Set NEXT_PUBLIC_SITE_URL in the deployment environment (e.g. your Vercel
 * domain); the localhost fallback keeps local builds working.
 */
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
);
