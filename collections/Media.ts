import type { CollectionConfig } from 'payload';

import { revalidateAfterChange, revalidateAfterDelete } from '../lib/revalidate';

const Media: CollectionConfig = {
  slug: 'media',
  defaultSort: '-createdAt',
  admin: {
    useAsTitle: 'filename',
    group: 'Portfolio',
    description: 'Images used across project pages and studio content.',
    defaultColumns: ['filename', 'alt', 'mediaType', 'year', 'createdAt'],
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Describe the image for visitors using screen readers; leave out phrases like "image of".',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
    },
    {
      name: 'mediaType',
      type: 'select',
      defaultValue: 'portfolio',
      options: [
        { label: 'Portfolio work', value: 'portfolio' },
        { label: 'Brand asset', value: 'brand-asset' },
        { label: 'Campaign artwork', value: 'campaign' },
        { label: 'Studio image', value: 'studio' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'year',
      type: 'number',
      admin: {
        description: 'The year the artwork was designed or published.',
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
      admin: {
        description: 'Add keywords to make older artwork easier to find.',
      },
    },
  ],
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'],
    adminThumbnail: ({ doc }) => String(doc.url ?? '').replace('/upload/', '/upload/c_fill,w_400,h_300,f_auto,q_auto/'),
  },
};

export default Media;
