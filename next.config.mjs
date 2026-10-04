import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  serverExternalPackages: [
    '@payloadcms/db-postgres',
    'drizzle-kit',
    'esbuild',
    '@esbuild/linux-x64',
  ],
  env: {
    PAYLOAD_PUBLIC_DRAFT_SECRET: process.env.PAYLOAD_PUBLIC_DRAFT_SECRET,
  },
};

export default withPayload(nextConfig);