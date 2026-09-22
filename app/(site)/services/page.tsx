import Link from 'next/link';

const services = [
  {
    number: '01',
    title: 'Brand identity',
    description: 'A clear, distinctive identity that gives your business a memorable point of view.',
    deliverables: 'Strategy / Logo / Visual system / Guidelines',
    className: 'service-card-lime',
    mark: 'N',
  },
  {
    number: '02',
    title: 'Digital experiences',
    description: 'Websites and interfaces that make complex ideas feel simple, useful, and unmistakably yours.',
    deliverables: 'UX direction / UI design / Prototypes / Design systems',
    className: 'service-card-ink',
    mark: '↗',
  },
  {
    number: '03',
    title: 'Campaign design',
    description: 'A flexible visual world for launches, campaigns, and the moments your audience should remember.',
    deliverables: 'Art direction / Key visuals / Social / Print',
    className: 'service-card-sand',
    mark: '✳',
  },
];

export default function ServicesPage() {
  return (
    <main className="services-page">
      <section className="services-intro site-container">
        <div>
          <p className="eyebrow">What we do</p>
          <h1>Design with a<br /><em>point of view.</em></h1>
        </div>
        <p className="services-lead">We help ambitious businesses become clearer, more confident, and harder to forget through strategy-led design.</p>
      </section>

      <section className="services-cards site-container" aria-label="Our services">
        {services.map((service) => (
          <article className={`service-card ${service.className}`} key={service.number}>
            <div className="service-card-top"><span>{service.number}</span><span>Selected service</span></div>
            <div className="service-card-mark" aria-hidden="true">{service.mark}</div>
            <div className="service-card-content">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <div className="service-deliverables"><span>Includes</span><strong>{service.deliverables}</strong></div>
            </div>
            <Link href="/contact" className="service-card-link" aria-label={`Start a project for ${service.title}`}>Start a project <span aria-hidden="true">↗</span></Link>
          </article>
        ))}
      </section>

      <section className="services-note site-container">
        <p className="eyebrow">Not sure what you need?</p>
        <div><h2>Bring us the<br /><em>rough idea.</em></h2><Link href="/contact" className="button button-dark">Let&apos;s talk <span aria-hidden="true">↗</span></Link></div>
      </section>
    </main>
  );
}