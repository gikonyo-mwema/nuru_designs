import type { MetadataRoute } from 'next';
import { getPayload } from 'payload';

import config from '@payload-config';
import { siteUrl } from '@/lib/site-url';
import { services } from '@/lib/services';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    '',
    '/services',
    ...services.map(({ slug }) => `/services/${slug}`),
    '/work',
    '/about',
    '/contact',
  ];

  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    changeFrequency: route === '/work' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));

  if (!process.env.DATABASE_URI) return staticRoutes;

  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    const payload = await getPayload({ config });
    const projects = await Promise.race([
      payload.find({
        collection: 'projects',
        where: { status: { equals: 'published' } },
        limit: 5000,
        select: { slug: true, updatedAt: true, publishedAt: true },
      }),
      new Promise<never>((_, reject) => {
        timeout = setTimeout(() => reject(new Error('Sitemap project lookup timed out')), 1500);
      }),
    ]);

    return [
      ...staticRoutes,
      ...projects.docs.map((project) => ({
        url: new URL(`/work/${project.slug}`, siteUrl).toString(),
        lastModified: project.updatedAt || project.publishedAt || undefined,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
    ];
  } catch {
    // Keep crawler metadata available even when Payload cannot answer in time.
    return staticRoutes;
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}