import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import { isIP } from 'node:net';

import config from '@payload-config';

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_ADDRESSES = 10_000;
const RATE_LIMIT_OVERFLOW_ADDRESS = 'rate-limit-overflow';
const MAX_BODY_BYTES = 16_000;
// This bounds memory per process; distributed deployments need an edge or shared-store limit.
const requestsByAddress = new Map<string, { count: number; resetAt: number }>();

async function sendContactNotification({ name, email, message }: { name: string; email: string; message: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL;
  const sender = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !recipient || !sender) return;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `New website enquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(5_000),
    });

    if (!response.ok) {
      console.error(`Contact notification delivery failed with status ${response.status}.`);
    }
  } catch {
    console.error('Contact notification delivery failed.');
  }
}

async function readJsonBody(request: Request): Promise<{ body: unknown; tooLarge: boolean }> {
  if (!request.body) return { body: null, tooLarge: false };

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  // Enforce the limit while streaming because Content-Length can be missing or inaccurate.
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return { body: null, tooLarge: true };
      }
      chunks.push(value);
    }
  } catch {
    return { body: null, tooLarge: false };
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return { body: JSON.parse(new TextDecoder().decode(bytes)), tooLarge: false };
  } catch {
    return { body: null, tooLarge: false };
  }
}

function isRateLimited(address: string, now: number) {
  for (const [key, entry] of requestsByAddress) {
    if (entry.resetAt <= now) requestsByAddress.delete(key);
  }

  const entry = requestsByAddress.get(address);
  if (!entry || entry.resetAt <= now) {
    const key = entry || requestsByAddress.size < RATE_LIMIT_MAX_ADDRESSES
      ? address
      : RATE_LIMIT_OVERFLOW_ADDRESS;
    const overflowEntry = requestsByAddress.get(key);

    if (overflowEntry && overflowEntry.resetAt > now) {
      overflowEntry.count += 1;
      return overflowEntry.count > RATE_LIMIT_MAX_REQUESTS;
    }

    requestsByAddress.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Your message is too large.' }, { status: 413 });
  }

  const { body, tooLarge } = await readJsonBody(request);
  if (tooLarge) {
    return NextResponse.json({ error: 'Your message is too large.' }, { status: 413 });
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Please submit a valid contact form.' }, { status: 400 });
  }

  const formBody = body as Record<string, unknown>;

  // The form's hidden website field is a honeypot; accept bot submissions without storing them.
  if (typeof formBody.website === 'string' && formBody.website.trim()) {
    return NextResponse.json({ message: 'Thanks. We will be in touch soon.' });
  }

  // This header must be overwritten by trusted hosting infrastructure before reaching the app.
  const forwardedAddress = request.headers.get('x-real-ip')?.trim() || '';
  const address = isIP(forwardedAddress) ? forwardedAddress : 'unknown';
  if (isRateLimited(address, Date.now())) {
    return NextResponse.json(
      { error: 'Too many messages have been sent. Please try again in a few minutes.' },
      { status: 429, headers: { 'Retry-After': String(RATE_LIMIT_WINDOW_MS / 1000) } },
    );
  }

  const name = typeof formBody.name === 'string' ? formBody.name.trim() : '';
  const email = typeof formBody.email === 'string' ? formBody.email.trim() : '';
  const message = typeof formBody.message === 'string' ? formBody.message.trim() : '';

  if (
    !name || name.length > 120
    || !email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    || !message || message.length > 5000
  ) {
    return NextResponse.json(
      { error: 'Enter a name (up to 120 characters), a valid email, and a message (up to 5,000 characters).' },
      { status: 400 },
    );
  }

  if (!process.env.DATABASE_URI) {
    return NextResponse.json({ error: 'Contact submissions are not configured yet.' }, { status: 503 });
  }

  try {
    const payload = await getPayload({ config });
    await payload.create({
      collection: 'contact-submissions',
      data: { name, email, message, status: 'new' },
    });
  } catch {
    return NextResponse.json({ error: 'We could not send your message right now. Please try again or email us directly.' }, { status: 503 });
  }

  // Persist first so an optional email delivery failure cannot lose the enquiry.
  await sendContactNotification({ name, email, message });

  return NextResponse.json({ message: 'Thanks. We will be in touch soon.' });
}