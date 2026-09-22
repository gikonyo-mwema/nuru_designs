import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';

import Projects from './collections/Projects';
import Media from './collections/Media';
import Users from './collections/Users';
import ContactSubmissions from './collections/ContactSubmissions';

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [Users, Projects, Media, ContactSubmissions],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI?.trim() || '',
      max: 1,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 30_000,
      keepAlive: true,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    push: false,
  }),
  upload: {
    limits: {
      fileSize: 50_000_000, // 50MB
    },
  },
});
