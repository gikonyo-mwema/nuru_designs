import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TABLE "services_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "services_packages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"featured" boolean DEFAULT false
  );
  
  CREATE TABLE "services_samples" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"caption" varchar NOT NULL,
  	"image" varchar NOT NULL
  );
  
  CREATE TABLE "services_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"number" varchar NOT NULL,
  	"short_description" varchar NOT NULL,
  	"outcome" varchar NOT NULL,
  	"image" varchar,
  	"image_alt" varchar,
  	"best_for" varchar,
  	"timeline" varchar,
  	"starting_from" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"status" "enum_services_status" DEFAULT 'draft' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "services_deliverables" ADD CONSTRAINT "services_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_packages" ADD CONSTRAINT "services_packages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_samples" ADD CONSTRAINT "services_samples_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_faqs" ADD CONSTRAINT "services_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_deliverables_order_idx" ON "services_deliverables" USING btree ("_order");
  CREATE INDEX "services_deliverables_parent_id_idx" ON "services_deliverables" USING btree ("_parent_id");
  CREATE INDEX "services_packages_order_idx" ON "services_packages" USING btree ("_order");
  CREATE INDEX "services_packages_parent_id_idx" ON "services_packages" USING btree ("_parent_id");
  CREATE INDEX "services_samples_order_idx" ON "services_samples" USING btree ("_order");
  CREATE INDEX "services_samples_parent_id_idx" ON "services_samples" USING btree ("_parent_id");
  CREATE INDEX "services_faqs_order_idx" ON "services_faqs" USING btree ("_order");
  CREATE INDEX "services_faqs_parent_id_idx" ON "services_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_deliverables" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_packages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_samples" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "services_deliverables" CASCADE;
  DROP TABLE "services_packages" CASCADE;
  DROP TABLE "services_samples" CASCADE;
  DROP TABLE "services_faqs" CASCADE;
  DROP TABLE "services" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_services_fk";
  
  DROP INDEX "payload_locked_documents_rels_services_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "services_id";
  DROP TYPE "public"."enum_services_status";`)
}
