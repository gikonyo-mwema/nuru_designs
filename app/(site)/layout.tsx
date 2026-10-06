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
              <h2>Services</h2>
              <ul className="footer-links">
                <li><Link href="/services/brand-identity-and-logo-design">Branding</Link></li>
                <li><Link href="/services/social-media-graphics">Social Media</Link></li>
                <li><Link href="/services/print-design">Flyers &amp; Posters</Link></li>
                <li><Link href="/services/print-design">Print Design</Link></li>
                <li><Link href="/services/print-design">Packaging</Link></li>
                <li><Link href="/services/print-design">Company Profiles</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h2>Work</h2>
              <ul className="footer-links">
                <li><Link href="/work?category=brand-identity">Branding</Link></li>
                <li><Link href="/work?category=social-media">Social Media</Link></li>
                <li><Link href="/work">Print</Link></li>
                <li><Link href="/work?category=campaigns">Campaigns</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h2>Contact</h2>
              <ul className="footer-links">
                <li><a href="https://wa.me/254180693218" target="_blank" rel="noreferrer">WhatsApp</a></li>
                <li><a href={`mailto:${content.contactEmail}`}>Email</a></li>
                <li><a href={`tel:${content.contactPhoneLink}`}>Phone</a></li>
                <li><span>Nairobi, Kenya</span></li>
              </ul>
            </div>
            <div className="footer-column">
              <h2>Social</h2>
              <ul className="footer-links">
                <li><span>Instagram</span></li>
                <li><span>Facebook</span></li>
                <li><span>TikTok</span></li>
                <li><span>LinkedIn</span></li>
              </ul>
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