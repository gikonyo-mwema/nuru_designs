import { NextResponse } from 'next/server';
import { getPayload } from 'payload';

import config from '@payload-config';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const message = typeof body?.message === 'string' ? body.message.trim() : '';

  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please provide a name, valid email, and message.' }, { status: 400 });
  }

  if (!process.env.DATABASE_URI) {
    return NextResponse.json({ error: 'Contact submissions are not configured yet.' }, { status: 503 });
  }

  try {
    const payload = await getPayload({ config });
    await Promise.race([
      payload.create({
        collection: 'contact-submissions',
        data: { name, email, message },
      }),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Contact submission timed out')), 1500);
      }),
    ]);
  } catch {
    return NextResponse.json({ error: 'We could not send your message right now. Please try again or email us directly.' }, { status: 503 });
  }

  return NextResponse.json({ message: 'Thanks. We will be in touch soon.' });
}