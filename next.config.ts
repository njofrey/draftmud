import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
];

// Optional Content Security Policy example. Uncomment and adjust if CSP is required.
// const ContentSecurityPolicy = [
//   "default-src 'self'",
//   "script-src 'self' 'unsafe-inline' www.googletagmanager.com connect.facebook.net",
//   "connect-src 'self' www.google-analytics.com www.googletagmanager.com connect.facebook.net",
//   "img-src 'self' data: blob: www.google-analytics.com www.googletagmanager.com connect.facebook.net res.cloudinary.com",
//   "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
//   "font-src 'self' data:",
//   "media-src 'self'",
//   "frame-src 'self' www.youtube.com connect.facebook.net",
// ].join('; ');

const nextConfig: NextConfig = {
  images: {
    // Formatos modernos para mejor compresión
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    // Tamaños de dispositivos para optimización responsive
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache de imágenes (60 segundos)
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
