# Contributing to Nuru Designs

## Branches

`main` is the deployable branch. Do not develop directly on it.

Create one short-lived branch per change:

```bash
git switch main
git pull --ff-only
git switch -c feature/portfolio-filters
```

Use these prefixes:

- `feature/` for new user-facing functionality
- `fix/` for a bug correction
- `docs/` for documentation-only changes
- `chore/` for tooling, dependencies, or maintenance

A permanent `develop` branch is intentionally not used yet. The project is small enough that feature branches plus pull requests provide the needed review and rollback points without maintaining two integration branches.

## Before Opening a Pull Request

Run the same checks used by CI:

```bash
npm ci
npm run check
```

For changes affecting a page, API route, CMS collection, or environment configuration, also run:

```bash
npm run build
```

Then manually verify the affected route in the browser. Database-backed routes require a working `DATABASE_URI`; public pages should still render their empty states when content is unavailable.

## Commit Messages

Use imperative, focused messages:

```text
feat: add portfolio category filters
fix: handle unavailable project database
chore: update Payload dependencies
docs: document content workflow
```

Keep commits small enough to review. Avoid mixing a visual redesign, schema change, and unrelated cleanup in one commit.

## Pull Requests

A pull request should include:

- What changed and why
- Screenshots for visual changes
- Database or environment-variable changes
- Validation commands and their results
- Any follow-up work that is deliberately out of scope

Merge only after CI passes and the change has been reviewed. Deployments should come from `main`.

## Secrets and Data

Never commit `.env.local`, API keys, database passwords, or uploaded media credentials. Use `.env.example` for names and safe placeholders only. Rotate any secret that has been exposed in chat, logs, screenshots, or commits.
