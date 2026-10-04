'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

export default function ContactPage() {
  const [feedback, setFeedback] = useState<{ message: string; success: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const feedbackRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    feedbackRef.current?.focus();
  }, [feedback]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);
    const form = event.currentTarget;
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json();
      setFeedback({
        message: result.message || result.error || 'Something went wrong. Please try again.',
        success: response.ok,
      });
      if (response.ok) form.reset();
    } catch {
      setFeedback({ message: 'We could not send your message. Please try again or email us directly.', success: false });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="contact-page">
      <section className="contact-intro site-container">
        <p className="eyebrow">Start a conversation</p>
        <h1>Let&apos;s make your<br /><em>next move clear.</em></h1>
        <p className="contact-lead">Tell us what you are building, where you are stuck, or what you want people to remember. We&apos;ll help you find the clearest next step.</p>
      </section>
      <section className="contact-form-section site-container">
        <aside className="contact-options" aria-label="Other ways to reach us">
          <p className="eyebrow">Prefer a direct line?</p>
          <a href="tel:+254180693218">+254 180 693 218</a>
          <a href="mailto:nurudesignske@gmail.com">nurudesignske@gmail.com</a>
          <p>We reply within one working day. After your message, we&apos;ll follow up by email to clarify your goals and suggest a next step.</p>
        </aside>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="contact-form-row">
            <div className="contact-field"><label htmlFor="name">Name</label><input type="text" id="name" name="name" autoComplete="name" required placeholder="Your name" /></div>
            <div className="contact-field"><label htmlFor="email">Email</label><input type="email" id="email" name="email" autoComplete="email" required placeholder="you@example.com" /></div>
          </div>
          <div className="contact-field"><label htmlFor="message">What can we help you make?</label><textarea id="message" name="message" required rows={7} placeholder="Tell us about your project, timeline, and what success should look like." /></div>
          <div className="contact-form-footer"><p>We usually reply within one working day.</p><button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send message'} <span aria-hidden="true">↗</span></button></div>
          {feedback ? <p ref={feedbackRef} className={`contact-status ${feedback.success ? 'is-success' : 'is-error'}`} role={feedback.success ? 'status' : 'alert'} tabIndex={-1}>{feedback.message}</p> : null}
        </form>
      </section>
    </main>
  );
}