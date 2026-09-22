import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
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

  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h3.3v16H5V4Zm1.6-2A2 2 0 1 1 6.6 6 2 2 0 0 1 6.6 2ZM10.8 9h3.1v1.5h.1c.4-.8 1.5-1.8 3.3-1.8 3.5 0 4.1 2.2 4.1 5.1V20h-3.3v-5.5c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V20h-3.3V9Z" fill="currentColor" /></svg>;
}

const socialLinks = [
  { label: 'Instagram', href: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
  { label: 'Facebook', href: process.env.NEXT_PUBLIC_FACEBOOK_URL },
  { label: 'LinkedIn', href: process.env.NEXT_PUBLIC_LINKEDIN_URL },
  { label: 'WhatsApp', href: process.env.NEXT_PUBLIC_WHATSAPP_URL },
];

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <nav className="site-nav">
          <div className="site-container nav-inner">
            <Link href="/" className="brand-mark">Nuru<span>Designs</span></Link>
            <ul className="nav-links">
              <li><Link href="/work">Work</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact" className="nav-contact">Let&apos;s talk <span aria-hidden="true">↗</span></Link></li>
            </ul>
          </div>
        </nav>

        {children}

        <footer className="site-footer">
          <div className="site-container footer-inner">
            <p>© 2024 Nuru Designs</p>
            <div className="footer-socials" aria-label="Social media links">
              {socialLinks.filter(({ href }) => href).map(({ label, href }) => (
                <a href={href} key={label} target="_blank" rel="noreferrer" aria-label={label} title={label}>
                  {label === 'WhatsApp' ? <MessageCircle size={17} strokeWidth={1.7} aria-hidden="true" /> : <BrandIcon name={label} />}
                </a>
              ))}
            </div>
            <p>Made with intent.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}