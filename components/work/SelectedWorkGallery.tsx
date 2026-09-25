'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type Project = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  category?: string;
  heroImage?: string | { url?: string; alt?: string };
};

const tabs = [
  { value: 'all', label: 'All work' },
  { value: 'brand-identity', label: 'Logos' },
  { value: 'posters', label: 'Events' },
  { value: 'campaigns', label: 'Campaigns' },
] as const;

const categoryLabels: Record<string, string> = {
  'brand-identity': 'Brand identity / Logo',
  posters: 'Event poster',
  campaigns: 'Campaign design',
};

export default function SelectedWorkGallery({ projects }: { projects: Project[] }) {
  const [activeTab, setActiveTab] = useState('all');
  const visibleProjects = activeTab === 'all'
    ? projects
    : projects.filter((project) => project.category === activeTab);

  return (
    <>
      <div className="work-tabs" role="tablist" aria-label="Filter selected work">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.value}
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
              <Link href={project.category ? `/work?category=${project.category}` : '/work'} key={project.id} className="project-card">
                <div className="project-image">
                  {image?.url ? <Image src={image.url} alt={image.alt || project.title} fill className="object-cover" /> : <div className="project-placeholder">N</div>}
                  <span className="project-overlay">
                    <span className="project-overlay-type">{categoryLabels[project.category || ''] || 'Business card'}</span>
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
