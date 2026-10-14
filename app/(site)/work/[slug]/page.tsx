import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { cache } from 'react';

import { getPayloadClient } from '@/lib/payload-client';
import { toProjectSlug } from '@/lib/project-slugs';
import { siteUrl } from '@/lib/site-url';

type Media = {
  url?: string;
  alt?: string;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
};

type Project = {
  title: string;
  description: string;
  content: Parameters<typeof RichText>[0]['data'];
  heroImage: string | Media;
  gallery?: { image: string | Media; caption?: string }[];
  services?: { service: string }[];
  client?: string;
  year?: number;
};

const getProject = cache(async (slug: string): Promise<Project | null> => {
  const payload = await getPayloadClient();
  if (!payload) return null;

  const result = await payload.find({
    collection: 'projects',
    where: { status: { equals: 'published' } },
    limit: 100,
  });

  const project = result.docs.find((doc) => {
    const projectSlug = typeof doc.slug === 'string' ? doc.slug : '';
    return projectSlug === slug || toProjectSlug(projectSlug) === toProjectSlug(slug);
  });

  return (project as unknown as Project | undefined) ?? null;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: 'Project not found | Nuru Designs',
      robots: { index: false, follow: false },
    };
  }

  const heroImage = typeof project.heroImage === 'object' ? project.heroImage : null;
  const url = new URL(`/work/${slug}`, siteUrl).toString();

  return {
    title: `${project.title} | Nuru Designs`,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: project.title,
      description: project.description,
      url,
      images: heroImage?.url ? [{ url: heroImage.url, alt: heroImage.alt || project.title }] : undefined,
    },
    twitter: {
      card: heroImage?.url ? 'summary_large_image' : 'summary',
      title: project.title,
      description: project.description,
      images: heroImage?.url ? [heroImage.url] : undefined,
    },
  };
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

  return (
    <article className="project-detail site-container">
      <Link href="/work" className="project-detail-back">Back to work</Link>
      <header className="project-detail-header">
        <h1>{project.title}</h1>
        <p className="project-detail-description">{project.description}</p>
        <div className="project-detail-meta">
          {project.client ? <span>Client: {project.client}</span> : null}
          {project.year ? <span>{project.year}</span> : null}
          {project.services?.map(({ service }) => <span key={service}>{service}</span>)}
        </div>
      </header>

      {heroImage?.url ? (
        <div className="project-detail-hero" style={heroImage.width && heroImage.height ? { aspectRatio: `${heroImage.width} / ${heroImage.height}` } : undefined}>
          <Image
            src={heroImage.url}
            alt={heroImage.alt || project.title}
            fill
            className="object-contain"
            style={{ objectPosition: heroImage.focalX != null && heroImage.focalY != null ? `${heroImage.focalX}% ${heroImage.focalY}%` : undefined }}
            priority
          />
        </div>
      ) : null}

      <RichText data={project.content} className="project-detail-content" />

      {project.gallery?.length ? (
        <div className="project-detail-gallery">
          {project.gallery.map(({ image, caption }, index) => {
            const media = typeof image === 'object' ? image : null;
            return media?.url ? (
              <figure key={`${media.url}-${index}`}>
                <div className="project-detail-gallery-image" style={media.width && media.height ? { aspectRatio: `${media.width} / ${media.height}` } : undefined}>
                  <Image
                    src={media.url}
                    alt={media.alt || caption || project.title}
                    fill
                    className="object-contain"
                    style={{ objectPosition: media.focalX != null && media.focalY != null ? `${media.focalX}% ${media.focalY}%` : undefined }}
                  />
                </div>
                {caption ? <figcaption>{caption}</figcaption> : null}
              </figure>
            ) : null;
          })}
        </div>
      ) : null}
    </article>
  );
}