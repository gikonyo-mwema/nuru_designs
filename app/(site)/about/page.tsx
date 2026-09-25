import Link from 'next/link';

const beliefs = [
  ['Clarity beats cleverness.', 'If it does not communicate, it does not matter. We design for understanding first.'],
  ['Character is the difference.', 'Anyone can make something look nice. We make it look like you, so people remember who you are.'],
  ['Craft is non-negotiable.', 'Every pixel, every print, every post. Detail is how good work becomes trusted work.'],
  ['Partnership over pitch.', 'We are here to solve your problem, and we act like it.'],
];

const process = [
  ['01', 'Discover', 'We find the sharpest truth in your business.'],
  ['02', 'Define', 'We shape the strategy and visual direction.'],
  ['03', 'Deliver', 'We build a system made to move with you.'],
];

const services = [
  ['Brand identity', 'Distinctive identity systems that turn a good business into a memorable brand.'],
  ['Digital design', 'Websites, UI/UX, and digital experiences built to convert.'],
  ['Campaigns', 'Campaign visuals that turn your message into momentum.'],
  ['Print design', 'Print pieces with enough presence to earn attention away from the screen.'],
  ['Social media graphics', 'Scroll-stopping graphics that make every post feel unmistakably yours.'],
  ['Strategy-led design', 'Every decision rooted in your business goals.'],
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero site-container">
        <p className="eyebrow">About Nuru Designs</p>
        <h1>We make brands<br /><em>impossible to overlook.</em></h1>
        <p className="about-lead">Nuru Designs is an independent design studio based in Kenya. We build bold identities, digital experiences, and campaign visuals for businesses ready to be remembered, not just seen.</p>
        <div className="about-actions"><Link href="/contact" className="button button-dark">Start a project <span aria-hidden="true">↗</span></Link><Link href="/contact?call=free-20-min" className="text-link">Book a free 20-min call <span aria-hidden="true">↗</span></Link></div>
        <p className="about-proof">Since 2021, we&apos;ve partnered with <strong>30+ brands</strong> across Kenya, from first-time founders to established names, turning good ideas into clear, confident, and alive brands.</p>
      </section>

      <section className="about-section about-why">
        <div className="site-container about-narrow"><p className="eyebrow">Why we exist</p><h2>Too many good businesses look like everyone else.</h2><p>Great work gets overlooked because the brand around it does not carry the same weight. We started Nuru Designs to help ambitious people turn good ideas into brands that feel clear, confident, and unmistakably theirs.</p><p>The name <em>Nuru</em> means light. That&apos;s the work: helping your business shine in a crowded marketplace.</p></div>
      </section>

      <section className="about-section site-container about-beliefs"><div className="about-section-heading"><p className="eyebrow">What we believe</p><h2>Good design has a point of view.</h2></div><div className="about-beliefs-grid">{beliefs.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

      <section className="about-section about-process"><div className="site-container"><div className="about-section-heading"><p className="eyebrow">How we work</p><h2>Clear steps. No mystery.</h2></div><div className="about-process-grid">{process.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div><p className="about-reassurance">Not happy with the first concept? We revise until it&apos;s right, with no extra charge.</p></div></section>

      <section className="about-section site-container about-studio"><div className="about-studio-mark" aria-hidden="true">N</div><div className="about-studio-copy"><p className="eyebrow">The studio</p><h2>Design is better when it feels human.</h2><p>Nuru Designs is led by a designer who believes good work should feel clear, confident, and alive.</p><blockquote>&ldquo;I started Nuru Designs to help ambitious people turn good ideas into brands that feel clear, confident, and alive.&rdquo;<cite>— Nuru Designs founder</cite></blockquote><p>We&apos;re a small, senior team, which means you work directly with the people doing the work. No account managers, no handoffs, no dilution.</p></div></section>

      <section className="about-section about-numbers"><div className="site-container"><div className="about-section-heading"><p className="eyebrow">By the numbers</p><h2>A little proof goes a long way.</h2></div><div className="about-numbers-grid"><div><strong>100+</strong><span>Projects delivered</span></div><div><strong>30+</strong><span>Brands served across Kenya</span></div><div><strong>5+</strong><span>Years in practice</span></div><div><strong>4.8★</strong><span>Average client rating</span></div></div></div></section>

      <section className="about-section site-container about-services"><div className="about-section-heading"><p className="eyebrow">What we do</p><h2>Clarity, character, and craft.</h2></div><div className="about-services-grid">{services.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

      <section className="about-final"><div className="site-container"><p className="eyebrow">Ready to make a move?</p><h2>Let&apos;s make it<br /><em>unmistakable.</em></h2><div className="about-actions"><Link href="/contact" className="button button-light">Start a project <span aria-hidden="true">↗</span></Link><Link href="/contact?call=free-20-min" className="button button-outline-light">Book a free 20-min call <span aria-hidden="true">↗</span></Link></div><div className="about-contact"><a href="tel:+254180693218">+254 180 693 218</a><a href="mailto:nurudesignske@gmail.com">nurudesignske@gmail.com</a></div></div></section>
    </main>
  );
}