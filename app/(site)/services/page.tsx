import Link from 'next/link';
import type { Metadata } from 'next';
import { BookOpen, Building2, Image, Package, Palette, Share2 } from 'lucide-react';
import { getPublicServices } from '@/lib/services';
import { getPublicFaqs } from '@/lib/site-content';
import type { ProjectCategory } from '@/lib/project-categories';

export const metadata: Metadata = {
  title: 'Design Services',
  description: 'Brand identity, social media, print, and marketing design for ambitious businesses.',
};

const serviceIcons = { 'social-media-posts-banners': Share2, 'event-posters-flyers': Image, 'menus-cards-stationery': BookOpen, 'logo-brand-identity': Palette, 'product-labels-packaging': Package, 'company-profiles': Building2 } as const;
const serviceWorkCategories = {
  'social-media-posts-banners': 'social-media',
  'event-posters-flyers': 'posters',
  'menus-cards-stationery': 'menus',
  'logo-brand-identity': 'brand-identity',
  'product-labels-packaging': 'all',
  'company-profiles': 'all',
} satisfies Record<string, ProjectCategory | 'all'>;
const serviceSignals = {
  'social-media-posts-banners': { bestFor: 'Brands ready to show up consistently online', timeline: '2–4 weeks', startingFrom: 'KSh 35,000' },
  'event-posters-flyers': { bestFor: 'Teams promoting an event, offer, or campaign', timeline: '1–3 weeks', startingFrom: 'KSh 25,000' },
  'menus-cards-stationery': { bestFor: 'Businesses creating memorable customer touchpoints', timeline: '1–3 weeks', startingFrom: 'KSh 30,000' },
  'logo-brand-identity': { bestFor: 'Businesses launching or sharpening their identity', timeline: '3–5 weeks', startingFrom: 'KSh 85,000' },
  'product-labels-packaging': { bestFor: 'Product businesses ready to stand out on the shelf', timeline: '2–4 weeks', startingFrom: 'KSh 65,000' },
  'company-profiles': { bestFor: 'Businesses that need to communicate their value clearly', timeline: '2–4 weeks', startingFrom: 'KSh 55,000' },
} as const;
const projectSteps = [
  { number: '01', title: 'Discover', copy: 'We learn your business and find the sharpest truth in it.' },
  { number: '02', title: 'Define', copy: 'We shape the strategy and visual direction together.' },
  { number: '03', title: 'Deliver', copy: 'We build a system made to move with you.' },
  { number: '04', title: 'Support', copy: 'We stay on hand as your brand grows.' },
];
export default async function ServicesPage() {
  const [services, faqs] = await Promise.all([getPublicServices(), getPublicFaqs('services')]);
  return (
    <main className="services-page">
      <section className="services-intro site-container"><div><p className="eyebrow">What we do</p><h1>Design with a<br /><em>point of view.</em></h1></div><p className="services-lead">We help ambitious businesses become clearer, more confident, and harder to forget through strategy-led design.</p></section>
      <section className="service-blocks site-container" aria-label="Our services">
        {services.map((service) => { const Icon = serviceIcons[service.slug as keyof typeof serviceIcons] ?? Palette; const signal = serviceSignals[service.slug as keyof typeof serviceSignals]; const workCategory = serviceWorkCategories[service.slug as keyof typeof serviceWorkCategories] ?? 'all'; return <article className="service-block" key={service.slug}>
          <div className="service-block-heading"><span className="service-block-number">{service.number}</span><Icon className="service-block-icon" aria-hidden="true" /><div><h2>{service.title}</h2><p className="service-block-promise">{service.shortDescription}</p></div></div>
          <div className="service-block-content"><div><p className="eyebrow">What&apos;s included</p><ul className="service-deliverables-list">{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="service-block-signals"><p><strong>Best for</strong>{service.bestFor ?? signal?.bestFor ?? 'Businesses looking for a clear, considered design partner'}</p><p><strong>Timeline</strong>{service.timeline ?? signal?.timeline ?? 'Scoped to your project'}</p><p><strong>Starting from</strong>{service.startingFrom ?? signal?.startingFrom ?? 'Contact us for a quote'}</p></div></div>
          <div className="service-block-actions"><Link href={workCategory === 'all' ? '/work' : `/work?category=${workCategory}`} className="text-link">See related work <span aria-hidden="true">→</span></Link><Link href="/contact" className="button button-dark">Start a project <span aria-hidden="true">↗</span></Link></div>
        </article>; })}
      </section>
      <section className="services-conversion"><div className="site-container services-conversion-inner"><div><p className="eyebrow">Not sure what you need?</p><h2>Bring us the<br /><em>rough idea.</em></h2></div><div><p>Most clients come to us with a feeling, not a brief. That&apos;s fine. Call or send us a message and we&apos;ll help you figure out what your brand actually needs.</p><div className="service-block-actions"><a href="tel:+254180693218" className="button button-dark">Call us <span aria-hidden="true">↗</span></a><Link href="/contact" className="text-link">Or send us a message <span aria-hidden="true">→</span></Link></div></div></div></section>
      <section className="section site-container services-process"><div className="services-section-intro"><p className="eyebrow">How a project runs</p><h2>Clear steps. No mystery.</h2></div><div className="services-process-grid">{projectSteps.map((step) => <div className="services-process-step" key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></div>)}</div></section>
      <section className="section site-container services-faq"><div className="service-detail-split"><div className="services-section-intro"><p className="eyebrow">FAQ</p><h2>Good questions deserve clear answers.</h2></div><div className="faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></div></section>
      <section className="contact-band"><div className="site-container contact-content"><p className="eyebrow">Ready to make a move?</p><h2>Let&apos;s make your<br /><em>next project clear.</em></h2><div className="final-cta-actions"><Link href="/contact" className="button button-light">Start a project <span aria-hidden="true">↗</span></Link><a href="tel:+254180693218" className="button button-outline-light">Call to arrange a free call <span aria-hidden="true">↗</span></a></div></div></section>
    </main>
  );
}