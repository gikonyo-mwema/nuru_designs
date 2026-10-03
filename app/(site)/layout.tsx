import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
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
            </div>
            <div className="footer-column">
              <h2>Quick links</h2>
              <ul className="footer-links"><li><Link href="/">Home</Link></li><li><Link href="/services">Services</Link></li><li><Link href="/work">Work</Link></li><li><Link href="/about">About us</Link></li><li><Link href="/contact">Contact</Link></li></ul>
            </div>
            <div className="footer-column">
              <h2>Contact info</h2>
              <p>Have a question or a project in mind?</p>
              <a className="footer-phone" href={`tel:${content.contactPhoneLink}`}>{content.contactPhoneDisplay}</a>
              <a className="footer-email" href={`mailto:${content.contactEmail}`}>{content.contactEmail}</a>
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