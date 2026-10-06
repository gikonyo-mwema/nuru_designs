import type { CollectionConfig } from 'payload';

const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  defaultSort: '-createdAt',
  admin: {
    useAsTitle: 'email',
    group: 'Enquiries',
    description: 'Messages from prospective and current clients.',
    defaultColumns: ['name', 'business', 'service', 'status', 'followUpAt', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    // Public submissions go through /api/contact, which creates records server-side.
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'name', type: 'text', required: true, admin: { readOnly: true } },
    { name: 'email', type: 'email', required: true, admin: { readOnly: true } },
    { name: 'business', type: 'text', admin: { readOnly: true } },
    { name: 'whatsapp', type: 'text', admin: { readOnly: true } },
    { name: 'service', type: 'text', admin: { readOnly: true } },
    { name: 'message', type: 'textarea', required: true, admin: { readOnly: true } },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Closed', value: 'closed' },
        { label: 'Spam', value: 'spam' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes only. These are never shown to the sender.',
      },
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'followUpAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
};

export default ContactSubmissions;