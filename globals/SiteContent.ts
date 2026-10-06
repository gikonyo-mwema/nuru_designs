import type { GlobalConfig } from 'payload';
import { revalidatePath } from 'next/cache';

const SiteContent: GlobalConfig = {
  slug: 'site-content',
  label: 'Site Content',
  admin: {
    group: 'Website',
    description: 'Edit homepage messaging, About and studio details, and footer contacts.',
  },
  hooks: {
    afterChange: [({ doc }) => {
      try {
        revalidatePath('/', 'layout');
      } catch {}
      return doc;
    }],
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Homepage',
      fields: [
        {
          name: 'homeHeroBackground',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Upload a new hero background or choose an image from the Media library.' },
        },
        { name: 'homeHeroLead', type: 'text', admin: { description: 'First part of the homepage headline.' } },
        { name: 'homeHeroEmphasis', type: 'text', admin: { description: 'Emphasized word or phrase in the headline.' } },
        { name: 'homeHeroEnd', type: 'text', admin: { description: 'Final part of the homepage headline.' } },
        { name: 'homeHeroIntro', type: 'textarea', admin: { description: 'Clearly name the design services and audience beneath the homepage headline.' } },
        {
          name: 'trustSectors',
          type: 'array',
          labels: { singular: 'Sector', plural: 'Trust sectors' },
          admin: { description: 'Business sectors displayed beneath the homepage hero. These describe your audience, not client endorsements.' },
          fields: [{ name: 'label', type: 'text', required: true }],
        },
        { name: 'founderEyebrow', type: 'text', admin: { description: 'Small heading above the homepage founder note.' } },
        { name: 'founderHeading', type: 'text', admin: { description: 'Headline for the homepage founder note.' } },
        { name: 'founderCopy', type: 'textarea', admin: { description: 'Short founder or studio introduction on the homepage.' } },
        { name: 'founderName', type: 'text', admin: { description: 'Name or attribution shown below the founder note.' } },
      ],
    },
    {
      type: 'collapsible',
      label: 'About and Studio',
      fields: [
        { name: 'aboutLead', type: 'textarea', admin: { description: 'Opening introduction on the About page.' } },
        { name: 'whyHeading', type: 'text', admin: { description: 'Headline for the Why we exist section.' } },
        {
          name: 'whyParagraphs',
          type: 'array',
          labels: { singular: 'Paragraph', plural: 'Why we exist paragraphs' },
          admin: { description: 'Shown in order beneath the Why we exist heading.' },
          fields: [{ name: 'paragraph', type: 'textarea', required: true }],
        },
        { name: 'beliefsHeading', type: 'text', admin: { description: 'Headline above the studio beliefs.' } },
        {
          name: 'beliefs',
          type: 'array',
          labels: { singular: 'Belief', plural: 'Studio beliefs' },
          admin: { description: 'Beliefs are shown in order on the About page.' },
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
          ],
        },
        { name: 'processHeading', type: 'text', admin: { description: 'Headline above the About page process.' } },
        {
          name: 'processSteps',
          type: 'array',
          labels: { singular: 'Step', plural: 'Process steps' },
          admin: { description: 'Steps are shown in order; use a short number such as 01.' },
          fields: [
            { name: 'number', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
          ],
        },
        { name: 'studioHeading', type: 'text', admin: { description: 'Headline introducing the studio.' } },
        { name: 'studioIntro', type: 'textarea', admin: { description: 'Short introduction to the studio and how the team works.' } },
        { name: 'founderQuote', type: 'textarea', admin: { description: 'Founder quote displayed on the About page.' } },
        { name: 'founderAttribution', type: 'text', admin: { description: 'Name or role shown below the founder quote.' } },
        { name: 'teamStatement', type: 'textarea', admin: { description: 'Team description displayed below the founder quote.' } },
        {
          name: 'teamMembers',
          type: 'array',
          labels: { singular: 'Team member', plural: 'Team members' },
          admin: { description: 'Fallback team content used when no published Team profiles are available.' },
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'role', type: 'text', required: true },
            { name: 'bio', type: 'textarea', required: true },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Footer and Contact',
      fields: [
        { name: 'footerStudioDescription', type: 'text', admin: { description: 'One-line studio description in the footer.' } },
        { name: 'contactPhoneDisplay', type: 'text', admin: { description: 'Phone number shown to visitors.' } },
        { name: 'contactPhoneLink', type: 'text', admin: { description: 'Phone number for the tel: link, including country code and no spaces (for example +254180693218).' } },
        { name: 'contactEmail', type: 'email', admin: { description: 'Email address shown in the footer and About page.' } },
        { name: 'copyrightYear', type: 'number', admin: { description: 'Year shown in the footer copyright line.' } },
      ],
    },
  ],
};

export default SiteContent;