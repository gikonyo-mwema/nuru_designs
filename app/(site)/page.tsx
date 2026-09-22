import Image from 'next/image';
import Link from 'next/link';
import { getPayload } from 'payload';

import config from '@payload-config';

type Project = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  category?: string;
  heroImage?: string | { url?: string; alt?: string };
};

async function getFeaturedProjects(): Promise<Project[]> {
  if (!process.env.DATABASE_URI) return [];

  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'projects',
      sort: '-publishedAt',
      limit: 3,
    });

    return result.docs as unknown as Project[];
  } catch {
    return [];
  }
}

const services = [
  ['01', 'Brand identity', 'Distinctive systems that give your business a clear voice and a memorable point of view.'],
  ['02', 'Digital experiences', 'Thoughtful websites and interfaces that turn attention into meaningful action.'],
  ['03', 'Campaign design', 'Cohesive visual direction for launches, campaigns, and the moments that matter.'],
];

export default async function Home() {
  const projects = await getFeaturedProjects();

  return (
    <main>
      <section className="hero-section site-container">
        <div className="hero-copy">
          <p className="eyebrow reveal">Independent design studio</p>
          <h1 className="hero-title reveal reveal-delay-1">
            Make your brand <em>impossible</em> to overlook.
          </h1>
          <p className="hero-intro reveal reveal-delay-2">
            Nuru Designs creates bold identities and digital experiences for businesses ready to be remembered.
          </p>
          <div className="hero-actions reveal reveal-delay-3">
            <Link href="/contact" className="button button-dark">Start a project <span aria-hidden="true">↗</span></Link>
            <Link href="/work" className="text-link">Explore selected work <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="hero-art reveal reveal-delay-2" aria-label="Nuru Designs visual mark" role="img">
          <div className="hero-art-top"><span>ND / 001</span><span>Est. 2024</span></div>
          <div className="hero-art-mark">N<span>u</span></div>
          <div className="hero-art-bottom"><span>Ideas with intent</span><span>Scroll to explore ↓</span></div>
        </div>
      </section>

      <section className="proof-band">
        <div className="site-container proof-grid">
          <p>Built for brands with something to say.</p>
          <div><strong>Branding</strong><span>Digital design</span><span>Campaigns</span></div>
          <div><strong>Strategy-led</strong><span>Detail-obsessed</span><span>Built to last</span></div>
        </div>
      </section>

      <section className="section site-container" id="work">
        <div className="section-heading">
          <div><p className="eyebrow">Selected work</p><h2>Good design earns attention.</h2></div>
          <Link href="/work" className="text-link">View all work <span aria-hidden="true">↗</span></Link>
        </div>
        {projects.length > 0 ? (
          <div className="project-grid">
            {projects.map((project) => {
              const image = typeof project.heroImage === 'object' ? project.heroImage : null;
              return (
                <Link href={`/work/${project.slug}`} key={project.id} className="project-card">
                  <div className="project-image">
                    {image?.url ? <Image src={image.url} alt={image.alt || project.title} fill className="object-cover" /> : <div className="project-placeholder">N</div>}
                  </div>
                  <div className="project-meta"><h3>{project.title}</h3><span>{project.category || 'Brand identity'} ↗</span></div>
                  {project.description && <p>{project.description}</p>}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="work-placeholder"><span>Selected work is on its way.</span><Link href="/contact" className="text-link">Work with us <span aria-hidden="true">↗</span></Link></div>
        )}
      </section>

      <section className="section section-tint">
        <div className="site-container service-layout">
          <div><p className="eyebrow">What we do</p><h2>Clarity, character, and craft.</h2><p className="section-intro">From first thought to final pixel, we help ambitious businesses show up with confidence.</p></div>
          <div className="service-list">{services.map(([number, title, description]) => <div className="service-row" key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div><span className="service-arrow" aria-hidden="true">↗</span></div>)}</div>
        </div>
      </section>

      <section className="section site-container process-section">
        <div><p className="eyebrow">A considered process</p><h2>From rough idea<br /><em>to clear signal.</em></h2></div>
        <div className="process-list"><div><span>01</span><h3>Discover</h3><p>We find the sharpest truth in your business.</p></div><div><span>02</span><h3>Define</h3><p>We shape the strategy and visual direction.</p></div><div><span>03</span><h3>Deliver</h3><p>We build a system made to move with you.</p></div></div>
      </section>

      <section className="contact-band"><div className="site-container contact-content"><p className="eyebrow">Have a project in mind?</p><h2>Let&apos;s make it<br /><em>unmistakable.</em></h2><Link href="/contact" className="button button-light">Start a conversation <span aria-hidden="true">↗</span></Link></div></section>
    </main>
  );
}