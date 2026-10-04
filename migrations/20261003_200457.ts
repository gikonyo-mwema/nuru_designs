import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_content" ADD COLUMN "home_hero_background_id" integer;
  ALTER TABLE "site_content" ADD CONSTRAINT "site_content_home_hero_background_id_media_id_fk" FOREIGN KEY ("home_hero_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_content_home_hero_background_idx" ON "site_content" USING btree ("home_hero_background_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_content" DROP CONSTRAINT "site_content_home_hero_background_id_media_id_fk";
  
  DROP INDEX "site_content_home_hero_background_idx";
  ALTER TABLE "site_content" DROP COLUMN "home_hero_background_id";`)
}
