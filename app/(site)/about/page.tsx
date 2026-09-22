export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">About Nuru Designs</h1>
      <div className="max-w-3xl">
        <p className="text-lg text-muted mb-6">We are a team of passionate designers creating beautiful, functional design solutions for modern brands.</p>
        <p className="text-lg text-muted mb-6">With years of experience in branding, web design, and UI/UX, we help businesses stand out in a crowded marketplace.</p>
        <h2 className="text-2xl font-bold mt-12 mb-4">Our Values</h2>
        <ul className="list-disc list-inside space-y-2 text-muted">
          <li>Creativity and innovation</li>
          <li>Client satisfaction</li>
          <li>Quality over quantity</li>
          <li>Continuous learning</li>
        </ul>
      </div>
    </div>
  );
}