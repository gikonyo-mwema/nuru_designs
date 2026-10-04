# Setup Guide - Nuru Designs Portfolio

This guide walks you through setting up all the free services needed to deploy your design portfolio.

## Table of Contents
1. [Database Setup (Supabase)](#database-setup-supabase)
2. [Image Storage (Cloudinary)](#image-storage-cloudinary)
3. [Hosting (Vercel)](#hosting-vercel)
4. [Local Development](#local-development)
5. [Deploying to Production](#deploying-to-production)

---

## Database Setup (Supabase)

Supabase provides a free PostgreSQL database perfect for Payload CMS.

### Step 1: Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub" (easier for deployment later)
4. Authorize Supabase access to your GitHub account

### Step 2: Create a New Project
1. Click "New Project"
2. Fill in:
   - **Name**: `nuru-designs` (or your preference)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
3. Click "Create new project" and wait ~2 minutes

### Step 3: Get Connection String
1. In your project, go to **Settings** (gear icon) → **Database**
2. Under "Connection Strings", select **Postgres**
3. Copy the connection string
4. Replace `[PASSWORD]` with your database password
5. Update `.env.local`:
   ```
   DATABASE_URI=postgresql://postgres.[PROJECT_ID]:YOUR_PASSWORD@aws-0-[REGION].pooler.supabase.com:5432/postgres
   ```

For PostgreSQL TLS verification, download the root certificate from **Supabase Dashboard → Database → Settings → SSL Configuration** and set `DATABASE_SSL_CA_FILE` to the local certificate file path. Alternatively, set `DATABASE_SSL_CA` to the PEM certificate contents, preserving the `BEGIN CERTIFICATE` and `END CERTIFICATE` lines. The app verifies the server certificate and does not disable TLS verification.

### Step 4: Enable Replication (Important!)
1. Go to **Settings** → **Replication**
2. Make sure replication is enabled (should be by default)

---

## Image Storage (Cloudinary)

Cloudinary provides free CDN image storage with automatic optimization.

### Step 1: Create Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Click "Sign up for free"
3. Fill in your details
4. Verify email

### Step 2: Get API Credentials
1. Go to your **Dashboard**
2. You'll see:
   - **Cloud Name** (e.g., `dlaxyw92f`) → Copy this
   - **API Key** (starts with numbers) → Copy this

3. Update `.env.local`:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   ```

### Step 3: Generate API Secret
1. In Dashboard, click your name → **Settings** (or Account → Security)
2. Scroll to **API Keys** section
3. Under API Secret, click "Generate API Secret"
4. A new secret will appear → Copy it
5. Add to `.env.local`:
   ```
   CLOUDINARY_API_SECRET=your-api-secret
   ```

### Step 4: Configure Upload Settings (Optional)
1. In Dashboard, go to **Settings**
2. Scroll to **Upload**
3. Set Max file size to `50 MB`
4. Enable Auto tagging if you want

---

## Hosting (Vercel)

Vercel is built by the creators of Next.js and deploys automatically from GitHub.

### Step 1: Prepare Your Repository
```bash
cd ~/nuru-designs

# Make sure everything is committed
git status
git add .
git commit -m "Initial portfolio setup"
```

### Step 2: Push to GitHub
```bash
# If not already a GitHub repo, run:
git remote add origin https://github.com/YOUR_USERNAME/nuru-designs.git
git branch -M main
git push -u origin main
```

### Step 3: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Import Project"
4. Select your `nuru-designs` repository
5. Click "Import"

### Step 4: Add Environment Variables
In the "Environment Variables" section, add:

| Name | Value |
|------|-------|
| `DATABASE_URI` | Your Supabase connection string |
| `DATABASE_SSL_CA` | Supabase database root certificate PEM, used to verify the TLS connection |
| `DATABASE_SSL_CA_FILE` | Path to the downloaded Supabase database root certificate |
| `PAYLOAD_SECRET` | Random 32+ character string |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Your cloud name |
| `CLOUDINARY_API_KEY` | Your API key |
| `CLOUDINARY_API_SECRET` | Your API secret |
| `NEXT_PUBLIC_SITE_URL` | The canonical HTTPS URL for your production site |
| `RESEND_API_KEY` | Optional API key for contact email notifications |
| `CONTACT_RECIPIENT_EMAIL` | Optional inbox that receives contact notifications |
| `CONTACT_FROM_EMAIL` | Optional verified sender address used for notifications |

**Generate a Payload Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. Your site will be live at `https://nuru-designs-YOUR_USERNAME.vercel.app`

---

## Local Development

### Step 1: Install Dependencies
```bash
cd ~/nuru-designs
npm install
```

### Step 2: Create `.env.local` File
```bash
cp .env.example .env.local
```

### Step 3: Fill in Credentials
Edit `.env.local` with your credentials from Supabase, Cloudinary, and generate a local Payload secret:
```
DATABASE_URI=postgresql://...
DATABASE_SSL_CA_FILE=/path/to/prod-ca-2021.crt
PAYLOAD_SECRET=your-random-32-char-secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Step 4: Verify database access
```bash
npm run check
```

The current Payload configuration uses `push: false`, so starting the dev server does not silently change the database schema. Apply the repository's Payload migrations or an explicitly reviewed schema setup before using `/admin`. Visit `http://localhost:3000/admin` to verify access after the database is prepared.

### Step 5: Start Development Server
```bash
npm run dev
```

Visit:
- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **API**: http://localhost:3000/api/projects

---

## Deploying to Production

### Automatic Deployments
Every time you push to `main` on GitHub, Vercel can build and deploy the site. The repository quality workflow runs `npm run check` and a production build on pull requests and pushes. It does not connect to a database and does not currently run automated tests.

Before deploying a collection/schema change, run the **Production database migrations** workflow from the `main` branch in GitHub Actions. Configure a GitHub environment named `production` with `DATABASE_URI` and `PAYLOAD_SECRET` secrets. The migration job is manually triggered and serialized so previews and ordinary pushes cannot change the production schema.

The contact endpoint applies a best-effort limit of five requests per IP per 15 minutes in each running application instance. It uses the hosting proxy's `x-real-ip` header; do not expose the app directly with a client-controllable value for this header. For distributed rate limiting across serverless instances, configure an edge-level limit or a shared rate-limit store.

To receive contact notifications, configure `RESEND_API_KEY`, `CONTACT_RECIPIENT_EMAIL`, and `CONTACT_FROM_EMAIL` in the deployment environment. These are optional; without all three, submissions are still saved but no notification is sent. Verify the sender domain in Resend first. The form submission is saved even if notification delivery fails; check server logs for delivery errors.

### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Database Migrations
When you update a Payload collection, treat the schema change as a migration:
1. Review the collection change and its effect on existing records.
2. Generate or apply the appropriate Payload migration using the project's installed Payload CLI.
3. Test the migration against a non-production database.
4. Back up production and run the GitHub Actions migration workflow before deploying code that relies on the new fields.

Do not enable automatic schema push in production. The `Projects.category` field is required, so existing projects must be backfilled before that change is applied to a database containing older records.

---

## Troubleshooting

### Database Connection Error
**Error**: `ECONNREFUSED` or `timeout`

**Solution**:
- Check DATABASE_URI format
- Verify Supabase project is active
- Test connection: `psql YOUR_CONNECTION_STRING`

### Cloudinary Images Not Loading
**Error**: Images 404 or show as broken

**Solution**:
- Verify API credentials in `.env.local`
- Check cloud name spelling
- Clear browser cache (Ctrl+Shift+Del)

### Admin Panel 404
**Error**: `http://localhost:3000/admin` shows 404

**Solution**:
- Restart dev server: `npm run dev`
- Clear `.next` folder: `rm -rf .next`
- Ensure Payload installed: `npm install payload`

### Vercel Deployment Fails
**Error**: Build fails on Vercel but works locally

**Solution**:
- Check environment variables are all set
- Look at build logs in Vercel dashboard
- Ensure Node version 18+: `node --version`

---

## Cost Summary

| Service | Free Tier | Cost |
|---------|-----------|------|
| Supabase | 500 MB database | Free |
| Cloudinary | 25 GB storage | Free |
| Vercel | Unlimited deployments | Free |
| **Total** | | **FREE** 🎉 |

---

## Next Steps

1. Add your portfolio projects in the Payload CMS admin panel
2. Upload images through the Media collection
3. Customize the pages in `/app` to match your brand
4. Test the site on different devices
5. Share your portfolio with clients!

---

## Support

- [Payload CMS Docs](https://payloadcms.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Vercel Docs](https://vercel.com/docs)

Happy designing! 🎨
