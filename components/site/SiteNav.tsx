'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: "Let's talk", href: '/contact', className: 'nav-contact' },
];

export default function SiteNav() {
  const pathname = usePathname();
  // Keyed by pathname so the menu closes itself on navigation.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const isMenuOpen = openPath === pathname;

  return (
    <nav
      className={`site-nav${pathname === '/' ? ' site-nav-over-hero' : ''}${isMenuOpen ? ' is-menu-open' : ''}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setOpenPath(null);
      }}
    >
      <div className="site-container nav-inner">
        <Link href="/" className="brand-mark" aria-label="Nuru Designs home">
          <span className="brand-mark-copy"><strong>Nuru</strong><span>Designs</span></span>
        </Link>
        <ul className="nav-links" id="site-nav-links">
          {links.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            const className = [link.className, isActive ? 'is-active' : ''].filter(Boolean).join(' ');

            return (
              <li key={link.href}>
                <Link href={link.href} className={className || undefined} aria-current={isActive ? 'page' : undefined}>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <a href="tel:+254180693218" className="nav-phone" aria-label="Call Nuru Designs at +254 180 693 218" title="Call Nuru Designs">
          <Phone className="nav-phone-icon" size={24} strokeWidth={1.7} fill="currentColor" aria-hidden="true" />
          <span className="nav-phone-label">Call us</span>
          <span className="nav-phone-number">+254 180 693 218</span>
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="site-nav-links"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setOpenPath(isMenuOpen ? null : pathname)}
        >
          {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>
    </nav>
  );
}
