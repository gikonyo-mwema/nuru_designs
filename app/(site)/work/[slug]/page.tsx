import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';

import config from '@payload-config';

type Media = {
  url?: string;
  alt?: string;
};

type RichTextNode = {
  type?: string;
  text?: string;
  children?: RichTextNode[];
  format?: number | string;
};

type Project = {
  title: string;
  description: string;
  content: { root?: RichTextNode };
  heroImage: string | Media;
  gallery?: { image: string | Media; caption?: string }[];
  services?: { service: string }[];
  client?: string;
  year?: number;
};

async function getProject(slug: string): Promise<Project | null> {
  if (!process.env.DATABASE_URI) {
    return null;
  }

  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  });

  return (result.docs[0] as unknown as Project | undefined) ?? null;
}

function renderRichText(node: RichTextNode): React.ReactNode {
  if (node.text) {
    return node.text;
  }

  const children = node.children?.map((child, index) => (
    <span key={index}>{renderRichText(child)}</span>
  ));

  switch (node.type) {
    case 'heading':
      return <h2 className="mt-10 mb-4 text-2xl font-bold">{children}</h2>;
    case 'ul':
      return <ul className="my-4 list-disc space-y-2 pl-6">{children}</ul>;
    case 'ol':
      return <ol className="my-4 list-decimal space-y-2 pl-6">{children}</ol>;
    case 'listitem':
      return <li>{children}</li>;
    case 'linebreak':
      return <br />;
    case 'paragraph':
      return <p className="my-4 leading-7 text-muted">{children}</p>;
    default:
      return children;
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const heroImage = typeof project.heroImage === 'object' ? project.heroImage : null;
  const content = project.content?.root?.children ?? [];

  return (
    <article className="container mx-auto px-4 py-16">
      <Link href="/work" className="text-sm text-muted hover:text-(--ink)">
        Back to work
      </Link>
      <header className="mt-8 max-w-3xl">
        <h1 className="text-5xl font-bold">{project.title}</h1>
        <p className="mt-6 text-xl leading-8 text-muted">{project.description}</p>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
          {project.client ? <span>Client: {project.client}</span> : null}
          {project.year ? <span>{project.year}</span> : null}
          {project.services?.map(({ service }) => <span key={service}>{service}</span>)}
        </div>
      </header>

      {heroImage?.url ? (
        <div className="relative mt-12 aspect-video overflow-hidden bg-(--paper)">
          <Image src={heroImage.url} alt={heroImage.alt || project.title} fill className="object-cover" priority />
        </div>
      ) : null}

      <div className="mx-auto mt-12 max-w-3xl">{content.map((node, index) => <div key={index}>{renderRichText(node)}</div>)}</div>

      {project.gallery?.length ? (
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {project.gallery.map(({ image, caption }, index) => {
            const media = typeof image === 'object' ? image : null;
            return media?.url ? (
              <figure key={`${media.url}-${index}`}>
                <div className="relative aspect-4/3 overflow-hidden bg-(--paper)">
                  <Image src={media.url} alt={media.alt || caption || project.title} fill className="object-cover" />
                </div>
                {caption ? <figcaption className="mt-2 text-sm text-muted">{caption}</figcaption> : null}
              </figure>
            ) : null;
          })}
        </div>
      ) : null}
    </article>
  );
}