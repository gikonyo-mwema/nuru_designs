import type { Adapter } from '@payloadcms/plugin-cloud-storage/types';
import { v2 as cloudinary } from 'cloudinary';
import path from 'node:path';

const FOLDER = 'nuru-designs/media';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

export const isCloudinaryConfigured = Boolean(cloudName && apiKey && apiSecret);

// Cloudinary public IDs exclude the extension; it is re-added as the delivery format.
function publicId(filename: string) {
  return `${FOLDER}/${path.parse(filename).name}`;
}

function deliveryUrl(filename: string) {
  const format = path.extname(filename).slice(1) || undefined;
  return cloudinary.url(publicId(filename), { secure: true, resource_type: 'image', type: 'upload', format, urlAnalytics: false });
}

export const cloudinaryAdapter: Adapter = () => {
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret, secure: true });

  return {
    name: 'cloudinary',
    generateURL: ({ filename }) => deliveryUrl(filename),
    handleUpload: async ({ file }) => {
      await new Promise<void>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { public_id: publicId(file.filename), resource_type: 'image', overwrite: false, unique_filename: false },
            (error) => (error ? reject(error) : resolve()),
          )
          .end(file.buffer);
      });
    },
    handleDelete: async ({ filename }) => {
      await cloudinary.uploader.destroy(publicId(filename), { resource_type: 'image', invalidate: true });
    },
    // Only reached if Payload access control is re-enabled; public URLs point straight at Cloudinary.
    staticHandler: (_req, { params }) => Response.redirect(deliveryUrl(params.filename), 302),
  };
};
