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

  const payload = await getPayload({ config });
  await payload.create({
    collection: 'contact-submissions',
    data: { name, email, message },
  });

  return NextResponse.json({ message: 'Thanks. We will be in touch soon.' });
}