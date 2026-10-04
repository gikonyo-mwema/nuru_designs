import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPublicService, services } from '@/lib/services';

type ServicePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getPublicService(slug);
  return service ? { title: `${service.title} — Nuru Designs`, description: service.shortDescription } : {};
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getPublicService(slug);
  if (!service) notFound();

  return (
    <main className="service-detail-page">
      <section className="service-detail-hero">
        <div className="site-container service-detail-hero-grid">
          <div>
            <p className="eyebrow">{service.number} / Nuru Designs</p>
            <h1>{service.title}</h1>
            <p className="service-detail-subheadline">{service.outcome}</p>
            <Link href="/contact" className="button button-light">Get a quote <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="service-detail-hero-image" style={{ backgroundImage: `url(${service.image})` }} role="img" aria-label={service.imageAlt} />
        </div>
      </section>

      <section className="service-detail-section service-problem site-container">
        <p className="eyebrow">The problem</p>
        <h2>Most brands blend in because their visuals feel inconsistent, outdated, or generic.</h2>
      </section>

      <section className="service-detail-section service-deliverables-section">
        <div className="site-container service-detail-split">
          <div><p className="eyebrow">What&apos;s included</p><h2>Everything you need to show up with clarity.</h2></div>
          <ul className="detail-list">{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section className="service-detail-section site-container">
        <div className="service-detail-split">
          <div><p className="eyebrow">Your process</p><h2>A clear path from first thought to final file.</h2></div>
          <ol className="process-list detail-process"><li><span>01</span><div><h3>Discovery</h3><p>We talk about your goals, audience, and vision.</p></div></li><li><span>02</span><div><h3>Concepts</h3><p>We present initial directions grounded in the brief.</p></div></li><li><span>03</span><div><h3>Refinement</h3><p>We iterate until the work feels exactly right.</p></div></li><li><span>04</span><div><h3>Delivery</h3><p>You receive final files in every format you need.</p></div></li></ol>
        </div>
      </section>

      <section className="service-detail-section service-samples-section">
        <div className="site-container"><div className="section-heading"><div><p className="eyebrow">Creative directions</p><h2>Possible ways your project could take shape.</h2><p>Illustrative concepts, not commissioned client projects.</p></div></div><div className="service-samples-grid">{service.samples.map((sample) => <article className="service-sample" key={sample.title}><div className="service-sample-image" style={{ backgroundImage: `url(${sample.image})` }} role="img" aria-label={`${sample.title}: ${sample.caption}`} /><h3>{sample.title}</h3><p>{sample.caption}</p></article>)}</div></div>
      </section>

      <section className="service-detail-section site-container"><div className="section-heading"><div><p className="eyebrow">Pricing / packages</p><h2>A right-sized way to get started.</h2></div></div><div className="service-packages">{service.packages.map((pkg) => <article className={`service-package${pkg.featured ? ' is-featured' : ''}`} key={pkg.name}>{pkg.featured && <span className="package-badge">Most popular</span>}<h3>{pkg.name}</h3><strong>{pkg.price}</strong><p>{pkg.description}</p><Link href="/contact" className="text-link">Choose package <span aria-hidden="true">→</span></Link></article>)}</div></section>

      <section className="service-detail-section site-container service-faq"><div className="service-detail-split"><div><p className="eyebrow">FAQ</p><h2>Good questions deserve clear answers.</h2></div><div className="faq-list">{service.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></div></section>

      <section className="contact-band"><div className="site-container contact-content"><p className="eyebrow">Ready when you are</p><h2>Let&apos;s make your<br /><em>next move clear.</em></h2><Link href="/contact" className="button button-light">Start a project <span aria-hidden="true">↗</span></Link><p className="service-reassurance">Tell us what you have in mind and we&apos;ll talk through the next step.</p></div></section>
    </main>
  );
}
