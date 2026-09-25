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
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json();
      setStatus(result.message || result.error || 'Something went wrong. Please try again.');
      if (response.ok) form.reset();
    } catch {
      setStatus('We could not send your message. Please try again or email us directly.');
    }
    setIsSubmitting(false);
  }

  return (
    <main className="contact-page">
      <section className="contact-intro site-container">
        <p className="eyebrow">Start a conversation</p>
        <h1>Let&apos;s make your<br /><em>next move clear.</em></h1>
        <p className="contact-lead">Tell us what you are building, where you are stuck, or what you want people to remember. We&apos;ll help you find the clearest next step.</p>
      </section>
      <section className="contact-form-section site-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-row">
            <div className="contact-field"><label htmlFor="name">Name</label><input type="text" id="name" name="name" required placeholder="Your name" /></div>
            <div className="contact-field"><label htmlFor="email">Email</label><input type="email" id="email" name="email" required placeholder="you@example.com" /></div>
          </div>
          <div className="contact-field"><label htmlFor="message">What can we help you make?</label><textarea id="message" name="message" required rows={7} placeholder="Tell us about your project, timeline, and what success should look like." /></div>
          <div className="contact-form-footer"><p>We usually reply within one working day.</p><button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send message'} <span aria-hidden="true">↗</span></button></div>
          {status ? <p className="contact-status" role="status">{status}</p> : null}
        </form>
      </section>
    </main>
  );
}