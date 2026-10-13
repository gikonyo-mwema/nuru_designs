import type { CollectionConfig } from 'payload';

import { revalidateAfterChange, revalidateAfterDelete } from '../lib/revalidate';
import { projectCategories } from '../lib/project-categories';

const Projects: CollectionConfig = {
  slug: 'projects',
  defaultSort: 'sortOrder',
  admin: {
    useAsTitle: 'title',
    group: 'Portfolio',
    description: 'Portfolio projects shown on the public work pages.',
    defaultColumns: ['title', 'category', 'status', 'year', 'featured', 'publishedAt'],
  },
  versions: {
    maxPerDoc: 10,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
    beforeChange: [({ data, originalDoc }) => {
      if (data.status === 'published' && !data.publishedAt && !originalDoc?.publishedAt) {
        return { ...data, publishedAt: new Date().toISOString() };
      }

      return data;
    }],
  },
  access: {
    read: ({ req: { user } }) => (user ? true : { status: { equals: 'published' } }),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [({ value, siblingData }) => {
          if (typeof value === 'string' && value.trim()) return value;

          return typeof siblingData.title === 'string'
            ? siblingData.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
            : value;
        }],
      },
      admin: {
        description: 'URL-friendly slug (e.g., "awesome-branding-project")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: projectCategories.map(([value, label]) => ({ label, value })),
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
      admin: {
        description: 'Add searchable keywords such as crusade, election, print, or event.',
      },
    },
    {
      name: 'projectType',
      type: 'select',
      defaultValue: 'single-design',
      options: [
        { label: 'Campaign', value: 'campaign' },
        { label: 'Brand system', value: 'brand-system' },
        { label: 'Single design', value: 'single-design' },
      ],
      admin: {
        description: 'Only published projects appear on public work pages.',
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'heroImage',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      admin: {
        components: {
          Field: '/components/admin/MediaRelationshipField#default',
        },
        description: 'Choose the main image for this project. The picker includes thumbnails and a preview.',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          required: true,
          admin: {
            components: {
              Field: '/components/admin/MediaRelationshipField#default',
            },
          },
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'services',
      type: 'array',
      fields: [
        {
          name: 'service',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'client',
      type: 'text',
    },
    {
      name: 'year',
      type: 'number',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first in public work listings.',
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
};

export default Projects;
