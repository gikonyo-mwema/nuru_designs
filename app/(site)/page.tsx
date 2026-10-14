import Link from 'next/link';
import type { Metadata } from 'next';
import { BookOpen, Building2, Image, Package, Palette, Share2 } from 'lucide-react';
import SelectedWorkGallery from '@/components/work/SelectedWorkGallery';
import { getPayloadClient } from '@/lib/payload-client';
import { getPublicServices } from '@/lib/services';
import { getPublicFaqs, getPublicSiteContent, getPublicTeamMembers } from '@/lib/site-content';

export const metadata: Metadata = {
  title: 'Nuru Designs | Independent Design Studio in Kenya',
  description: 'Bold brand identities and digital experiences for businesses ready to be remembered.',
};

type Project = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  category?: string;
  heroImage?: string | { url?: string; alt?: string; width?: number | null; height?: number | null; focalX?: number | null; focalY?: number | null };
};

const serviceIcons = { branding: Palette, 'social-media': Share2, 'flyers-posters': Image, 'print-design': BookOpen, packaging: Package, 'company-profiles': Building2 } as const;

async function getFeaturedProjects(): Promise<Project[]> {
  const payload = await getPayloadClient();
  if (!payload) return [];

  try {
    const result = await Promise.race([
      payload.find({
        collection: 'projects',
        where: {
          and: [
            { status: { equals: 'published' } },
            { featured: { equals: true } },
          ],
        },
        sort: 'sortOrder,-publishedAt',
        limit: 8,
      }),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Featured project lookup timed out')), 15000);
      }),
    ]);

    return result.docs as unknown as Project[];
  } catch {
    return [];
  }
}

export default async function Home() {
  const [projects, services, content, faqs, teamMembers] = await Promise.all([
    getFeaturedProjects(),
    getPublicServices(),
    getPublicSiteContent(),
    getPublicFaqs('home'),
    getPublicTeamMembers(),
  ]);
  const heroBackgroundImage = typeof content.homeHeroBackground === 'object'
    ? content.homeHeroBackground?.url
    : undefined;
  const founder = teamMembers.find((member) => member.role.toLowerCase().includes('founder')) ?? teamMembers[0];
  const founderPortraitUrl = founder?.portraitUrl ?? (typeof content.founderImage === 'object' ? content.founderImage?.url : undefined);
  const founderDisplayName = founder?.name || content.founderName || 'Nuru Designs founder';

  return (
    <main>
      <section className="hero-section">
        <div
          className="hero-background"
          style={heroBackgroundImage ? { '--hero-background-image': `url("${heroBackgroundImage}")` } as React.CSSProperties : undefined}
          aria-hidden="true"
        />
        <div className="site-container hero-content">
          <div className="hero-copy">
            <p className="eyebrow reveal">Design studio</p>
            <h1 className="hero-title reveal reveal-delay-1">
              {content.homeHeroLead} <em>{content.homeHeroEmphasis}</em> {content.homeHeroEnd}
            </h1>
            <p className="hero-intro reveal reveal-delay-2">
              {content.homeHeroIntro}
            </p>
            <div className="hero-actions reveal reveal-delay-3">
              <a href="https://wa.me/254180693218" className="button button-light" target="_blank" rel="noreferrer">Chat on WhatsApp <span aria-hidden="true">↗</span></a>
              <Link href="/work" className="text-link">Explore Our Work <span aria-hidden="true">→</span></Link>
            </div>
            <p className="hero-supporting-line reveal reveal-delay-3">Custom designs for businesses, startups, restaurants, events, and growing brands across Kenya.</p>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Businesses we serve">
        <div className="site-container trust-strip-inner">
          <p className="eyebrow">Design for businesses across Kenya</p>
          <div className="trust-sectors" aria-label="Business sectors">
            {content.trustSectors?.map(({ label }, index) => <span key={`${label}-${index}`}>{label}</span>)}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="site-container services-section">
          <div className="services-intro-centered"><p className="eyebrow">What we do</p><h2>Clarity, character, and craft.</h2><p className="section-intro">From first thought to final pixel, we help ambitious businesses show up with confidence.</p></div>
          <div className="services-cards">
            {services.map((service) => (
              <Link href={`/services/${service.slug}`} className="service-card service-card-plain" key={service.slug}>
                <div className="service-card-icon" aria-hidden="true">{(() => { const Icon = serviceIcons[service.slug as keyof typeof serviceIcons] ?? Palette; return <Icon />; })()}</div>
                <div className="service-card-content"><h3>{service.title}</h3><p>{service.shortDescription}</p><span className="service-card-arrow" aria-hidden="true">→</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section site-container" id="work">
        <div className="section-heading">
          <div><p className="eyebrow">Selected work</p><h2>Good design earns attention.</h2></div>
          <Link href="/work" className="text-link">View all work <span aria-hidden="true">↗</span></Link>
        </div>
        {projects.length > 0 ? <SelectedWorkGallery projects={projects} /> : (
          <div className="work-placeholder"><span>Our portfolio is taking shape. Need design for your business? Let&apos;s talk.</span><Link href="/contact" className="text-link">Discuss a project <span aria-hidden="true">↗</span></Link></div>
        )}
      </section>

      <section className="founder-section">
        <div className="site-container founder-grid"><div className="founder-face" style={founderPortraitUrl ? { backgroundImage: `url("${founderPortraitUrl}")` } : undefined} role="img" aria-label={`Portrait of ${founderDisplayName}`} /><div><p className="eyebrow">{content.founderEyebrow}</p><h2>{content.founderHeading}</h2><p className="founder-copy">{content.founderCopy}</p><p className="founder-name">{founderDisplayName}</p></div></div>
      </section>

      <section className="section site-container process-section">
        <div><p className="eyebrow">A considered process</p><h2>From rough idea<br /><em>to clear signal.</em></h2></div>
        <div className="process-list"><div><span>01</span><h3>Discover</h3><p>We find the sharpest truth in your business.</p></div><div><span>02</span><h3>Define</h3><p>We shape the strategy and visual direction.</p></div><div><span>03</span><h3>Deliver</h3><p>We build a system made to move with you.</p></div></div>
      </section>

      <section className="guarantee-section"><div className="site-container guarantee-grid"><div><p className="eyebrow">A considered way to start</p><h2>Good work should feel like a partnership.</h2></div><div className="guarantee-points"><p>We agree the scope and review points before work begins, then refine the chosen direction together.</p><p>Call or message us to talk through your project and the next step.</p></div></div></section>

      <section className="section site-container homepage-faq"><div className="service-detail-split"><div><p className="eyebrow">FAQ</p><h2>Good questions deserve clear answers.</h2></div><div className="faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></div></section>

      <section className="contact-band"><div className="site-container contact-content"><p className="eyebrow">Ready to make a move?</p><h2>Let&apos;s make it<br /><em>unmistakable.</em></h2><div className="final-cta-actions"><Link href="/contact" className="button button-light">Start a project <span aria-hidden="true">↗</span></Link><a href="tel:+254180693218" className="button button-outline-light">Call to discuss your project <span aria-hidden="true">↗</span></a></div></div></section>
    </main>
  );
}