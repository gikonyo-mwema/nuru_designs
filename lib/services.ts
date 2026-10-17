export type Service = {
  number: string;
  slug: string;
  title: string;
  shortDescription: string;
  outcome: string;
  image: string;
  imageAlt: string;
  bestFor?: string;
  timeline?: string;
  startingFrom?: string;
  deliverables: string[];
  samples: { title: string; caption: string; image: string }[];
  packages: { name: string; price: string; description: string; featured?: boolean }[];
  faqs: { question: string; answer: string }[];
};

const sampleImages = {
  social: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&auto=format&fit=crop&q=85',
  identity: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&auto=format&fit=crop&q=85',
  print: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=1200&auto=format&fit=crop&q=85',
  marketing: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&auto=format&fit=crop&q=85',
};

export const services: Service[] = [
  {
    number: '01', slug: 'social-media-posts-banners', title: 'Social Media Posts & Banners',
    shortDescription: 'Scroll-stopping graphics that make every post feel unmistakably yours.',
    outcome: 'A social presence people recognize, remember, and want to follow.', image: sampleImages.social, imageAlt: 'Colorful social media campaign mockups',
    deliverables: ['Logo suite and usage guidance', 'Color palette and typography system', 'Brand guidelines PDF', 'Business card, letterhead, and social kit', 'Launch-ready brand assets'],
    samples: [{ title: 'Identity system', caption: 'A flexible visual language built to move from packaging to digital.', image: sampleImages.identity }],
    packages: [
      { name: 'Essential', price: 'From KSh 85,000', description: 'A focused logo suite, palette, type, and core brand guide.' },
      { name: 'Signature', price: 'From KSh 150,000', description: 'A complete identity system with launch-ready brand touchpoints.', featured: true },
    ],
    faqs: [{ question: 'Can you refresh an existing brand?', answer: 'Yes. We can sharpen what is already working or create a fuller identity system around it.' }],
  },
  {
    number: '02', slug: 'event-posters-flyers', title: 'Event Posters & Flyers',
    shortDescription: 'Scroll-stopping graphics that make every post feel unmistakably yours.',
    outcome: 'A social presence people recognize, remember, and want to follow.', image: sampleImages.social, imageAlt: 'Colorful social media campaign mockups',
    deliverables: ['12 custom post and story templates', 'Campaign art direction and content themes', 'Editable files for your team', 'Platform-ready exports for every format', 'A simple visual guide for consistency'],
    samples: [
      { title: 'Launch campaign', caption: 'A focused visual system built to make a new offer impossible to miss.', image: sampleImages.social },
      { title: 'Content series', caption: 'A repeatable template set that keeps weekly content fresh and recognizable.', image: sampleImages.marketing },
      { title: 'Product spotlight', caption: 'Social-first art direction that gives a product its own visual moment.', image: sampleImages.identity },
      { title: 'Event countdown', caption: 'A high-energy sequence designed to build anticipation before launch day.', image: sampleImages.print },
    ],
    packages: [
      { name: 'Starter', price: 'From KSh 35,000', description: '6 branded graphics and a reusable template starter kit.' },
      { name: 'Campaign', price: 'From KSh 65,000', description: 'A complete launch set across posts, stories, and paid formats.', featured: true },
      { name: 'Ongoing', price: 'Custom', description: 'A consistent monthly design partner for active brands.' },
    ],
    faqs: [
      { question: 'Can you work from our existing brand?', answer: 'Yes. We can extend your current identity or sharpen the parts that are not working.' },
      { question: 'How many graphics are included?', answer: 'The package determines the quantity, with custom bundles available for larger campaigns.' },
      { question: 'Do you provide editable files?', answer: 'Yes. We deliver the agreed source files alongside ready-to-publish exports.' },
      { question: 'How long does a campaign take?', answer: 'Most focused campaigns take two to four weeks from discovery to final delivery.' },
    ],
  },
  {
    number: '03', slug: 'menus-cards-stationery', title: 'Menus, Cards & Stationery',
    shortDescription: 'Print pieces with enough presence to earn attention away from the screen.',
    outcome: 'Physical brand moments that people notice, keep, and remember.', image: sampleImages.print, imageAlt: 'Printed editorial design and publications',
    deliverables: ['Art direction and print-ready layouts', 'Brochures, flyers, posters, and reports', 'Production specifications and press checks', 'Paper, finish, and format recommendations', 'Print-ready files with vendor support'],
    samples: [
      { title: 'Editorial piece', caption: 'A considered publication that makes complex information easy to explore.', image: sampleImages.print },
      { title: 'Campaign poster', caption: 'A bold physical expression built to stand out in a busy environment.', image: sampleImages.marketing },
      { title: 'Printed collateral', caption: 'A tactile set of materials that carries the brand into the real world.', image: sampleImages.identity },
      { title: 'Report design', caption: 'Clear hierarchy and rhythm that make important content feel inviting.', image: sampleImages.social },
    ],
    packages: [
      { name: 'Single piece', price: 'From KSh 25,000', description: 'One polished print asset, ready for production.' },
      { name: 'Print suite', price: 'From KSh 70,000', description: 'A coordinated set of collateral for a campaign or launch.', featured: true },
      { name: 'Ongoing', price: 'Custom', description: 'Flexible support for recurring print and production needs.' },
    ],
    faqs: [
      { question: 'Do you manage printing?', answer: 'We can prepare production-ready files and support vendor coordination or print supervision.' },
      { question: 'Can you recommend materials?', answer: 'Yes. We recommend stock, format, and finish based on the purpose and budget.' },
      { question: 'What can you design?', answer: 'Common projects include posters, brochures, reports, flyers, menus, packaging, and stationery.' },
      { question: 'How long does production take?', answer: 'Design usually takes one to three weeks, with printing time depending on the supplier.' },
    ],
  },
  {
    number: '04', slug: 'logo-brand-identity', title: 'Logo & Brand Identity',
    shortDescription: 'Campaign visuals that turn your message into momentum and measurable attention.',
    outcome: 'A clear campaign people understand quickly and remember longer.', image: sampleImages.marketing, imageAlt: 'Marketing campaign concept boards',
    deliverables: ['Campaign concept and visual direction', 'Key visual for every channel', 'Digital, print, and out-of-home adaptations', 'Launch toolkit for internal teams', 'Clear handoff and rollout guidance'],
    samples: [
      { title: 'Campaign platform', caption: 'A single creative idea translated into a flexible campaign world.', image: sampleImages.marketing },
      { title: 'Launch toolkit', caption: 'A coordinated set of assets that keeps a launch moving at pace.', image: sampleImages.social },
      { title: 'Outdoor direction', caption: 'High-impact compositions designed to communicate in a single glance.', image: sampleImages.print },
      { title: 'Digital rollout', caption: 'A channel-ready system that keeps every touchpoint connected.', image: sampleImages.identity },
    ],
    packages: [
      { name: 'Focused', price: 'From KSh 75,000', description: 'A campaign concept and essential launch assets.' },
      { name: 'Full campaign', price: 'From KSh 140,000', description: 'A complete campaign system across digital and print.', featured: true },
      { name: 'Partnership', price: 'Custom', description: 'Ongoing creative direction for teams with ambitious plans.' },
    ],
    faqs: [
      { question: 'Do you start with strategy?', answer: 'Yes. We clarify the audience, message, and action before exploring visual directions.' },
      { question: 'Can you adapt a campaign to multiple channels?', answer: 'That is the point. We build a core idea that can flex without losing recognition.' },
      { question: 'Do you work with internal marketing teams?', answer: 'Yes. We can lead the creative or plug into your existing campaign workflow.' },
      { question: 'Can you work to a fixed launch date?', answer: 'We can plan around a launch date when the scope and decisions are agreed early.' },
    ],
  },
  {
    number: '05', slug: 'product-labels-packaging', title: 'Product Labels & Packaging',
    shortDescription: 'Packaging that makes the product feel as considered as what is inside.',
    outcome: 'A shelf-ready product experience people notice and want to pick up.', image: sampleImages.marketing, imageAlt: 'Product packaging design concepts',
    deliverables: ['Packaging concept and visual direction', 'Front, back, and side panel layouts', 'Print-ready artwork and dieline support', 'Material and finish recommendations', 'Production handoff for your printer'],
    samples: [{ title: 'Product packaging', caption: 'A clear, ownable package system designed to stand apart on the shelf.', image: sampleImages.marketing }],
    packages: [{ name: 'Single product', price: 'From KSh 65,000', description: 'A complete packaging concept and production-ready artwork.' }, { name: 'Product range', price: 'Custom', description: 'A flexible packaging system for a growing range.', featured: true }],
    faqs: [{ question: 'Can you work with an existing brand?', answer: 'Yes. We can translate your existing identity into a packaging system that feels distinct and practical.' }],
  },
  {
    number: '06', slug: 'company-profiles', title: 'Company Profiles',
    shortDescription: 'Clear, credible company profiles that make your business easier to understand and trust.',
    outcome: 'A polished profile your team can use to open doors and win confidence.', image: sampleImages.print, imageAlt: 'Company profile document design',
    deliverables: ['Content structure and editorial direction', 'Company profile layout and art direction', 'Infographics and data visualisation', 'Print and screen-ready versions', 'Reusable proposal and presentation templates'],
    samples: [{ title: 'Company profile', caption: 'A confident document that turns a complex business into a clear story.', image: sampleImages.print }],
    packages: [{ name: 'Profile', price: 'From KSh 55,000', description: 'A polished company profile for print and digital use.', featured: true }, { name: 'Profile system', price: 'Custom', description: 'A complete set of documents for sales and business development.' }],
    faqs: [{ question: 'Can you help with the writing?', answer: 'Yes. We can shape your existing content or help structure the story before design begins.' }],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export async function getPublicServices(): Promise<Service[]> {
  if (!process.env.DATABASE_URI) return services;

  try {
    const { getPayloadClient } = await import('@/lib/payload-client');
    const payload = await getPayloadClient();
    if (!payload) return services;
    const result = await Promise.race([
      payload.find({
        collection: 'services',
        where: { status: { equals: 'published' } },
        sort: 'sortOrder',
        limit: 100,
      }),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Service lookup timed out')), 5000);
      }),
    ]);

    if (!result.docs.length) return services;

    const publishedServices = result.docs.map((doc) => {
      const fallback = services.find((service) => service.slug === doc.slug);
      return {
      number: doc.number,
      slug: doc.slug,
      title: fallback?.title ?? doc.title,
      shortDescription: doc.shortDescription,
      outcome: doc.outcome,
      image: doc.image || '',
      imageAlt: doc.imageAlt || doc.title,
      bestFor: doc.bestFor || undefined,
      timeline: doc.timeline || undefined,
      startingFrom: doc.startingFrom || undefined,
      deliverables: doc.deliverables?.map(({ item }) => item) ?? [],
      samples: doc.samples?.map(({ title, caption, image }) => ({ title, caption, image })) ?? [],
      packages: doc.packages?.map(({ name, price, description, featured }) => ({ name, price, description, featured: Boolean(featured) })) ?? [],
      faqs: doc.faqs?.map(({ question, answer }) => ({ question, answer })) ?? [],
      };
    });

    const publishedSlugs = new Set(publishedServices.map((service) => service.slug));
    // Keep built-in entries for slugs that editors have not published in the CMS.
    const retainedFallbacks = services.filter((service) => !publishedSlugs.has(service.slug));

    return [...publishedServices, ...retainedFallbacks];
  } catch {
    return services;
  }
}

export async function getPublicService(slug: string): Promise<Service | undefined> {
  const publicServices = await getPublicServices();
  return publicServices.find((service) => service.slug === slug);
}
