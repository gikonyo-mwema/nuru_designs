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

const placeholderProjects: Project[] = [
  {
    id: 'placeholder-brand-01',
    title: 'Kipepeo Coffee',
    slug: 'kipepeo-coffee',
    description: 'A warm, confident identity for a modern coffee brand.',
    category: 'brand-identity',
    client: 'Kipepeo Coffee',
    year: 2025,
    heroImage: { url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&auto=format&fit=crop&q=85', alt: 'Coffee branding placeholder' },
  },
  {
    id: 'placeholder-brand-02',
    title: 'Studio Form',
    slug: 'studio-form',
    description: 'A clean identity system for a design-led workspace.',
    category: 'brand-identity',
    client: 'Studio Form',
    year: 2024,
    heroImage: { url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=85', alt: 'Design studio branding placeholder' },
  },
  {
    id: 'placeholder-posters-01',
    title: 'After Dark',
    slug: 'after-dark',
    description: 'A bold visual system for an independent music event.',
    category: 'posters',
    client: 'After Dark Festival',
    year: 2025,
    heroImage: { url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&auto=format&fit=crop&q=85', alt: 'Concert event poster placeholder' },
  },
  {
    id: 'placeholder-posters-02',
    title: 'Sunday Sessions',
    slug: 'sunday-sessions',
    description: 'A lively poster series for a weekend music programme.',
    category: 'posters',
    client: 'The Junction',
    year: 2024,
    heroImage: { url: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1200&auto=format&fit=crop&q=85', alt: 'Live music poster placeholder' },
  },
  {
    id: 'placeholder-banners-01',
    title: 'Open Market',
    slug: 'open-market',
    description: 'Bright campaign banners that bring a city market to life.',
    category: 'banners',
    client: 'Open Market Nairobi',
    year: 2025,
    heroImage: { url: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&auto=format&fit=crop&q=85', alt: 'Market banner placeholder' },
  },
  {
    id: 'placeholder-banners-02',
    title: 'Made Here',
    slug: 'made-here',
    description: 'A flexible banner system celebrating local makers.',
    category: 'banners',
    client: 'Made Here Collective',
    year: 2024,
    heroImage: { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=85', alt: 'Retail banner placeholder' },
  },
  {
    id: 'placeholder-menus-01',
    title: 'Mara Table',
    slug: 'mara-table',
    description: 'A tactile menu direction for a seasonal restaurant.',
    category: 'menus',
    client: 'Mara Table',
    year: 2025,
    heroImage: { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=85', alt: 'Restaurant menu placeholder' },
  },
  {
    id: 'placeholder-menus-02',
    title: 'Soko Supper Club',
    slug: 'soko-supper-club',
    description: 'A playful menu system for a neighbourhood supper club.',
    category: 'menus',
    client: 'Soko Supper Club',
    year: 2024,
    heroImage: { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop&q=85', alt: 'Dinner table menu placeholder' },
  },
  {
    id: 'placeholder-social-01',
    title: 'Maji Skincare',
    slug: 'maji-skincare',
    description: 'An editorial social toolkit for a modern skincare line.',
    category: 'social-media',
    client: 'Maji Skincare',
    year: 2025,
    heroImage: { url: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=1200&auto=format&fit=crop&q=85', alt: 'Skincare social media placeholder' },
  },
  {
    id: 'placeholder-social-02',
    title: 'Common Ground',
    slug: 'common-ground',
    description: 'A flexible content direction for a community platform.',
    category: 'social-media',
    client: 'Common Ground',
    year: 2024,
    heroImage: { url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&auto=format&fit=crop&q=85', alt: 'Community social media placeholder' },
  },
  {
    id: 'placeholder-corporate-01',
    title: 'Northstar Advisory',
    slug: 'northstar-advisory',
    description: 'A precise visual identity for a people-first consultancy.',
    category: 'corporate',
    client: 'Northstar Advisory',
    year: 2025,
    heroImage: { url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&fit=crop&q=85', alt: 'Corporate office branding placeholder' },
  },
  {
    id: 'placeholder-corporate-02',
    title: 'Kijani Labs',
    slug: 'kijani-labs',
    description: 'A credible, optimistic identity for a growing innovation team.',
    category: 'corporate',
    client: 'Kijani Labs',
    year: 2024,
    heroImage: { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=85', alt: 'Collaborative office placeholder' },
  },
  {
    id: 'placeholder-church-01',
    title: 'New Dawn',
    slug: 'new-dawn',
    description: 'A welcoming identity and event system for a growing church.',
    category: 'church',
    client: 'New Dawn Church',
    year: 2025,
    heroImage: { url: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1200&auto=format&fit=crop&q=85', alt: 'Church interior branding placeholder' },
  },
  {
    id: 'placeholder-church-02',
    title: 'Gather',
    slug: 'gather',
    description: 'A warm campaign identity for a season of community.',
    category: 'church',
    client: 'Gather Community',
    year: 2024,
    heroImage: { url: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&auto=format&fit=crop&q=85', alt: 'Community gathering placeholder' },
  },
  {
    id: 'placeholder-campaigns-01',
    title: 'Future Forward',
    slug: 'future-forward',
    description: 'Campaign direction built to make a social idea impossible to miss.',
    category: 'campaigns',
    client: 'Future Forward Kenya',
    year: 2025,
    heroImage: { url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&fit=crop&q=85', alt: 'Campaign design placeholder' },
  },
  {
    id: 'placeholder-campaigns-02',
    title: 'Small Steps',
    slug: 'small-steps',
    description: 'A human campaign system for a big public health message.',
    category: 'campaigns',
    client: 'Small Steps Initiative',
    year: 2024,
    heroImage: { url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&auto=format&fit=crop&q=85', alt: 'Public campaign placeholder' },
  },
  {
    id: 'placeholder-charity-01',
    title: 'Water For All',
    slug: 'water-for-all',
    description: 'A clear, hopeful identity for a clean-water nonprofit.',
    category: 'charity',
    client: 'Water For All',
    year: 2025,
    heroImage: { url: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=1200&auto=format&fit=crop&q=85', alt: 'Charity project placeholder' },
  },
  {
    id: 'placeholder-charity-02',
    title: 'Bright Futures',
    slug: 'bright-futures',
    description: 'A friendly visual language for a youth education programme.',
    category: 'charity',
    client: 'Bright Futures NGO',
    year: 2024,
    heroImage: { url: 'https://images.unsplash.com/photo-1504159506876-f8338247a14a?w=1200&auto=format&fit=crop&q=85', alt: 'Youth education charity placeholder' },
  },
];

function getPlaceholderProjects(category: string): Project[] {
  return category === 'all'
    ? placeholderProjects
    : placeholderProjects.filter((project) => project.category === category);
}

async function getProjects(category: string): Promise<Project[]> {
  if (!process.env.DATABASE_URI) {
    return getPlaceholderProjects(category);
  }

  try {
    const payload = await getPayload({ config });
    const result = await Promise.race([
      payload.find({
        collection: 'projects',
        ...(category !== 'all' ? { where: { category: { equals: category } } } : {}),
        sort: '-publishedAt',
        limit: 100,
      }),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Project database lookup timed out')), 1500);
      }),
    ]);

    return result.docs.length > 0
      ? result.docs as unknown as Project[]
      : getPlaceholderProjects(category);
  } catch {
    return getPlaceholderProjects(category);
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
