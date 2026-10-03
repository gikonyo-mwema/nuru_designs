'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { projectCategories, type ProjectCategory } from '@/lib/project-categories';

type Project = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  category?: string;
  heroImage?: string | { url?: string; alt?: string; focalX?: number | null; focalY?: number | null };
};

const featuredCategories: readonly ProjectCategory[] = ['brand-identity', 'posters', 'campaigns'];
const tabs = [
  { value: 'all', label: 'All work' },
  ...projectCategories
    .filter(([value]) => featuredCategories.includes(value))
    .map(([value, label]) => ({ value, label })),
];
const categoryLabels = Object.fromEntries(projectCategories);

export default function SelectedWorkGallery({ projects }: { projects: Project[] }) {
  const [activeTab, setActiveTab] = useState('all');
  const visibleProjects = activeTab === 'all'
    ? projects
    : projects.filter((project) => project.category === activeTab);

  return (
    <>
      <div className="work-tabs" role="group" aria-label="Filter selected work">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            aria-pressed={activeTab === tab.value}
            className={activeTab === tab.value ? 'is-active' : ''}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {visibleProjects.length > 0 ? (
        <div className="project-grid">
          {visibleProjects.map((project) => {
            const image = typeof project.heroImage === 'object' ? project.heroImage : null;

            return (
              <Link href={`/work/${project.slug}`} key={project.id} className="project-card" aria-label={`View ${project.title}`}>
                <div className="project-image">
                  {image?.url ? <Image src={image.url} alt={image.alt || project.title} fill className="object-cover" style={{ objectPosition: image.focalX != null && image.focalY != null ? `${image.focalX}% ${image.focalY}%` : undefined }} /> : <div className="project-placeholder">N</div>}
                  <span className="project-overlay">
                    <span className="project-overlay-type">{categoryLabels[project.category || ''] || 'Design project'}</span>
                    <span className="project-overlay-link">View more <span aria-hidden="true">↗</span></span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="work-placeholder"><span>No work in this category yet.</span><Link href="/work" className="text-link">View all work <span aria-hidden="true">↗</span></Link></div>
      )}
    </>
  );
}
