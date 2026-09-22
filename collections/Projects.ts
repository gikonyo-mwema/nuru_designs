import type { CollectionConfig } from 'payload';

const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
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
      options: [
        { label: 'Brand identity', value: 'brand-identity' },
        { label: 'Posters', value: 'posters' },
        { label: 'Banners', value: 'banners' },
        { label: 'Menus', value: 'menus' },
        { label: 'Social media', value: 'social-media' },
        { label: 'Corporate', value: 'corporate' },
        { label: 'Church', value: 'church' },
        { label: 'Campaigns', value: 'campaigns' },
        { label: 'Charity and NGO', value: 'charity' },
      ],
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
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
};

export default Projects;
