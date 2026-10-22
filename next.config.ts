import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework in responses.
  poweredByHeader: false,
  async headers() {
    return [
      {
        // Baseline hardening for every route. CSP is intentionally omitted:
        // Next.js injects inline scripts/styles, so it needs a nonce-based
        // setup to avoid breaking the 3D scene and theme flash.
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
