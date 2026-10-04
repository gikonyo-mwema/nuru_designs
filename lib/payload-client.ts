import { getPayload } from 'payload';
import type { Payload } from 'payload';

import config from '@payload-config';

let payloadPromise: Promise<Payload> | undefined;

export async function getPayloadClient(): Promise<Payload | null> {
  if (!process.env.DATABASE_URI) return null;

  // Reuse initialization across requests; clear failures below so a later request can retry.
  payloadPromise ??= getPayload({ config });

  try {
    return await Promise.race([
      payloadPromise,
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Payload initialization timed out')), 8000);
      }),
    ]);
  } catch {
    payloadPromise = undefined;
    return null;
  }
}