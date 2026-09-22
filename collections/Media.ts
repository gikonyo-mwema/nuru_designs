import type { CollectionConfig } from 'payload';

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'textarea',
    },
  ],
  upload: {
    staticDir: 'media',
    disableLocalStorage: process.env.NODE_ENV === 'production', // Use Cloudinary in production
    adminThumbnail: '[width]x[height]',
    mimeTypes: ['image/*'],
  },
};

export default Media;
