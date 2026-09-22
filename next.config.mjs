import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
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