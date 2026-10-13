import type { Metadata } from 'next';

import WorkArchive from '@/components/work/WorkArchive';
import { projectCategories } from '@/lib/project-categories';
import { getPayloadClient } from '@/lib/payload-client';

export const metadata: Metadata = {
  title: 'Selected Work',
  description: 'Explore selected brand identity, campaign, social media, and print design work by Nuru Designs.',
};

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category?: string;
  client?: string;
  year?: number;
  tags?: string[];
  heroImage: string | { url?: string; alt?: string };
};

async function getProjects(): Promise<Project[]> {
  const payload = await getPayloadClient();
  if (!payload) return [];

  try {
    const result = await Promise.race([
      payload.find({
        collection: 'projects',
        where: {
          status: { equals: 'published' },
        },
        sort: 'sortOrder,-publishedAt',
        limit: 100,
      }),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Project database lookup timed out')), 15000);
      }),
    ]);

    return result.docs as unknown as Project[];
  } catch {
    return [];
  }
}

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: requestedCategory = 'all' } = await searchParams;
  const projects = await getProjects();
  const assignedCategories = new Set(projects.map((project) => project.category).filter(Boolean));
  const categories = [
    ['all', 'All work'] as const,
    ...projectCategories.filter(([value]) => assignedCategories.has(value)),
  ];
  const category = categories.some(([value]) => value === requestedCategory) ? requestedCategory : 'all';

  return (
    <main className="work-page">
      <section className="work-intro site-container">
        <p className="eyebrow">Proof of work</p>
        <h1>Ideas made<br /><em>visible.</em></h1>
        <p className="work-lead">A selection of identities, campaigns, and visual systems created for people and organizations with something worth saying.</p>
      </section>
      <WorkArchive projects={projects} categories={categories} initialCategory={category} />
    </main>
  );
}
