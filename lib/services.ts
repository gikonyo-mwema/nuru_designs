export type Service = {
  number: string;
  slug: string;
  title: string;
  shortDescription: string;
  outcome: string;
  image: string;
  imageAlt: string;
  deliverables: string[];
  samples: { title: string; caption: string; image: string }[];
  packages: { name: string; price: string; description: string; featured?: boolean }[];
  testimonials: string[];
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
    number: '01', slug: 'social-media-graphics', title: 'Social media graphics',
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
    testimonials: ['“Our content finally looks as confident as the business behind it.”', '“The templates gave our team speed without losing personality.”'],
    faqs: [
      { question: 'Can you work from our existing brand?', answer: 'Yes. We can extend your current identity or sharpen the parts that are not working.' },
      { question: 'How many graphics are included?', answer: 'The package determines the quantity, with custom bundles available for larger campaigns.' },
      { question: 'Do you provide editable files?', answer: 'Yes. We deliver the agreed source files alongside ready-to-publish exports.' },
      { question: 'How long does a campaign take?', answer: 'Most focused campaigns take two to four weeks from discovery to final delivery.' },
    ],
  },
  {
    number: '02', slug: 'brand-identity-and-logo-design', title: 'Brand identity',
    shortDescription: 'Distinctive identity systems that turn a good business into a memorable brand.',
    outcome: 'A clear, confident brand people can recognize at a glance.', image: sampleImages.identity, imageAlt: 'Brand identity stationery and logo sketches',
    deliverables: ['3 logo concepts with a clear rationale', 'Primary, secondary, and responsive logo marks', 'Color palette and typography system', 'Brand guidelines PDF', 'Business card, letterhead, and social kit'],
    samples: [
      { title: 'Identity system', caption: 'A flexible visual language built to move from packaging to digital.', image: sampleImages.identity },
      { title: 'Logo direction', caption: 'A focused mark and type system that make the brand feel ownable.', image: sampleImages.social },
      { title: 'Stationery suite', caption: 'Tactile touchpoints that turn every client interaction into a brand moment.', image: sampleImages.print },
      { title: 'Brand guidelines', caption: 'A practical system that helps the whole team create with confidence.', image: sampleImages.marketing },
    ],
    packages: [
      { name: 'Essential', price: 'From KSh 85,000', description: 'A focused logo suite, palette, type, and core brand guide.' },
      { name: 'Signature', price: 'From KSh 150,000', description: 'A complete identity system with launch-ready brand touchpoints.', featured: true },
      { name: 'Full system', price: 'Custom', description: 'A deeper identity and rollout for ambitious growing brands.' },
    ],
    testimonials: ['“Nuru gave us the clarity to show up like the brand we knew we could be.”', '“Every detail feels intentional, from the logo to the last slide.”'],
    faqs: [
      { question: 'How many logo concepts do we receive?', answer: 'The Signature package includes three distinct concepts, each grounded in the agreed strategy.' },
      { question: 'What file formats are included?', answer: 'You receive the final identity in web and print-ready formats, including SVG, PDF, PNG, and JPG.' },
      { question: 'Do you include revisions?', answer: 'Yes. We refine the chosen direction together until it is ready to use.' },
      { question: 'Can you apply the identity to our existing materials?', answer: 'Yes. We can extend the system across stationery, social, packaging, and digital touchpoints.' },
    ],
  },
  {
    number: '03', slug: 'print-design', title: 'Print design',
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
    testimonials: ['“The printed pieces made our launch feel like a real occasion.”', '“They handled the details we did not know to ask about.”'],
    faqs: [
      { question: 'Do you manage printing?', answer: 'We can prepare production-ready files and support vendor coordination or print supervision.' },
      { question: 'Can you recommend materials?', answer: 'Yes. We recommend stock, format, and finish based on the purpose and budget.' },
      { question: 'What can you design?', answer: 'Common projects include posters, brochures, reports, flyers, menus, packaging, and stationery.' },
      { question: 'How long does production take?', answer: 'Design usually takes one to three weeks, with printing time depending on the supplier.' },
    ],
  },
  {
    number: '04', slug: 'marketing-design', title: 'Marketing design',
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
    testimonials: ['“The campaign gave our launch a clear voice from day one.”', '“We finally had one idea working hard across every channel.”'],
    faqs: [
      { question: 'Do you start with strategy?', answer: 'Yes. We clarify the audience, message, and action before exploring visual directions.' },
      { question: 'Can you adapt a campaign to multiple channels?', answer: 'That is the point. We build a core idea that can flex without losing recognition.' },
      { question: 'Do you work with internal marketing teams?', answer: 'Yes. We can lead the creative or plug into your existing campaign workflow.' },
      { question: 'Can you work to a fixed launch date?', answer: 'We can plan around a launch date when the scope and decisions are agreed early.' },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
