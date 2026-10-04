'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function WhatsAppFloat() {
  const [isSuppressed, setIsSuppressed] = useState(false);

  useEffect(() => {
    const observedSections = document.querySelectorAll('.contact-form-section, .site-footer, .trust-strip, .founder-section, .services-section');
    if (!observedSections.length) return;

    const visibleSections = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleSections.add(entry.target);
        else visibleSections.delete(entry.target);
      }
      setIsSuppressed(visibleSections.size > 0);
    });
    observedSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  if (isSuppressed) return null;

  return (
    <a
      className="whatsapp-float"
      href="https://wa.me/254180693218"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="whatsapp-mark" aria-hidden="true" />
      <span>Chat with us</span>
    </a>
  );
}