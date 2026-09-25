import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUp, Send } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Nuru Designs — Independent Design Studio',
  description: 'Bold brand identities and digital experiences for businesses ready to be remembered.',
};

function BrandIcon({ name }: { name: string }) {
  if (name === 'Instagram') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  }

  if (name === 'Facebook') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 21v-8h2.7l.4-3H14V8.1c0-.9.3-1.6 1.7-1.6h1.6V3.8c-.3 0-1.4-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H8v3h2.6v8H14Z" fill="currentColor" /></svg>;
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h3.3v16H5V4Zm1.6-2A2 2 0 1 1 6.6 6 2 2 0 1 1 6.6 2ZM10.8 9h3.1v1.5h.1c.4-.8 1.5-1.8 3.3-1.8 3.5 0 4.1 2.2 4.1 5.1V20h-3.3v-5.5c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V20h-3.3V9Z" fill="currentColor" /></svg>;
}

const socialLinks = [
  { label: 'Facebook', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
];

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <SiteNav />

        {children}

        <a className="whatsapp-float" href="https://wa.me/254180693218" target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp" title="Chat with us on WhatsApp"><svg className="whatsapp-mark" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.004 2a9.9 9.9 0 0 0-8.49 15.01L2 22l5.15-1.49A9.9 9.9 0 1 0 12.004 2m0 18.19a8.27 8.27 0 0 1-4.22-1.16l-.3-.18-3.06.89.92-2.98-.2-.31A8.27 8.27 0 1 1 12.004 20.19" /></svg><span>Chat with us</span></a>

        <footer className="site-footer">
          <div className="site-container footer-main">
            <div className="footer-column footer-brand-column">
              <Link href="/" className="brand-mark footer-brand">Nuru<span>Designs</span></Link>
              <p>Follow Nuru Designs for ideas, process, and work that moves people.</p>
              <div className="footer-socials" aria-label="Social media links">
                {socialLinks.map(({ label, href }) => (
                  <a href={href} key={label} target="_blank" rel="noreferrer" aria-label={label} title={label}><BrandIcon name={label} /></a>
                ))}
              </div>
            </div>
            <div className="footer-column">
              <h2>Quick links</h2>
              <ul className="footer-links"><li><Link href="/">Home</Link></li><li><Link href="/services">Services</Link></li><li><Link href="/work">Work</Link></li><li><Link href="/about">About us</Link></li><li><Link href="/contact">Contact</Link></li></ul>
            </div>
            <div className="footer-column">
              <h2>Contact info</h2>
              <p>Have a question or a project in mind?</p>
              <a className="footer-phone" href="tel:+254180693218">+254 180 693 218</a>
              <a className="footer-email" href="mailto:nurudesignske@gmail.com">nurudesignske@gmail.com</a>
            </div>
            <div className="footer-column footer-subscribe">
              <h2>Subscribe to our newsletter</h2>
              <p>Get occasional notes, new work, and useful ideas from our studio.</p>
              <form className="subscribe-form" action="#" method="post"><label className="sr-only" htmlFor="footer-email">Your email address</label><input id="footer-email" name="email" type="email" placeholder="Your email address" required /><button type="submit" aria-label="Subscribe"><Send size={17} strokeWidth={1.8} /></button></form>
            </div>
          </div>
          <div className="site-container footer-bottom">
            <span>© 2026 Nuru Designs. All rights reserved.</span>
            <div className="footer-legal"><Link href="/privacy-policy">Privacy policy</Link><Link href="/legal-notice">Legal notice</Link><Link href="/terms-of-service">Terms of service</Link><a className="back-to-top" href="#top" aria-label="Back to top" title="Back to top"><ArrowUp size={16} strokeWidth={1.8} /></a></div>
          </div>
        </footer>
      </body>
    </html>
  );
}