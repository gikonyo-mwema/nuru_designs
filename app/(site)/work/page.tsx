import Image from 'next/image';
import Link from 'next/link';
import { getPayload } from 'payload';

import config from '@payload-config';

const categories = [
  ['all', 'All work'],
  ['brand-identity', 'Branding'],
  ['posters', 'Posters'],
  ['banners', 'Banners'],
  ['menus', 'Menus'],
  ['social-media', 'Social media'],
  ['corporate', 'Corporate'],
  ['church', 'Church'],
  ['campaigns', 'Campaigns'],
  ['charity', 'Charity and NGO'],
] as const;

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category?: string;
  client?: string;
  year?: number;
  heroImage: string | { url?: string; alt?: string };
};

async function getProjects(category: string): Promise<Project[]> {
  if (!process.env.DATABASE_URI) {
    return [];
  }

  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'projects',
      ...(category !== 'all' ? { where: { category: { equals: category } } } : {}),
      sort: '-publishedAt',
      limit: 100,
    });

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
  const category = categories.some(([value]) => value === requestedCategory) ? requestedCategory : 'all';
  const projects = await getProjects(category);

  return (
    <main className="work-page">
      <section className="work-intro site-container">
        <p className="eyebrow">Proof of work</p>
        <h1>Ideas made<br /><em>visible.</em></h1>
        <p className="work-lead">A selection of identities, campaigns, and visual systems created for people and organizations with something worth saying.</p>
      </section>
      <nav className="work-filters site-container" aria-label="Filter work by category">
        {categories.map(([value, label]) => (
          <a className={category === value ? 'is-active' : ''} href={value === 'all' ? '/work' : `/work?category=${value}`} key={value}>{label}</a>
        ))}
      </nav>
      {projects.length === 0 ? (
        <div className="work-empty site-container"><p>No work has been added to this category yet.</p><Link href="/work">View all work <span aria-hidden="true">↗</span></Link></div>
      ) : (
        <div className="work-grid site-container">
          {projects.map((project) => {
            const image = typeof project.heroImage === 'object' ? project.heroImage : null;

            return (
              <Link key={project.id} href={`/work/${project.slug}`} className="work-card">
                <div className="work-card-image">
                  {image?.url ? (
                    <Image
                      src={image.url}
                      alt={image.alt || project.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : <span aria-hidden="true">N</span>}
                </div>
                <div className="work-card-meta"><h2>{project.title}</h2><span>{project.category ? categories.find(([value]) => value === project.category)?.[1] : 'Design project'}</span></div>
                <p>{project.client || project.description}</p>
                {project.year ? <small>{project.year}</small> : null}
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
