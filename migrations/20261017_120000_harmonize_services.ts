import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const canonicalServices = [
  ['social-media-posts-banners', 'Social Media Posts & Banners', '01'],
  ['event-posters-flyers', 'Event Posters & Flyers', '02'],
  ['menus-cards-stationery', 'Menus, Cards & Stationery', '03'],
  ['logo-brand-identity', 'Logo & Brand Identity', '04'],
  ['product-labels-packaging', 'Product Labels & Packaging', '05'],
  ['company-profiles', 'Company Profiles', '06'],
] as const

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "services"
    SET "slug" = CASE "slug"
      WHEN 'social-media' THEN 'social-media-posts-banners'
      WHEN 'social-media-graphics' THEN 'social-media-posts-banners'
      WHEN 'flyers-posters' THEN 'event-posters-flyers'
      WHEN 'marketing-design' THEN 'event-posters-flyers'
      WHEN 'print-design' THEN 'menus-cards-stationery'
      WHEN 'branding' THEN 'logo-brand-identity'
      WHEN 'brand-identity-and-logo-design' THEN 'logo-brand-identity'
      ELSE "slug"
    END,
    "title" = CASE "slug"
      WHEN 'social-media' THEN 'Social Media Posts & Banners'
      WHEN 'social-media-graphics' THEN 'Social Media Posts & Banners'
      WHEN 'flyers-posters' THEN 'Event Posters & Flyers'
      WHEN 'marketing-design' THEN 'Event Posters & Flyers'
      WHEN 'print-design' THEN 'Menus, Cards & Stationery'
      WHEN 'branding' THEN 'Logo & Brand Identity'
      WHEN 'brand-identity-and-logo-design' THEN 'Logo & Brand Identity'
      ELSE "title"
    END;
  `)

  for (const [slug, title, number] of canonicalServices) {
    await db.execute(sql`
      INSERT INTO "services" ("title", "slug", "number", "short_description", "outcome", "sort_order", "status", "updated_at", "created_at")
      SELECT ${title}, ${slug}, ${number}, ${title}, ${title}, ${Number(number)}, 'published', now(), now()
      WHERE NOT EXISTS (SELECT 1 FROM "services" WHERE "slug" = ${slug});
    `)
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DELETE FROM "services"
    WHERE "slug" IN ('social-media-posts-banners', 'event-posters-flyers', 'menus-cards-stationery', 'logo-brand-identity', 'product-labels-packaging', 'company-profiles');
  `)
}