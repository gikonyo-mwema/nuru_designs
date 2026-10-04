'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function SiteError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Public site rendering error');
  }, []);

  return (
    <main className="site-container site-state-page">
      <p className="eyebrow">Something went wrong</p>
      <h1>This page could not load.</h1>
      <p className="text-muted">Please try again, or return to the home page.</p>
      <div className="site-state-actions">
        <button type="button" className="button button-dark" onClick={reset}>Try again <span aria-hidden="true">↻</span></button>
        <Link href="/" className="text-link">Back to home <span aria-hidden="true">↗</span></Link>
      </div>
    </main>
  );
}
