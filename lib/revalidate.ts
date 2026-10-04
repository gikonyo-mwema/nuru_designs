import { revalidatePath } from 'next/cache';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

// revalidatePath throws outside a Next request (e.g. Payload CLI or seed scripts).
function revalidatePublicPages() {
  try {
    revalidatePath('/', 'layout');
  } catch {}
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc, context }) => {
  if (!context.disableRevalidate) revalidatePublicPages();
  return doc;
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc, context }) => {
  if (!context.disableRevalidate) revalidatePublicPages();
  return doc;
};
