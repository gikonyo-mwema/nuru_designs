import type { CollectionConfig } from 'payload';
import { revalidatePath } from 'next/cache';

function revalidateAboutPage() {
  try {
    revalidatePath('/about');
  } catch {}
}

const Teams: CollectionConfig = {
  slug: 'teams',
  defaultSort: 'sortOrder',
  admin: {
    useAsTitle: 'name',
    group: 'Teams',
    description: 'Manage the founder and team profiles shown on the About page.',
    defaultColumns: ['name', 'role', 'status', 'sortOrder'],
  },
  hooks: {
    afterChange: [({ doc, context }) => {
      if (!context.disableRevalidate) revalidateAboutPage();
      return doc;
    }],
    afterDelete: [({ doc, context }) => {
      if (!context.disableRevalidate) revalidateAboutPage();
      return doc;
    }],
  },
  access: {
    read: ({ req: { user } }) => (user ? true : { status: { equals: 'published' } }),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', required: true, admin: { description: 'For example, Founder or Lead Designer.' } },
    { name: 'bio', type: 'textarea', required: true },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Upload a new portrait or choose an image from the Media library.' },
    },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { description: 'Lower numbers appear first on the About page.', position: 'sidebar' } },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { description: 'Only published profiles appear on the About page.', position: 'sidebar' },
    },
  ],
};

export default Teams;