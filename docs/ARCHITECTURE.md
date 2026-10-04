# Architecture

## Runtime Shape

Nuru Designs is a Next.js App Router application with Payload CMS mounted in the same deployment.

```text
Browser
  |
  +-- public site: app/(site)
  |     +-- home, work, services, about, contact
  |     +-- server-rendered portfolio reads through Payload
  |
  +-- Payload admin: app/(payload)/admin
  |
  +-- API: app/api
        +-- [...slug] forwards Payload REST routes
        +-- contact validates and stores submissions

Payload config: payload.config.ts
  +-- PostgreSQL adapter -> Supabase
  +-- collections -> collections/*.ts
  +-- uploads -> Media collection / configured storage
```

## Route Groups

- `app/(site)/` contains the public website. The route group does not appear in URLs.
- `app/(payload)/` contains the Payload root layout and admin catch-all route.
- `app/api/` contains application and Payload API handlers.

The public and Payload layouts are separate because Payload owns its own document structure. Nesting the public layout around the admin can create duplicate `html` and `body` elements and hydration failures.

## Content Model

### Users

Authentication-enabled Payload collection used by the admin. `payload.config.ts` sets `admin.user` to `users`, so authenticated users in this collection can access the admin according to collection access rules.

### Projects

Portfolio entries with:

- title, slug, description, and rich-text content
- hero image and gallery relationships to Media
- category, tags, and project type for the work archive
- client, year, featured flag, and publication date

The public work archive reads projects and filters by category using `/work?category=<value>`.

### Media

Upload records used by project hero images and galleries. Image delivery configuration must be kept consistent with the chosen storage provider before production deployment.

### Services, FAQs, Teams, and Site Content

- **Services** are managed in Payload and rendered with the built-in service definitions in `lib/services.ts` as fallbacks. Published CMS records replace fallback entries with the same slug; fallback entries without a published CMS match remain available. The built-in definitions also provide service route parameters and sitemap entries.
- **FAQs** are managed in Payload by placement (`home`, `services`, or `both`). If the database is unavailable or there are no published matches for a placement, the public pages use the fallback FAQ lists in `lib/site-content.ts`.
- **Teams** are managed in Payload and shown on the About page. Unlike FAQs, the public team query returns an empty list when no published records can be loaded.
- **Site Content** is a Payload global for editable homepage, About, and footer copy. Missing CMS values are filled from `fallbackSiteContent` in `lib/site-content.ts`.

### Contact Submissions

The public contact API validates name, email, and message, then creates a Payload record. Administrative read/update/delete access is restricted to authenticated users. Optional Resend email notification happens after the record is stored, so notification delivery failure does not discard the submission.

## Public Content and Revalidation

Public pages use server-side Payload reads for projects and CMS-managed content. Database-backed reads have bounded waits and content-specific fallback behavior so public pages can remain useful during database outages; the admin still requires a working database.

Payload collection changes and deletions use hooks in `lib/revalidate.ts` to invalidate the site layout. Site Content changes invalidate the root layout, while Team changes invalidate `/about`. Preserve these hooks when adding or changing public-facing collections so edits become visible without waiting for a deployment.

## Media Storage

`lib/cloudinary-adapter.ts` stores uploaded media under the `nuru-designs/media` Cloudinary folder. Public IDs omit filename extensions; delivery URLs restore the extension as the format. Production deployments must configure Cloudinary because production filesystems are ephemeral and local-disk uploads are disabled. Public delivery URLs are direct Cloudinary URLs, so Payload access control does not protect the image itself.

## Search and Canonical URLs

`lib/site-url.ts` sets the base URL in this order: `NEXT_PUBLIC_SITE_URL`, `VERCEL_URL` (with `https://` added when needed), then `http://localhost:3000`. Keep `NEXT_PUBLIC_SITE_URL` set to the canonical production origin so metadata and `robots.txt` do not advertise a preview or localhost URL. `app/robots.ts` disallows `/admin/` and points crawlers to the sitemap. `app/sitemap.ts` lists built-in service slugs and static public routes, then adds published project slugs from Payload; if the database is missing, unavailable, or times out, it returns the static routes only.

## Contact Endpoint Boundaries

`app/api/contact/route.ts` caps request bodies and field lengths, validates the form server-side, accepts a honeypot field for bot submissions, and applies a best-effort limit of five requests per address per 15 minutes. The limiter is in-memory and therefore applies per running application instance, not globally across serverless instances. The address comes from `x-real-ip`, which must be set by trusted hosting infrastructure; do not expose the application directly to client-controlled values for that header. Use an edge-level limit or shared store for distributed enforcement.

## Data and Failure Boundaries

Public pages that depend on portfolio data should render an intentional empty state if the database is unavailable. Admin routes require a working database and may fail when Supabase is unreachable.

The Payload adapter currently uses the Supabase connection string with SSL and a constrained local-development pool. Automatic schema push is disabled after the initial schema has been created; future production schema changes should use reviewed migrations rather than relying on dev startup behavior.

## Environment Variables

See `.env.example` for the complete variable list. Keep secrets in `.env.local` locally and in the deployment provider's secret store in production. Only variables prefixed with `NEXT_PUBLIC_` may be safely exposed to browser code.

## Change Ownership

- Visual pages and shared styling: `app/(site)/` and `app/globals.css`
- CMS schema: `collections/` and `payload.config.ts`
- API behavior: `app/api/`
- Framework/build behavior: `next.config.mjs`, `tsconfig.json`, and package scripts
- Team process: `CONTRIBUTING.md`

## Schema and Deployment Changes

Payload schema changes require reviewed migrations; do not turn on automatic schema push in production. The production migration workflow is manually dispatched from `main`, runs in the GitHub `production` environment, and requires `DATABASE_URI` and `PAYLOAD_SECRET`. Follow the migration procedure in `SETUP.md` and verify changes against a non-production database before production.
