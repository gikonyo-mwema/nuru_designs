# Nuru Designs

Nuru Designs is a graphics and brand design portfolio built with Next.js, Payload CMS, PostgreSQL, and Cloudinary/Supabase services. The public site presents branding, posters, banners, menus, social media artwork, corporate design, church campaigns, elections, and charity/NGO campaigns as proof of work.

## Quick Start

### Requirements

- Node.js 20 LTS recommended
- npm
- A Supabase PostgreSQL database for Payload-backed routes
- Cloudinary credentials when using remote media uploads

### Install and configure

```bash
npm ci
cp .env.example .env.local
```

Fill in `.env.local`. Never commit that file. The safe variable template is tracked as `.env.example`.

### Run locally

```bash
npm run dev
```

Open the public site at `http://localhost:3000`, Payload admin at `http://localhost:3000/admin`, and the API at `http://localhost:3000/api`.

## Quality Checks

Run the standard local gate before opening a pull request:

```bash
npm run check
```

This runs strict TypeScript validation and Next.js ESLint rules. For framework, route, collection, or environment changes, also run `npm run build`.

The GitHub Actions workflow in `.github/workflows/quality.yml` runs `npm ci` and `npm run check` for pull requests and pushes to `main`.

## Branch and Merge Workflow

`main` is the deployable branch. Work on short-lived branches:

```bash
git switch main
git pull --ff-only
git switch -c feature/portfolio-filters
```

Use `feature/`, `fix/`, `docs/`, or `chore/` prefixes. Open a pull request when checks pass. A permanent `develop` branch is not needed at the current project size; feature branches and CI provide enough isolation and review.

See [CONTRIBUTING.md](CONTRIBUTING.md) for commit and pull request rules.

## Project Structure

```text
app/
  (site)/                       Public pages and shared public layout
    page.tsx                    Homepage
    work/page.tsx               Filterable proof-of-work archive
    work/[slug]/page.tsx        Project detail page
    services/page.tsx           Services cards
    about/page.tsx              Studio information
    contact/page.tsx            Contact form
  (payload)/                    Payload root layout and admin route
  api/                          Contact and Payload API routes
  globals.css                  Shared brand system and responsive styles
collections/                    Payload schemas
payload.config.ts               Payload adapter and admin config
next.config.mjs                 Next/Payload integration
.env.example                    Safe environment variable template
docs/ARCHITECTURE.md            Runtime and ownership notes
CONTRIBUTING.md                 Branch, commit, PR, and secret policy
```

## Content Workflow

1. Sign in to `/admin`.
2. Create or edit a Media item and upload the project artwork.
3. Create a Project with a unique slug, description, hero image, and gallery.
4. Assign a category, project type, tags, client, and year.
5. Set `featured` for work that should appear on the homepage.
6. Add a publication date and verify the public project route.

The work archive supports category URLs such as `/work?category=church`, `/work?category=campaigns`, and `/work?category=charity`.

Group related posters and assets into one campaign project when they belong to the same body of work. Use the gallery and captions to show the range of deliverables.

## Environment and Services

The main variables are documented in `.env.example`: `DATABASE_URI`, `PAYLOAD_SECRET`, Cloudinary variables, Resend variables, and `NEXT_PUBLIC_*` social URLs.

Never expose database passwords, API secrets, service-role keys, or Payload secrets in source control, screenshots, chat, or logs. Rotate any secret that has been exposed.

## Current Limitations

- Payload admin and database-backed pages require a reachable Supabase database.
- Public work pages render an empty state when project data cannot be loaded.
- Cloudinary upload routing must be verified before claiming production uploads are configured.
- Email delivery requires a configured Resend sender, recipient, and API key.
- The automated quality gate checks TypeScript and lint. Add focused tests as API, filtering, and content workflows grow.

See [SETUP.md](SETUP.md) for external service setup and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for implementation ownership.
