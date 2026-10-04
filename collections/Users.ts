import type { CollectionConfig } from 'payload';

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'Studio',
    description: 'People who can sign in to manage the studio website.',
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'createdAt'],
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      admin: {
        description: 'Display name for this studio account.',
      },
    },
  ],
};

export default Users;