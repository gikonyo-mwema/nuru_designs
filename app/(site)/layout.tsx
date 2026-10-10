import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUp, Mail, Phone } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import '../globals.css';
import WhatsAppFloat from '@/components/site/WhatsAppFloat';
import { siteUrl } from '@/lib/site-url';
import { getPublicSiteContent } from '@/lib/site-content';

export const metadata: Metadata = {
  title: 'Nuru Designs — Independent Design Studio',
  description: 'Bold brand identities and digital experiences for businesses ready to be remembered.',
  metadataBase: siteUrl,
};

function BrandIcon({ name }: { name: string }) {
  if (name === 'Instagram') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  }

  if (name === 'Facebook') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 21v-8h2.7l.4-3H14V8.1c0-.9.3-1.6 1.7-1.6h1.6V3.8c-.3 0-1.4-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H8v3h2.6v8H14Z" fill="currentColor" /></svg>;
  }

  if (name === 'TikTok') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.3 4c.3 1.8 1.3 3 3.1 3.2v2.7c-1.1-.1-2.1-.4-3.1-1v5.5c0 3-2.1 5.1-5 5.1-2.7 0-4.7-1.8-4.7-4.3 0-2.7 2.2-4.6 5.2-4.6.3 0 .6 0 .9.1v2.7a4 4 0 0 0-.9-.1c-1.3 0-2.4.7-2.4 1.9 0 1 .8 1.7 1.9 1.7 1.3 0 2.2-.9 2.2-2.5V4h2.8Z" fill="currentColor" /></svg>;
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h3.3v16H5V4Zm1.6-2A2 2 0 1 1 6.6 6 2 2 0 0 1 6.6 2ZM10.8 9h3.1v1.5h.1c.4-.8 1.5-1.8 3.3-1.8 3.5 0 4.1 2.2 4.1 5.1V20h-3.3v-5.5c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V20h-3.3V9Z" fill="currentColor" /></svg>;
}

const socialLinks = [
  { label: 'Instagram', href: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
  { label: 'Facebook', href: process.env.NEXT_PUBLIC_FACEBOOK_URL },
  { label: 'LinkedIn', href: process.env.NEXT_PUBLIC_LINKEDIN_URL },
  { label: 'TikTok', href: process.env.NEXT_PUBLIC_TIKTOK_URL },
];

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getPublicSiteContent();
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body id="top">
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteNav />

        <div id="main-content" tabIndex={-1}>{children}</div>

        <WhatsAppFloat />

        <footer className="site-footer">
          <div className="site-container footer-main">
            <div className="footer-column footer-brand-column">
              <Link href="/" className="brand-mark footer-brand">Nuru<span>Designs</span></Link>
              <p>{content.footerStudioDescription}</p>
              <div className="footer-socials" aria-label="Social media links">
                {socialLinks.map(({ label, href }) => (
                  href ? (
                    <a className="footer-social-link" href={href} key={label} target="_blank" rel="noreferrer" aria-label={label}>
                      <span className="footer-social-icon"><BrandIcon name={label} /></span>
                    </a>
                  ) : (
                    <span className="footer-social-link footer-social-link-disabled" key={label} aria-label={label}>
                      <span className="footer-social-icon-disabled"><BrandIcon name={label} /></span>
                    </span>
                  )
                ))}
              </div>
            </div>
            <div className="footer-column">
              <h2>Quick links</h2>
              <ul className="footer-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/work">Work</Link></li>
                <li><Link href="/about">About us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h2>Services</h2>
              <ul className="footer-links">
                <li><Link href="/services/branding">Branding</Link></li>
                <li><Link href="/services/social-media">Social Media</Link></li>
                <li><Link href="/services/flyers-posters">Flyers &amp; Posters</Link></li>
                <li><Link href="/services/print-design">Print Design</Link></li>
                <li><Link href="/services/packaging">Packaging</Link></li>
                <li><Link href="/services/company-profiles">Company Profiles</Link></li>
              </ul>
            </div>
            <div className="footer-column footer-contact-column">
              <h2>Contact</h2>
              <p>Have a question or a project in mind?</p>
              <div className="footer-contact-links">
                <a className="footer-contact-link" href={`tel:${content.contactPhoneLink}`}>
                  <span className="footer-contact-icon"><Phone size={16} strokeWidth={1.8} /></span>
                  <span>{content.contactPhoneDisplay}</span>
                </a>
                <a className="footer-contact-link" href={`mailto:${content.contactEmail}`}>
                  <span className="footer-contact-icon"><Mail size={16} strokeWidth={1.8} /></span>
                  <span>{content.contactEmail}</span>
                </a>
              </div>
            </div>
          </div>
          <div className="site-container footer-bottom">
            <span>© {content.copyrightYear} Nuru Designs. All rights reserved.</span>
            <Link className="footer-admin-link" href="/admin">Studio login</Link>
            <div className="footer-legal"><a className="back-to-top" href="#top" aria-label="Back to top" title="Back to top"><ArrowUp size={16} strokeWidth={1.8} /></a></div>
          </div>
        </footer>
      </body>
    </html>
  );
}