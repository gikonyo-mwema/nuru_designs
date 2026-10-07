import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import dns from 'node:dns';
import { readFileSync } from 'node:fs';
import net from 'node:net';
import path from 'path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

import Projects from './collections/Projects';
import Media from './collections/Media';
import Users from './collections/Users';
import ContactSubmissions from './collections/ContactSubmissions';
import Services from './collections/Services';
import FAQs from './collections/FAQs';
import Teams from './collections/Teams';
import SiteContent from './globals/SiteContent';
import { cloudinaryAdapter, isCloudinaryConfigured } from './lib/cloudinary-adapter';

dns.setDefaultResultOrder('ipv4first');
net.setDefaultAutoSelectFamily(false);

const dirname = path.dirname(fileURLToPath(import.meta.url));
const databaseURI = process.env.DATABASE_URI?.trim() || '';
const databaseSslCaFile = process.env.DATABASE_SSL_CA_FILE?.trim();
const databaseSslCa = databaseSslCaFile
  ? readFileSync(databaseSslCaFile, 'utf8')
  : process.env.DATABASE_SSL_CA?.replace(/\\n/g, '\n').trim();
const databaseSslRejectUnauthorized = process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'false';
const payloadSecret = process.env.PAYLOAD_SECRET?.trim() || '';

if (payloadSecret.length < 32) {
  throw new Error('PAYLOAD_SECRET must be set to a value of at least 32 characters.');
}

// Production filesystems are ephemeral, so uploads must never fall back to local disk.
if (process.env.NODE_ENV === 'production' && !isCloudinaryConfigured) {
  throw new Error('Set CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET and NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME for media uploads.');
}

export default buildConfig({
  admin: {
    user: 'users',
    components: {
      beforeDashboard: ['/components/admin/WebsiteShortcuts#default'],
    },
  },
  collections: [Users, Projects, Media, Services, FAQs, Teams, ContactSubmissions],
  globals: [SiteContent],
  editor: lexicalEditor(),
  plugins: [
    cloudStoragePlugin({
      enabled: isCloudinaryConfigured,
      collections: {
        media: {
          adapter: cloudinaryAdapter,
          disableLocalStorage: true,
          disablePayloadAccessControl: true,
        },
      },
    }),
  ],
  secret: payloadSecret,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseURI,
      max: 5,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 30_000,
      keepAlive: true,
      ssl: {
        ...(databaseSslCa ? { ca: databaseSslCa } : {}),
        rejectUnauthorized: databaseSslRejectUnauthorized,
      },
    },
    push: false,
  }),
  upload: {
    limits: {
      fileSize: 10_000_000, // Cloudinary free-plan image limit
    },
  },
});
