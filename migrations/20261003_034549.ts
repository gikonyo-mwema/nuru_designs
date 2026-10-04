import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_faqs_placement" AS ENUM('home', 'services', 'both');
  CREATE TYPE "public"."enum_faqs_status" AS ENUM('draft', 'published');
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"placement" "enum_faqs_placement" DEFAULT 'both' NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"status" "enum_faqs_status" DEFAULT 'draft' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_content_trust_sectors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "site_content_why_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"paragraph" varchar NOT NULL
  );
  
  CREATE TABLE "site_content_beliefs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "site_content_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "site_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"home_hero_lead" varchar,
  	"home_hero_emphasis" varchar,
  	"home_hero_end" varchar,
  	"home_hero_intro" varchar,
  	"founder_eyebrow" varchar,
  	"founder_heading" varchar,
  	"founder_copy" varchar,
  	"founder_name" varchar,
  	"about_lead" varchar,
  	"why_heading" varchar,
  	"beliefs_heading" varchar,
  	"process_heading" varchar,
  	"studio_heading" varchar,
  	"studio_intro" varchar,
  	"founder_quote" varchar,
  	"founder_attribution" varchar,
  	"team_statement" varchar,
  	"footer_studio_description" varchar,
  	"contact_phone_display" varchar,
  	"contact_phone_link" varchar,
  	"contact_email" varchar,
  	"copyright_year" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faqs_id" integer;
  ALTER TABLE "site_content_trust_sectors" ADD CONSTRAINT "site_content_trust_sectors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_why_paragraphs" ADD CONSTRAINT "site_content_why_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_beliefs" ADD CONSTRAINT "site_content_beliefs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_process_steps" ADD CONSTRAINT "site_content_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "site_content_trust_sectors_order_idx" ON "site_content_trust_sectors" USING btree ("_order");
  CREATE INDEX "site_content_trust_sectors_parent_id_idx" ON "site_content_trust_sectors" USING btree ("_parent_id");
  CREATE INDEX "site_content_why_paragraphs_order_idx" ON "site_content_why_paragraphs" USING btree ("_order");
  CREATE INDEX "site_content_why_paragraphs_parent_id_idx" ON "site_content_why_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "site_content_beliefs_order_idx" ON "site_content_beliefs" USING btree ("_order");
  CREATE INDEX "site_content_beliefs_parent_id_idx" ON "site_content_beliefs" USING btree ("_parent_id");
  CREATE INDEX "site_content_process_steps_order_idx" ON "site_content_process_steps" USING btree ("_order");
  CREATE INDEX "site_content_process_steps_parent_id_idx" ON "site_content_process_steps" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_trust_sectors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_why_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_beliefs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "site_content_trust_sectors" CASCADE;
  DROP TABLE "site_content_why_paragraphs" CASCADE;
  DROP TABLE "site_content_beliefs" CASCADE;
  DROP TABLE "site_content_process_steps" CASCADE;
  DROP TABLE "site_content" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_faqs_fk";
  
  DROP INDEX "payload_locked_documents_rels_faqs_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "faqs_id";
  DROP TYPE "public"."enum_faqs_placement";
  DROP TYPE "public"."enum_faqs_status";`)
}
