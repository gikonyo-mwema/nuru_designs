export default function Loading() {
  return (
    <main className="site-container site-state-page" aria-busy="true" aria-live="polite">
      <p className="eyebrow">Loading</p>
      <p className="text-muted">Preparing the next page...</p>
    </main>
  );
}
