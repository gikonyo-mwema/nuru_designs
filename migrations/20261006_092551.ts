import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contact_submissions" ADD COLUMN "business" varchar;
  ALTER TABLE "contact_submissions" ADD COLUMN "whatsapp" varchar;
  ALTER TABLE "contact_submissions" ADD COLUMN "service" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contact_submissions" DROP COLUMN "business";
  ALTER TABLE "contact_submissions" DROP COLUMN "whatsapp";
  ALTER TABLE "contact_submissions" DROP COLUMN "service";`)
}
