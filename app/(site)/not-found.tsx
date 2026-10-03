import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="site-container site-state-page">
      <p className="eyebrow">404 / Page not found</p>
      <h1>That page isn&apos;t here.</h1>
      <p className="text-muted">The link may be outdated, or the page may have moved.</p>
      <Link href="/" className="button button-dark">Back to home <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
