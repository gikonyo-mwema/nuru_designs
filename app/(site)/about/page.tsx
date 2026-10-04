import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getPublicServices, services as fallbackServices } from '@/lib/services';
import { fallbackSiteContent, getPublicSiteContent, getPublicTeamMembers } from '@/lib/site-content';

export const metadata: Metadata = {
  title: 'About Nuru Designs',
  description: 'Meet Nuru Designs, an independent design studio based in Kenya.',
};

const fallbackAboutServices = [
  ['Brand identity', 'Distinctive identity systems that turn a good business into a memorable brand.'],
  ['Digital design', 'Websites, UI/UX, and digital experiences built to convert.'],
  ['Campaigns', 'Campaign visuals that turn your message into momentum.'],
  ['Print design', 'Print pieces with enough presence to earn attention away from the screen.'],
  ['Social media graphics', 'Scroll-stopping graphics that make every post feel unmistakably yours.'],
  ['Strategy-led design', 'Every decision rooted in your business goals.'],
];

export default async function AboutPage() {
  const [content, serviceEntries, teamMembers] = await Promise.all([
    getPublicSiteContent(),
    getPublicServices(),
    getPublicTeamMembers(),
  ]);
  const beliefs = content.beliefs?.length ? content.beliefs : fallbackSiteContent.beliefs ?? [];
  const process = content.processSteps?.length ? content.processSteps : fallbackSiteContent.processSteps ?? [];
  const servicesAreUnchangedFallback = serviceEntries.length === fallbackServices.length
    && serviceEntries.every((entry, index) => entry.slug === fallbackServices[index]?.slug
      && entry.title === fallbackServices[index]?.title
      && entry.shortDescription === fallbackServices[index]?.shortDescription);
  const services = servicesAreUnchangedFallback
    ? fallbackAboutServices
    : serviceEntries.map(({ title, shortDescription }) => [title, shortDescription]);

  return (
    <main className="about-page">
      <section className="about-hero site-container">
        <p className="eyebrow">About Nuru Designs</p>
        <h1>We make brands<br /><em>impossible to overlook.</em></h1>
        <p className="about-lead">{content.aboutLead}</p>
        <div className="about-actions"><Link href="/contact" className="button button-dark">Start a project <span aria-hidden="true">↗</span></Link><a href={`tel:${content.contactPhoneLink}`} className="text-link">Call to arrange a free 20-min call <span aria-hidden="true">↗</span></a></div>
      </section>

      <section className="about-section about-why">
        <div className="site-container about-narrow"><p className="eyebrow">Why we exist</p><h2>{content.whyHeading}</h2>{content.whyParagraphs?.map(({ paragraph, id }, index) => <p key={id ?? index}>{paragraph}</p>)}</div>
      </section>

      <section className="about-section site-container about-beliefs"><div className="about-section-heading"><p className="eyebrow">What we believe</p><h2>{content.beliefsHeading}</h2></div><div className="about-beliefs-grid">{beliefs.map(({ title, description }) => <article key={title}><h3>{title}</h3><p>{description}</p></article>)}</div></section>

      <section className="about-section about-process"><div className="site-container"><div className="about-section-heading"><p className="eyebrow">How we work</p><h2>{content.processHeading}</h2></div><div className="about-process-grid">{process.map(({ number, title, description }) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div><p className="about-reassurance">Not happy with the first concept? We revise until it&apos;s right, with no extra charge.</p></div></section>

      <section className="about-section site-container about-studio"><div className="about-studio-mark" aria-hidden="true">N</div><div className="about-studio-copy"><p className="eyebrow">The studio</p><h2>{content.studioHeading}</h2><p>{content.studioIntro}</p><blockquote>&ldquo;{content.founderQuote}&rdquo;<cite>— {content.founderAttribution}</cite></blockquote><p>{content.teamStatement}</p></div></section>

      {teamMembers.length > 0 && <section className="about-section site-container about-team"><div className="about-section-heading"><p className="eyebrow">The people behind the work</p><h2>Meet the team.</h2></div><div className="about-team-grid">{teamMembers.map(({ id, name, role, bio, portraitUrl }) => <article className="about-team-member" key={id}><div className="about-team-portrait">{portraitUrl ? <Image src={portraitUrl} alt={`${name}, ${role}`} fill sizes="(max-width: 700px) 80vw, 280px" unoptimized /> : <span aria-hidden="true">{name.charAt(0)}</span>}</div><h3>{name}</h3><p className="about-team-role">{role}</p><p className="about-team-bio">{bio}</p></article>)}</div></section>}

      <section className="about-section site-container about-services"><div className="about-section-heading"><p className="eyebrow">What we do</p><h2>Clarity, character, and craft.</h2></div><div className="about-services-grid">{services.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

      <section className="about-final"><div className="site-container"><p className="eyebrow">Ready to make a move?</p><h2>Let&apos;s make it<br /><em>unmistakable.</em></h2><div className="about-actions"><Link href="/contact" className="button button-light">Start a project <span aria-hidden="true">↗</span></Link><a href={`tel:${content.contactPhoneLink}`} className="button button-outline-light">Call to arrange a free 20-min call <span aria-hidden="true">↗</span></a></div><div className="about-contact"><a href={`tel:${content.contactPhoneLink}`}>{content.contactPhoneDisplay}</a><a href={`mailto:${content.contactEmail}`}>{content.contactEmail}</a></div></div></section>
    </main>
  );
}