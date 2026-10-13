'use client';

import { useEffect, useState } from 'react';
import { useField } from '@payloadcms/ui';

type MediaRecord = {
  id: number | string;
  filename?: string | null;
  alt?: string | null;
  url?: string | null;
  thumbnailURL?: string | null;
};

export default function MediaRelationshipField({ path }: { path: string }) {
  const { value, setValue } = useField<number | string | null>({ path });
  const [media, setMedia] = useState<MediaRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/media?depth=0&limit=100&sort=-createdAt')
      .then((response) => response.json())
      .then((data: { docs?: MediaRecord[] }) => {
        if (!cancelled) setMedia(data.docs ?? []);
      })
      .catch(() => {
        if (!cancelled) setMedia([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const selected = media.find((item) => String(item.id) === String(value));
  const imageUrl = selected?.thumbnailURL || selected?.url;

  if (path.includes('gallery')) {
    return (
      <div className="field-type media-relationship-field">
        <label className="field-label" htmlFor={path}>
          Image <span className="required">*</span>
        </label>
        <div style={{ position: 'relative' }}>
          <button
            id={path}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.5rem', textAlign: 'left' }}
          >
            {selected?.thumbnailURL || selected?.url ? (
              <img src={selected.thumbnailURL || selected.url || undefined} alt="" style={{ width: 40, height: 30, objectFit: 'cover' }} />
            ) : null}
            <span>{loading ? 'Loading images...' : selected?.filename || selected?.alt || 'Select an image'}</span>
          </button>
          {isOpen && !loading ? (
            <div role="listbox" aria-label="Gallery images" style={{ position: 'absolute', zIndex: 10, top: '100%', right: 0, left: 0, maxHeight: 240, overflowY: 'auto', border: '1px solid var(--theme-elevation-150)', background: 'var(--theme-bg)', boxShadow: '0 4px 12px rgb(0 0 0 / 12%)' }}>
              {media.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="option"
                  aria-selected={String(item.id) === String(value)}
                  onClick={() => {
                    setValue(item.id);
                    setIsOpen(false);
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.4rem 0.5rem', border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer' }}
                >
                  {item.thumbnailURL || item.url ? <img src={item.thumbnailURL || item.url || undefined} alt="" style={{ width: 40, height: 30, objectFit: 'cover', flexShrink: 0 }} /> : null}
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.filename || item.alt || `Media ${item.id}`}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="field-type media-relationship-field">
      <label className="field-label" htmlFor={path}>
        Hero Image <span className="required">*</span>
      </label>
      <div id={path} role="listbox" aria-label="Media library" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem' }}>
        {loading ? <p>Loading media...</p> : null}
        {!loading && media.length === 0 ? <p>No media found.</p> : null}
        {media.map((item) => {
          const thumbnailUrl = item.thumbnailURL || item.url;
          const isSelected = String(item.id) === String(value);

          return (
            <button key={item.id} type="button" role="option" aria-selected={isSelected} onClick={() => setValue(item.id)} style={{ padding: '0.35rem', textAlign: 'left', border: isSelected ? '2px solid currentColor' : '1px solid var(--theme-elevation-150)', background: 'transparent', cursor: 'pointer' }}>
              {thumbnailUrl ? <img src={thumbnailUrl} alt="" style={{ display: 'block', width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', marginBottom: '0.35rem' }} /> : null}
              <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.filename || item.alt || `Media ${item.id}`}</span>
            </button>
          );
        })}
      </div>
      {selected && imageUrl ? (
        <div style={{ marginTop: '1rem', maxWidth: 360 }}>
          <img src={imageUrl} alt={selected.alt || selected.filename || 'Selected hero image'} style={{ display: 'block', width: '100%', height: 'auto', maxHeight: 240, objectFit: 'contain' }} />
          <p style={{ margin: '0.5rem 0 0' }}>{selected.filename || selected.alt}</p>
        </div>
      ) : null}
    </div>
  );
}