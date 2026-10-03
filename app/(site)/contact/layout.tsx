import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Nuru Designs',
  description: 'Start a project or contact Nuru Designs directly by phone or email.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}