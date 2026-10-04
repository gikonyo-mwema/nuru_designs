import type { CollectionConfig } from 'payload';

import { revalidateAfterChange, revalidateAfterDelete } from '../lib/revalidate';

const Services: CollectionConfig = {
  slug: 'services',
  defaultSort: 'sortOrder',
  admin: {
    useAsTitle: 'title',
    group: 'Website',
    description: 'Services shown on the homepage and Services pages. Edit the copy, packages, examples, and FAQs here.',
    defaultColumns: ['number', 'title', 'status', 'sortOrder'],
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
    { name: 'title', type: 'text', required: true, admin: { description: 'The service name shown on the site.' } },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL ending for this service page. Keep existing slugs when editing current services.' },
    },
    { name: 'number', type: 'text', required: true, admin: { description: 'Display number, for example 01.' } },
    { name: 'shortDescription', type: 'textarea', required: true, admin: { description: 'One sentence for the homepage service card and Services page.' } },
    { name: 'outcome', type: 'textarea', required: true, admin: { description: 'The main outcome shown at the top of this service page.' } },
    { name: 'image', type: 'text', admin: { description: 'Full image URL used as the service page hero image.' } },
    { name: 'imageAlt', type: 'text', admin: { description: 'Describe the hero image for visitors using screen readers.' } },
    { name: 'bestFor', type: 'text', admin: { description: 'Who this service is best suited to.' } },
    { name: 'timeline', type: 'text', admin: { description: 'Typical project duration, for example 2–4 weeks.' } },
    { name: 'startingFrom', type: 'text', admin: { description: 'Starting price displayed on the Services page.' } },
    {
      name: 'deliverables',
      type: 'array',
      labels: { singular: 'Deliverable', plural: 'Deliverables' },
      fields: [{ name: 'item', type: 'text', required: true, admin: { description: 'One item included in this service.' } }],
    },
    {
      name: 'packages',
      type: 'array',
      labels: { singular: 'Package', plural: 'Packages' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'price', type: 'text', required: true, admin: { description: 'For example From KSh 35,000 or Custom.' } },
        { name: 'description', type: 'textarea', required: true },
        { name: 'featured', type: 'checkbox', defaultValue: false, admin: { description: 'Highlight this as the most popular package.' } },
      ],
    },
    {
      name: 'samples',
      type: 'array',
      labels: { singular: 'Example', plural: 'Creative examples' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'caption', type: 'textarea', required: true },
        { name: 'image', type: 'text', required: true, admin: { description: 'Full image URL for this illustrative example.' } },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      labels: { singular: 'Question and answer', plural: 'Service FAQs' },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { description: 'Lower numbers appear first on the site.', position: 'sidebar' } },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { description: 'Only published services are shown on public pages.', position: 'sidebar' },
    },
  ],
};

export default Services;