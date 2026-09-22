'use client';

import { FormEvent, useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus('');
    const form = event.currentTarget;
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    const result = await response.json();
    setStatus(result.message || result.error);
    setIsSubmitting(false);
    if (response.ok) form.reset();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Get In Touch</h1>
      <div className="max-w-2xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div><label htmlFor="name" className="block text-lg font-semibold mb-2">Name</label><input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-[var(--ink)]/20 bg-[var(--paper)] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--acid)]" placeholder="Your name" /></div>
          <div><label htmlFor="email" className="block text-lg font-semibold mb-2">Email</label><input type="email" id="email" name="email" required className="w-full px-4 py-2 border border-[var(--ink)]/20 bg-[var(--paper)] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--acid)]" placeholder="your@email.com" /></div>
          <div><label htmlFor="message" className="block text-lg font-semibold mb-2">Message</label><textarea id="message" name="message" required rows={5} className="w-full px-4 py-2 border border-[var(--ink)]/20 bg-[var(--paper)] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--acid)]" placeholder="Tell us about your project" /></div>
          <button type="submit" disabled={isSubmitting} className="bg-[var(--ink)] text-[var(--paper)] px-8 py-3 hover:bg-[var(--acid)] hover:text-[var(--ink)] transition">{isSubmitting ? 'Sending...' : 'Send Message'}</button>
          {status ? <p role="status" className="text-muted">{status}</p> : null}
        </form>
      </div>
    </div>
  );
}