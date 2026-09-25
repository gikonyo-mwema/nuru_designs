import Link from 'next/link';
import { Megaphone, Palette, PenTool, Printer } from 'lucide-react';
import { getPayload } from 'payload';

import config from '@payload-config';
import SelectedWorkGallery from '@/components/work/SelectedWorkGallery';
import { services } from '@/lib/services';

type Project = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  category?: string;
  heroImage?: string | { url?: string; alt?: string };
};

const placeholderProjects: Project[] = [
  {
    id: 'placeholder-logo',
    title: 'Kipepeo Coffee',
    slug: 'kipepeo-coffee',
    description: 'A warm, confident identity for a modern coffee brand.',
    category: 'brand-identity',
    heroImage: { url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&auto=format&fit=crop&q=85', alt: 'Coffee branding placeholder' },
  },
  {
    id: 'placeholder-event',
    title: 'After Dark',
    slug: 'after-dark',
    description: 'A bold visual system for an independent music event.',
    category: 'posters',
    heroImage: { url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&auto=format&fit=crop&q=85', alt: 'Concert event poster placeholder' },
  },
  {
    id: 'placeholder-campaign',
    title: 'Future Forward',
    slug: 'future-forward',
    description: 'Campaign direction built to make a social idea impossible to miss.',
    category: 'campaigns',
    heroImage: { url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&fit=crop&q=85', alt: 'Campaign design placeholder' },
  },
  {
    id: 'placeholder-brand',
    title: 'Studio Form',
    slug: 'studio-form',
    description: 'A clean identity system for a design-led workspace.',
    category: 'brand-identity',
    heroImage: { url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=85', alt: 'Studio interior placeholder' },
  },
];

async function getFeaturedProjects(): Promise<Project[]> {
  if (!process.env.DATABASE_URI) return placeholderProjects;

  try {
    const payload = await getPayload({ config });
    const result = await Promise.race([
      payload.find({
        collection: 'projects',
        sort: '-publishedAt',
        limit: 3,
      }),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Featured project lookup timed out')), 1500);
      }),
    ]);

    return result.docs.length > 0 ? result.docs as unknown as Project[] : placeholderProjects;
  } catch {
    return placeholderProjects;
  }
}

export default async function Home() {
  const projects = await getFeaturedProjects();

  return (
    <main>
      <section className="hero-section">
        <div className="hero-background" aria-hidden="true" />
        <div className="site-container hero-content">
          <div className="hero-copy">
            <p className="eyebrow reveal">Independent design studio</p>
            <h1 className="hero-title reveal reveal-delay-1">
              Make your brand <em>impossible</em> to overlook.
            </h1>
            <p className="hero-intro reveal reveal-delay-2">
              Nuru Designs creates bold identities and digital experiences for businesses ready to be remembered.
            </p>
            <div className="hero-actions reveal reveal-delay-3">
              <Link href="/contact" className="button button-light">Start a project <span aria-hidden="true">↗</span></Link>
              <Link href="/work" className="text-link">Explore selected work <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Client trust statement">
        <div className="site-container trust-strip-inner">
          <p className="eyebrow">Trusted by ambitious brands</p>
          <div className="trust-sectors" aria-label="Client sectors">
            <span>Founders</span><span>Restaurants</span><span>Events</span><span>Startups</span><span>Retail</span><span>Culture</span>
          </div>
          <p className="trust-note">30+ brands across Kenya — from first-time founders to established names.</p>
        </div>
      </section>

      <section className="section site-container" id="work">
        <div className="section-heading">
          <div><p className="eyebrow">Selected work</p><h2>Good design earns attention.</h2></div>
          <Link href="/work" className="text-link">View all work <span aria-hidden="true">↗</span></Link>
        </div>
        {projects.length > 0 ? <SelectedWorkGallery projects={projects} /> : (
          <div className="work-placeholder"><span>Selected work is on its way.</span><Link href="/contact" className="text-link">Work with us <span aria-hidden="true">↗</span></Link></div>
        )}
      </section>

      <section className="proof-band stats-positioning" aria-label="Nuru Designs results and positioning">
        <div className="site-container">
          <div className="stats-positioning-heading"><p>Built for brands with something to say.</p></div>
          <div className="results-grid"><div><strong>100+</strong><span>Projects</span></div><div><strong>5+</strong><span>Years</span></div><div><strong>4.8★</strong><span>Rating</span></div><div><strong>30+</strong><span>Brands</span></div></div>
          <div className="positioning-points"><span>Branding</span><span>Digital design</span><span>Campaigns</span><span>Strategy-led</span><span>Detail-obsessed</span></div>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="site-container">
          <div className="services-intro-centered"><p className="eyebrow">Client stories</p><h2>Good work gets remembered.</h2><p className="section-intro">The clearest proof is what changes for the people we work with.</p></div>
          <div className="testimonials-cards">
            <article className="testimonial-card"><div className="testimonial-person"><div className="testimonial-face testimonial-face-jane" role="img" aria-label="Portrait of Jane W." /><div><strong>Jane W.</strong><span>Founder, Mara Coffee Co.</span></div></div><blockquote>Nuru redesigned our packaging and our retail orders went up 40% in two months. They just get it.</blockquote></article>
            <article className="testimonial-card"><div className="testimonial-person"><div className="testimonial-face testimonial-face-david" role="img" aria-label="Portrait of David K." /><div><strong>David K.</strong><span>Director, Lumen Events</span></div></div><blockquote>Our launch filled faster than any event we have run before. The campaign gave people a reason to care.</blockquote></article>
            <article className="testimonial-card"><div className="testimonial-person"><div className="testimonial-face testimonial-face-amina" role="img" aria-label="Portrait of Amina N." /><div><strong>Amina N.</strong><span>Co-founder, Kijani Labs</span></div></div><blockquote>We finally look as credible as the work we do. Investor conversations became much easier.</blockquote></article>
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="site-container services-section">
          <div className="services-intro-centered"><p className="eyebrow">What we do</p><h2>Clarity, character, and craft.</h2><p className="section-intro">From first thought to final pixel, we help ambitious businesses show up with confidence.</p></div>
          <div className="services-cards">
            {services.map((service) => (
              <Link href={`/services/${service.slug}`} className="service-card service-card-plain" key={service.slug}>
                <div className="service-card-icon" aria-hidden="true">{service.slug === 'social-media-graphics' ? <Megaphone /> : service.slug === 'brand-identity-and-logo-design' ? <Palette /> : service.slug === 'print-design' ? <Printer /> : <PenTool />}</div>
                <div className="service-card-content"><h3>{service.title}</h3><p>{service.shortDescription}</p><span className="service-card-arrow" aria-hidden="true">→</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="founder-section">
        <div className="site-container founder-grid"><div className="founder-face" role="img" aria-label="Portrait of the Nuru Designs founder" /><div><p className="eyebrow">A note from the studio</p><h2>Design is better when it feels human.</h2><p className="founder-copy">I started Nuru Designs to help ambitious people turn good ideas into brands that feel clear, confident, and alive.</p><p className="founder-name">Nuru Designs founder</p></div></div>
      </section>

      <section className="section site-container process-section">
        <div><p className="eyebrow">A considered process</p><h2>From rough idea<br /><em>to clear signal.</em></h2></div>
        <div className="process-list"><div><span>01</span><h3>Discover</h3><p>We find the sharpest truth in your business.</p></div><div><span>02</span><h3>Define</h3><p>We shape the strategy and visual direction.</p></div><div><span>03</span><h3>Deliver</h3><p>We build a system made to move with you.</p></div></div>
      </section>

      <section className="guarantee-section"><div className="site-container guarantee-grid"><div><p className="eyebrow">A lower-risk way to start</p><h2>Good work should feel like a partnership.</h2></div><div className="guarantee-points"><p>Not happy with the first concept? We revise until it&apos;s right, with no extra charge.</p><p>Free 20-minute discovery call. No pitch, no pressure.</p></div></div></section>

      <section className="section site-container homepage-faq"><div className="service-detail-split"><div><p className="eyebrow">FAQ</p><h2>Good questions deserve clear answers.</h2></div><div className="faq-list"><details><summary>How long does a project take?<span aria-hidden="true">+</span></summary><p>Most focused projects take two to six weeks, depending on scope and feedback.</p></details><details><summary>How many revisions are included?<span aria-hidden="true">+</span></summary><p>We refine the chosen direction together until it is right and ready to use.</p></details><details><summary>What do you need from me to start?<span aria-hidden="true">+</span></summary><p>A conversation about your goals, audience, timing, and what success should look like.</p></details><details><summary>Do you work with businesses across Kenya?<span aria-hidden="true">+</span></summary><p>Yes. We work remotely and collaborate with ambitious teams wherever they are based.</p></details></div></div></section>

      <section className="contact-band"><div className="site-container contact-content"><p className="eyebrow">Ready to make a move?</p><h2>Let&apos;s make it<br /><em>unmistakable.</em></h2><div className="final-cta-actions"><Link href="/contact" className="button button-light">Start a project <span aria-hidden="true">↗</span></Link><Link href="/contact?call=free-20-min" className="button button-outline-light">Book a free 20-min call <span aria-hidden="true">↗</span></Link></div></div></section>
    </main>
  );
}