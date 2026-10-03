import type { CollectionConfig } from 'payload';

import { revalidateAfterChange, revalidateAfterDelete } from '../lib/revalidate';

const FAQs: CollectionConfig = {
  slug: 'faqs',
  defaultSort: 'sortOrder',
  admin: {
    useAsTitle: 'question',
    group: 'Website',
    description: 'Questions shown on the homepage and Services page.',
    defaultColumns: ['question', 'placement', 'status', 'sortOrder'],
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  access: {
    read: ({ req: { user } }) => (user ? true : { status: { equals: 'published' } }),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'question', type: 'text', required: true, admin: { description: 'Write the question as a visitor would ask it.' } },
    { name: 'answer', type: 'textarea', required: true, admin: { description: 'Keep the answer clear and concise.' } },
    {
      name: 'placement',
      type: 'select',
      required: true,
      defaultValue: 'both',
      options: [
        { label: 'Homepage', value: 'home' },
        { label: 'Services page', value: 'services' },
        { label: 'Both pages', value: 'both' },
      ],
      admin: { description: 'Choose where this question appears.' },
    },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { description: 'Lower numbers appear first.', position: 'sidebar' } },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { description: 'Only published questions appear on the selected public pages.', position: 'sidebar' },
    },
  ],
};

export default FAQs;