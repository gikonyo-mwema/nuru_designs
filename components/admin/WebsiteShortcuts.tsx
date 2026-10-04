import Link from 'next/link';
import {
  BriefcaseBusiness,
  FileQuestion,
  Globe2,
  Image as ImageIcon,
  Inbox,
  Palette,
  UserRound,
  UsersRound,
} from 'lucide-react';
import styles from './WebsiteShortcuts.module.css';

export default function WebsiteShortcuts() {
  return (
    <aside className={styles.panel} aria-label="Dashboard shortcuts">
      <p className={styles.eyebrow}>Studio desk</p>
      <nav className={styles.nav}>
        <p className={styles.groupLabel}>Website</p>
        <Link className={styles.link} href="/admin/globals/site-content"><Globe2 aria-hidden="true" /><span>Site content</span></Link>
        <Link className={styles.link} href="/admin/collections/services"><Palette aria-hidden="true" /><span>Services</span></Link>
        <Link className={styles.link} href="/admin/collections/faqs"><FileQuestion aria-hidden="true" /><span>FAQs</span></Link>

        <p className={styles.groupLabel}>Portfolio</p>
        <Link className={styles.link} href="/admin/collections/projects"><BriefcaseBusiness aria-hidden="true" /><span>Projects</span></Link>
        <Link className={styles.link} href="/admin/collections/media"><ImageIcon aria-hidden="true" /><span>Media library</span></Link>

        <p className={styles.groupLabel}>Teams</p>
        <Link className={styles.link} href="/admin/collections/teams"><UserRound aria-hidden="true" /><span>Founder &amp; team</span></Link>

        <p className={styles.groupLabel}>Studio</p>
        <Link className={styles.link} href="/admin/collections/contact-submissions"><Inbox aria-hidden="true" /><span>Enquiries</span></Link>
        <Link className={styles.link} href="/admin/collections/users"><UsersRound aria-hidden="true" /><span>Team accounts</span></Link>
      </nav>
    </aside>
  );
}