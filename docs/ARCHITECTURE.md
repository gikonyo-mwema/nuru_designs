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

### Contact Submissions

The public contact API validates name, email, and message, then creates a Payload record. Administrative read/update/delete access is restricted to authenticated users.

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
