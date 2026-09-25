import Link from 'next/link';
import { Megaphone, Palette, PenTool, Printer } from 'lucide-react';
import { services } from '@/lib/services';

const serviceIcons = { 'social-media-graphics': Megaphone, 'brand-identity-and-logo-design': Palette, 'print-design': Printer, 'marketing-design': PenTool } as const;
const serviceSignals = {
  'social-media-graphics': { bestFor: 'Brands ready to show up consistently online', timeline: '2–4 weeks', startingFrom: 'KSh 35,000' },
  'brand-identity-and-logo-design': { bestFor: 'Businesses rebranding or launching', timeline: '3–5 weeks', startingFrom: 'KSh 85,000' },
  'print-design': { bestFor: 'Teams bringing a brand into the real world', timeline: '1–3 weeks', startingFrom: 'KSh 25,000' },
  'marketing-design': { bestFor: 'Businesses launching something people should remember', timeline: '3–6 weeks', startingFrom: 'KSh 75,000' },
} as const;
const projectSteps = [
  { number: '01', title: 'Discover', copy: 'We learn your business and find the sharpest truth in it.' },
  { number: '02', title: 'Define', copy: 'We shape the strategy and visual direction together.' },
  { number: '03', title: 'Deliver', copy: 'We build a system made to move with you.' },
  { number: '04', title: 'Support', copy: 'We stay on hand as your brand grows.' },
];
const testimonials = [
  { quote: 'Our rebrand paid for itself in two months.', name: 'Jane W.', role: 'Founder, Mara Coffee Co.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80' },
  { quote: 'The campaign gave our launch a clear voice from day one.', name: 'David K.', role: 'Director, Lumen Events', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
  { quote: 'They handled the details we did not know to ask about.', name: 'Amina N.', role: 'Co-founder, Kijani Labs', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&auto=format&fit=crop&q=80' },
];
const faqs = [
  { question: 'How do your prices work?', answer: 'Each project is scoped around the goals, deliverables, and timeline. The starting prices below give you a useful ballpark before we talk.' },
  { question: 'How long does a project take?', answer: 'Most projects take between one and six weeks. We confirm a timeline after the discovery call and keep decisions moving.' },
  { question: 'How many revisions are included?', answer: 'We refine the chosen direction together until it is right and ready to use. The scope and review points are clear from the start.' },
  { question: 'Can you work with our existing team?', answer: 'Yes. We can lead the creative, collaborate with your marketing team, or provide a complete handoff for internal use.' },
  { question: 'What happens after I get in touch?', answer: 'We start with a free 20-minute call to understand what you need and recommend the clearest next step.' },
];

export default function ServicesPage() {
  return (
    <main className="services-page">
      <section className="services-intro site-container"><div><p className="eyebrow">What we do</p><h1>Design with a<br /><em>point of view.</em></h1></div><p className="services-lead">We help ambitious businesses become clearer, more confident, and harder to forget through strategy-led design.</p></section>
      <section className="service-blocks site-container" aria-label="Our services">
        {services.map((service) => { const Icon = serviceIcons[service.slug as keyof typeof serviceIcons]; const signal = serviceSignals[service.slug as keyof typeof serviceSignals]; return <article className="service-block" key={service.slug}>
          <div className="service-block-heading"><span className="service-block-number">{service.number}</span><Icon className="service-block-icon" aria-hidden="true" /><div><h2>{service.title}</h2><p className="service-block-promise">{service.shortDescription}</p></div></div>
          <div className="service-block-content"><div><p className="eyebrow">What&apos;s included</p><ul className="service-deliverables-list">{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="service-block-signals"><p><strong>Best for</strong>{signal.bestFor}</p><p><strong>Timeline</strong>{signal.timeline}</p><p><strong>Starting from</strong>{signal.startingFrom}</p></div></div>
          <div className="service-block-actions"><Link href={`/work?category=${service.slug === 'brand-identity-and-logo-design' ? 'brand-identity' : service.slug}`} className="text-link">See related work <span aria-hidden="true">→</span></Link><Link href="/contact" className="button button-dark">Start a project <span aria-hidden="true">↗</span></Link></div>
        </article>; })}
      </section>
      <section className="services-conversion"><div className="site-container services-conversion-inner"><div><p className="eyebrow">Not sure what you need?</p><h2>Bring us the<br /><em>rough idea.</em></h2></div><div><p>Most clients come to us with a feeling, not a brief. That&apos;s fine. Book a free 20-minute call and we&apos;ll help you figure out what your brand actually needs.</p><div className="service-block-actions"><Link href="/contact?call=free-20-min" className="button button-dark">Book a free call <span aria-hidden="true">↗</span></Link><Link href="/contact" className="text-link">Or send us a message <span aria-hidden="true">→</span></Link></div></div></div></section>
      <section className="section site-container services-process"><div className="services-section-intro"><p className="eyebrow">How a project runs</p><h2>Clear steps. No mystery.</h2></div><div className="services-process-grid">{projectSteps.map((step) => <div className="services-process-step" key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></div>)}</div></section>
      <section className="section services-page-testimonials"><div className="site-container"><div className="services-section-intro"><p className="eyebrow">Client stories</p><h2>Proof that good design moves things.</h2></div><div className="testimonials-cards">{testimonials.map((testimonial) => <article className="testimonial-card" key={testimonial.name}><div className="testimonial-person"><div className="testimonial-face" style={{ backgroundImage: `url(${testimonial.image})` }} role="img" aria-label={`Portrait of ${testimonial.name}`} /><div><strong>{testimonial.name}</strong><span>{testimonial.role}</span></div></div><blockquote>{testimonial.quote}</blockquote></article>)}</div></div></section>
      <section className="section site-container services-faq"><div className="service-detail-split"><div className="services-section-intro"><p className="eyebrow">FAQ</p><h2>Good questions deserve clear answers.</h2></div><div className="faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></div></section>
      <section className="contact-band"><div className="site-container contact-content"><p className="eyebrow">Ready to make a move?</p><h2>Let&apos;s make your<br /><em>next project clear.</em></h2><div className="final-cta-actions"><Link href="/contact" className="button button-light">Start a project <span aria-hidden="true">↗</span></Link><Link href="/contact?call=free-20-min" className="button button-outline-light">Book a call <span aria-hidden="true">↗</span></Link></div></div></section>
    </main>
  );
}