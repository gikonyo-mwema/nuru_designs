'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toProjectSlug } from '@/lib/project-slugs';

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category?: string;
  client?: string;
  year?: number;
  tags?: string[];
  heroImage: string | { url?: string; alt?: string; width?: number | null; height?: number | null; focalX?: number | null; focalY?: number | null };
};

type Category = readonly [string, string];

export default function WorkArchive({
  projects,
  categories,
  initialCategory,
}: {
  projects: Project[];
  categories: readonly Category[];
  initialCategory: string;
}) {
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const tags = [...new Set(projects.flatMap((project) => project.tags ?? []))].sort((a, b) => a.localeCompare(b));
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visibleProjects = projects.filter((project) => {
    const matchesCategory = category === 'all' || project.category === category;
    const matchesTag = !selectedTag || project.tags?.includes(selectedTag);
    const searchableText = [project.title, project.description, project.client, ...(project.tags ?? [])]
      .filter(Boolean)
      .join(' ')
      .toLocaleLowerCase();
    return matchesCategory && matchesTag && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });

  function updateCategory(nextCategory: string) {
    setCategory(nextCategory);
    const url = new URL(window.location.href);
    if (nextCategory === 'all') url.searchParams.delete('category');
    else url.searchParams.set('category', nextCategory);
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }

  return (
    <>
      {projects.length > 0 ? (
        <>
          <section className="work-archive-controls site-container" aria-label="Search and filter projects">
            <label className="work-search">
              <span>Search work</span>
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Project, client, or keyword" />
            </label>
            <div className="work-filters" role="group" aria-label="Filter work by category">
              {categories.map(([value, label]) => (
                <button type="button" className={category === value ? 'is-active' : ''} aria-pressed={category === value} onClick={() => updateCategory(value)} key={value}>{label}</button>
              ))}
            </div>
            {tags.length > 0 ? (
              <div className="work-tag-filters" role="group" aria-label="Filter work by tag">
                <span>Tags</span>
                <button type="button" className={!selectedTag ? 'is-active' : ''} aria-pressed={!selectedTag} onClick={() => setSelectedTag('')}>All tags</button>
                {tags.map((tag) => <button type="button" className={selectedTag === tag ? 'is-active' : ''} aria-pressed={selectedTag === tag} onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)} key={tag}>{tag}</button>)}
              </div>
            ) : null}
          </section>
          <p className="work-results site-container" role="status">{visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'}</p>
        </>
      ) : null}
      {projects.length === 0 ? (
        <div className="work-empty site-container">
          <p>Our portfolio is taking shape.</p>
          <p>Need branding, social media, campaign, or print design? Let&apos;s talk about your project.</p>
          <Link href="/contact" className="text-link">Discuss a project <span aria-hidden="true">↗</span></Link>
        </div>
      ) : visibleProjects.length === 0 ? (
        <div className="work-empty site-container"><p>No projects match those filters.</p><button type="button" className="text-link" onClick={() => { setQuery(''); setSelectedTag(''); updateCategory('all'); }}>Clear filters</button></div>
      ) : (
        <div className="work-grid site-container">
          {visibleProjects.map((project) => {
            const image = typeof project.heroImage === 'object' ? project.heroImage : null;
            const imageRatio = image?.width && image.height ? image.width / image.height : 1;
            const imageOrientation = imageRatio >= 1.35 ? 'landscape' : imageRatio <= 0.8 ? 'portrait' : 'square';
            return (
              <Link key={project.id} href={`/work/${toProjectSlug(project.slug)}`} className={`work-card work-card-${imageOrientation}`}>
                <div className="work-card-image" style={imageRatio !== 1 ? { aspectRatio: `${image?.width || 1} / ${image?.height || 1}` } : undefined}>
                  {image?.url ? <Image src={image.url} alt={image.alt || project.title} fill className="object-contain" style={{ objectPosition: image.focalX != null && image.focalY != null ? `${image.focalX}% ${image.focalY}%` : undefined }} /> : <span aria-hidden="true">N</span>}
                </div>
                <div className="work-card-meta"><h2>{project.title}</h2><span>{project.category ? categories.find(([value]) => value === project.category)?.[1] : 'Design project'}</span></div>
                <p>{project.client || project.description}</p>
                {project.year ? <small>{project.year}</small> : null}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
