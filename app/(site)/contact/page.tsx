'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { CalendarDays, Mail, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';

const calendlyUrl = 'https://calendly.com/nurudesignske/30min';
const whatsappUrl = 'https://wa.me/254180693218?text=Hi%20Nuru%20Designs%2C%20I%27m%20interested%20in%20learning%20more%20about%20your%20services.';
const emailAddress = 'nurudesignske@gmail.com';
const phoneDisplay = '+254 180 693 218';
const phoneLink = '+254180693218';
const budgetOptions = ['Under KSh 25,000', 'KSh 25,000 - KSh 50,000', 'KSh 50,000 - KSh 100,000', 'KSh 100,000 - KSh 250,000', 'Over KSh 250,000', "I'm not sure yet"];
const timelineOptions = ['ASAP (within 2 weeks)', 'Within a month', 'Within 2-3 months', 'Just exploring for now'];
const interestOptions = [
  { value: 'branding', label: 'Branding & Identity' },
  { value: 'social-media', label: 'Social Media Graphics' },
  { value: 'flyer-poster', label: 'Print Design (Flyers, Posters)' },
  { value: 'packaging', label: 'Packaging Design' },
  { value: 'company-profile', label: 'Company Profile' },
  { value: 'marketing-design', label: 'Campaign Design' },
  { value: 'other', label: 'Not sure yet' },
];
const faqs = [
  ['How much does a project cost?', 'Every project is different, but to give you a ballpark: branding projects start from KSh 85,000, social media packages from KSh 35,000, and print design from KSh 25,000. After your discovery call, you will receive a detailed proposal with exact pricing.'],
  ["I'm a small business. Can I afford this?", 'Absolutely. We work with businesses of all sizes, from solo founders to established companies. We can scope projects to fit your budget and talk through payment milestones.'],
  ['How long does a project take?', 'Most projects take between 2 and 6 weeks, depending on scope and feedback. We give you a clear timeline before we start.'],
  ['Do you work with businesses outside Nairobi?', 'Yes. We work with businesses across Kenya and beyond. Everything is done remotely, so distance is never a barrier.'],
  ["What if I don't like the designs?", 'We refine the chosen direction together through clear review points, so you are never surprised by the final result.'],
  ['Do you offer payment plans?', 'For larger projects, we typically structure payments in milestones, such as 50% upfront and 50% on completion.'],
  ['What do you need from me to get started?', 'Just a conversation. You do not need a formal brief. We will ask about your business, goals, and audience, then guide you from there.'],
] as const;

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
      const formData = new FormData(form);
      const selectedServices = formData.getAll('services').map(String);
      if (!selectedServices.length) {
        setFeedback({ message: 'Please choose at least one service you are interested in.', success: false });
        setIsSubmitting(false);
        return;
      }
      const message = String(formData.get('message') || '').trim();
      const qualification = [`Interested in: ${selectedServices.join(', ') || 'Not specified'}`, `Budget: ${formData.get('budget') || 'Not specified'}`, `Timeline: ${formData.get('timeline') || 'Not specified'}`].join('\n');
      formData.set('message', `${message || 'No additional project details provided.'}\n\n${qualification}`);
      formData.set('service', selectedServices[0] || 'other');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
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
        <p className="eyebrow">Contact</p>
        <h1>Let&apos;s build something<br /><em>worth remembering.</em></h1>
        <p className="contact-lead">Whether you have a full brief or just a rough idea, the next step is the same - a short, free conversation. No pressure. No obligation.</p>
        <div className="contact-hero-actions"><a href={calendlyUrl} className="button button-dark" target="_blank" rel="noreferrer">Book a Free Discovery Call <span aria-hidden="true">↗</span></a><a href={whatsappUrl} className="text-link" target="_blank" rel="noreferrer">Prefer to chat first? Message us on WhatsApp <span aria-hidden="true">→</span></a></div>
      </section>

      <section className="contact-process section-tint"><div className="site-container"><div className="contact-section-heading"><p className="eyebrow">What happens next</p><h2>Three simple steps.<br /><em>No mystery.</em></h2></div><div className="contact-process-grid">
        <article><span>01</span><h3>You book a call</h3><p>Pick a time that works for you. You&apos;ll get a confirmation and a short questionnaire so we can hit the ground running.</p><small>Takes 2 minutes</small></article>
        <article><span>02</span><h3>We talk</h3><p>A relaxed 15-minute conversation about your business, your goals, and what success looks like for you. No jargon. No hard sell.</p><small>15 minutes</small></article>
        <article><span>03</span><h3>You get a clear proposal</h3><p>Within 48 hours, you&apos;ll receive a tailored proposal with scope, timeline, and investment. Then you decide if it&apos;s the right fit.</p><small>Within 48 hours</small></article>
      </div></div></section>

      <section className="contact-channels site-container"><div className="contact-section-heading"><p className="eyebrow">Four ways to reach us</p><h2>Choose the way<br /><em>that works for you.</em></h2><p>However you prefer to communicate, we&apos;re listening.</p></div><div className="contact-channel-grid">
        <article className="contact-channel contact-channel-featured"><span className="contact-channel-badge">Recommended</span><CalendarDays aria-hidden="true" /><h3>Book a Discovery Call</h3><p>The fastest way to get started. Pick a time that suits you, and we&apos;ll take it from there. Free, friendly, and no obligation.</p><a href={calendlyUrl} target="_blank" rel="noreferrer">See available times <span aria-hidden="true">→</span></a></article>
        <article className="contact-channel"><MessageCircle aria-hidden="true" /><h3>Chat on WhatsApp</h3><p>Have a quick question? Send us a message. We usually reply within a few hours during business hours.</p><a href={whatsappUrl} target="_blank" rel="noreferrer">Start a chat <span aria-hidden="true">→</span></a></article>
        <article className="contact-channel"><Mail aria-hidden="true" /><h3>Send an Email</h3><p>Prefer to write? Send us as much or as little detail as you like. We&apos;ll reply within 24 hours.</p><a href={`mailto:${emailAddress}?subject=Project%20Inquiry`}>{emailAddress} <span aria-hidden="true">→</span></a></article>
        <article className="contact-channel"><Phone aria-hidden="true" /><h3>Give Us a Call</h3><p>Prefer to talk? Call us directly. We&apos;re available Monday to Friday, 9am to 5pm EAT.</p><a href={`tel:${phoneLink}`}>{phoneDisplay} <span aria-hidden="true">→</span></a></article>
      </div></section>
      <section className="contact-form-section site-container">
        <div className="contact-form-intro"><p className="eyebrow">Prefer to write?</p><h2>Or tell us about<br /><em>your project.</em></h2><p>The more you share, the better we can help. There are no wrong answers.</p></div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="contact-form-row"><div className="contact-field"><label htmlFor="name">Your name</label><input type="text" id="name" name="name" autoComplete="name" required placeholder="e.g., Wanjiku Kamau" /></div><div className="contact-field"><label htmlFor="email">Email address</label><input type="email" id="email" name="email" autoComplete="email" required placeholder="e.g., wanjiku@yourbusiness.co.ke" /></div></div>
          <div className="contact-form-row"><div className="contact-field"><label htmlFor="whatsapp">Phone / WhatsApp number</label><input type="tel" id="whatsapp" name="whatsapp" autoComplete="tel" maxLength={40} required placeholder="e.g., +254 712 345 678" /><small>We&apos;ll only use this to follow up on your enquiry.</small></div><div className="contact-field"><label htmlFor="business">Business name <span>(optional)</span></label><input type="text" id="business" name="business" autoComplete="organization" maxLength={160} placeholder="e.g., Wanjiku&apos;s Kitchen" /></div></div>
          <fieldset className="contact-field contact-checkbox-field"><legend>What are you interested in?</legend><div className="contact-checkbox-grid">{interestOptions.map(({ value, label }) => <label key={value}><input type="checkbox" name="services" value={value} /> <span>{label}</span></label>)}</div></fieldset>
          <div className="contact-form-row"><div className="contact-field"><label htmlFor="budget">What&apos;s your budget range?</label><select id="budget" name="budget" required defaultValue=""><option value="" disabled>Choose a range</option>{budgetOptions.map((option) => <option key={option}>{option}</option>)}</select><small>This helps us recommend the right solution. There&apos;s no wrong answer.</small></div><div className="contact-field"><label htmlFor="timeline">What&apos;s your timeline?</label><select id="timeline" name="timeline" required defaultValue=""><option value="" disabled>Choose a timeline</option>{timelineOptions.map((option) => <option key={option}>{option}</option>)}</select></div></div>
          <div className="contact-field"><label htmlFor="message">Tell us more about your project <span>(optional)</span></label><textarea id="message" name="message" rows={7} placeholder="What are you trying to achieve? What&apos;s the challenge you&apos;re facing? Don&apos;t worry about perfect grammar - just tell us what&apos;s on your mind." /></div>
          <div className="contact-form-footer"><p>We&apos;ll get back to you within 24 hours. Your information stays private.</p><button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send message'} <span aria-hidden="true">↗</span></button></div>
          {feedback ? <p ref={feedbackRef} className={`contact-status ${feedback.success ? 'is-success' : 'is-error'}`} role={feedback.success ? 'status' : 'alert'} tabIndex={-1}>{feedback.message}</p> : null}
        </form>
      </section>

      <section className="contact-trust section-tint"><div className="site-container"><div className="contact-section-heading"><p className="eyebrow">You&apos;re in good company</p><h2>Thoughtful design for<br /><em>ambitious businesses.</em></h2><p>Trusted by businesses across Kenya, from restaurants and startups to growing brands, events, and established teams.</p></div><div className="contact-trust-list">{['Restaurants', 'Startups', 'Retail', 'Events', 'NGOs', 'Growing brands'].map((label) => <span key={label}>{label}</span>)}</div><Link className="text-link" href="/work">See selected work <span aria-hidden="true">→</span></Link></div></section>
      <section className="contact-faq site-container"><div className="contact-section-heading"><p className="eyebrow">Questions? We&apos;ve got answers.</p><h2>Good work starts<br /><em>with clarity.</em></h2></div><div className="contact-faq-list">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
      <section className="contact-final"><div className="site-container"><p className="eyebrow">Still not sure?</p><h2>Let&apos;s just<br /><em>talk.</em></h2><p>The first call is free, friendly, and completely obligation-free. Worst case, you get some useful advice.</p><div className="contact-hero-actions"><a href={calendlyUrl} className="button button-light" target="_blank" rel="noreferrer">Book a Free Discovery Call <span aria-hidden="true">↗</span></a><a href={whatsappUrl} className="text-link" target="_blank" rel="noreferrer">Or message us on WhatsApp <span aria-hidden="true">→</span></a></div></div></section>
    </main>
  );
}