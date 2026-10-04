import type { Faq, SiteContent, Team } from '@/payload-types';
import { getPayloadClient } from '@/lib/payload-client';

export type PublicFaq = Pick<Faq, 'question' | 'answer'>;
export type PublicTeamMember = Pick<Team, 'id' | 'name' | 'role' | 'bio'> & {
  portraitUrl?: string | null;
};

// These defaults keep public pages populated when CMS data is absent or unavailable.
export const fallbackSiteContent: SiteContent = {
  id: 0,
  homeHeroLead: 'Make your brand',
  homeHeroEmphasis: 'impossible',
  homeHeroEnd: 'to overlook.',
  homeHeroIntro: 'Nuru Designs creates bold identities and digital experiences for businesses ready to be remembered.',
  trustSectors: ['Founders', 'Restaurants', 'Events', 'Startups', 'Retail', 'Culture'].map((label) => ({ label })),
  founderEyebrow: 'A note from the studio',
  founderHeading: 'Design is better when it feels human.',
  founderCopy: 'I started Nuru Designs to help ambitious people turn good ideas into brands that feel clear, confident, and alive.',
  founderName: 'Nuru Designs founder',
  aboutLead: 'Nuru Designs is an independent design studio based in Kenya. We build bold identities, digital experiences, and campaign visuals for businesses ready to be remembered, not just seen.',
  whyHeading: 'Too many good businesses look like everyone else.',
  whyParagraphs: [
    { paragraph: 'Great work gets overlooked because the brand around it does not carry the same weight. We started Nuru Designs to help ambitious people turn good ideas into brands that feel clear, confident, and unmistakably theirs.' },
    { paragraph: 'The name Nuru means light. That’s the work: helping your business shine in a crowded marketplace.' },
  ],
  beliefsHeading: 'Good design has a point of view.',
  beliefs: [
    { title: 'Clarity beats cleverness.', description: 'If it does not communicate, it does not matter. We design for understanding first.' },
    { title: 'Character is the difference.', description: 'Anyone can make something look nice. We make it look like you, so people remember who you are.' },
    { title: 'Craft is non-negotiable.', description: 'Every pixel, every print, every post. Detail is how good work becomes trusted work.' },
    { title: 'Partnership over pitch.', description: 'We are here to solve your problem, and we act like it.' },
  ],
  processHeading: 'Clear steps. No mystery.',
  processSteps: [
    { number: '01', title: 'Discover', description: 'We find the sharpest truth in your business.' },
    { number: '02', title: 'Define', description: 'We shape the strategy and visual direction.' },
    { number: '03', title: 'Deliver', description: 'We build a system made to move with you.' },
  ],
  studioHeading: 'Design is better when it feels human.',
  studioIntro: 'Nuru Designs is led by a designer who believes good work should feel clear, confident, and alive.',
  founderQuote: 'I started Nuru Designs to help ambitious people turn good ideas into brands that feel clear, confident, and alive.',
  founderAttribution: 'Nuru Designs founder',
  teamStatement: 'We’re a small, senior team, which means you work directly with the people doing the work. No account managers, no handoffs, no dilution.',
  footerStudioDescription: 'Independent design studio based in Kenya.',
  contactPhoneDisplay: '+254 180 693 218',
  contactPhoneLink: '+254180693218',
  contactEmail: 'nurudesignske@gmail.com',
  copyrightYear: 2026,
};

export const fallbackHomeFaqs: PublicFaq[] = [
  { question: 'How long does a project take?', answer: 'Most focused projects take two to six weeks, depending on scope and feedback.' },
  { question: 'How many revisions are included?', answer: 'We refine the chosen direction together until it is right and ready to use.' },
  { question: 'What do you need from me to start?', answer: 'A conversation about your goals, audience, timing, and what success should look like.' },
  { question: 'Do you work with businesses across Kenya?', answer: 'Yes. We work remotely and collaborate with ambitious teams wherever they are based.' },
];

export const fallbackServicesFaqs: PublicFaq[] = [
  { question: 'How do your prices work?', answer: 'Each project is scoped around the goals, deliverables, and timeline. The starting prices below give you a useful ballpark before we talk.' },
  { question: 'How long does a project take?', answer: 'Most projects take between one and six weeks. We confirm a timeline after the discovery call and keep decisions moving.' },
  { question: 'How many revisions are included?', answer: 'We refine the chosen direction together until it is right and ready to use. The scope and review points are clear from the start.' },
  { question: 'Can you work with our existing team?', answer: 'Yes. We can lead the creative, collaborate with your marketing team, or provide a complete handoff for internal use.' },
  { question: 'What happens after I get in touch?', answer: 'We discuss what you need and recommend the clearest next step by phone or email.' },
];

async function getPayloadWithTimeout() {
  return getPayloadClient();
}

export async function getPublicSiteContent(): Promise<SiteContent> {
  const payload = await getPayloadWithTimeout();
  if (!payload) return fallbackSiteContent;

  try {
    const doc = await Promise.race([
      payload.findGlobal({ slug: 'site-content', overrideAccess: false }),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Site content lookup timed out')), 5000);
      }),
    ]);

    const definedFields = Object.fromEntries(
      Object.entries(doc).filter(([, value]) => value !== null && value !== undefined),
    );

    return { ...fallbackSiteContent, ...definedFields };
  } catch {
    return fallbackSiteContent;
  }
}

export async function getPublicFaqs(placement: 'home' | 'services'): Promise<PublicFaq[]> {
  const fallback = placement === 'home' ? fallbackHomeFaqs : fallbackServicesFaqs;
  const payload = await getPayloadWithTimeout();
  if (!payload) return fallback;

  try {
    const result = await Promise.race([
      payload.find({
        collection: 'faqs',
        where: {
          and: [
            { status: { equals: 'published' } },
            { placement: { in: [placement, 'both'] } },
          ],
        },
        sort: 'sortOrder',
        limit: 100,
        overrideAccess: false,
      }),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('FAQ lookup timed out')), 5000);
      }),
    ]);

    return result.docs.length
      ? result.docs.map(({ question, answer }) => ({ question, answer }))
      : fallback;
  } catch {
    return fallback;
  }
}

export async function getPublicTeamMembers(): Promise<PublicTeamMember[]> {
  const payload = await getPayloadWithTimeout();
  if (!payload) return [];

  try {
    const result = await Promise.race([
      payload.find({
        collection: 'teams',
        where: { status: { equals: 'published' } },
        sort: 'sortOrder',
        limit: 100,
        depth: 1,
        overrideAccess: false,
      }),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Team lookup timed out')), 5000);
      }),
    ]);

    return result.docs.map(({ id, name, role, bio, portrait }) => ({
      id,
      name,
      role,
      bio,
      portraitUrl: typeof portrait === 'object' && portrait ? portrait.url : null,
    }));
  } catch {
    return [];
  }
}