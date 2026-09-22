# Nuru Designs - Quick Start Guide

This guide gets the public portfolio and Payload CMS running locally.

## ✅ What's Already Done

- ✓ Next.js 16 project initialized with TypeScript & Tailwind CSS
- ✓ Public site and Payload admin route groups
- ✓ Filterable proof-of-work archive
- ✓ Project taxonomy for design categories and campaigns
- ✓ Contact submissions collection and API route
- ✓ Environment template, contribution guide, and CI quality workflow

## Next Steps

### 1. Set up the database
   - Go to [supabase.com](https://supabase.com) → Create free account
   - Create new project
   - Copy connection string → Paste in `.env.local`
   - **Detailed guide**: See `SETUP.md`

### 2. Set up image storage
   - Go to [cloudinary.com](https://cloudinary.com) → Sign up free
   - Get API credentials (Cloud Name, API Key, API Secret)
   - Add to `.env.local`
   - **Detailed guide**: See `SETUP.md`

### 3. Install and check locally
   ```bash
   cd ~/nuru-designs
   npm ci
   npm run check
   npm run dev
   ```
   - Visit `http://localhost:3000` for the public site
   - Visit `http://localhost:3000/admin` to manage content

### 4. Deploy to Vercel
   - Push code to GitHub
   - Go to [vercel.com](https://vercel.com) → Import repository
   - Add environment variables
   - Click Deploy ✨

## 📁 Project Structure

```
nuru-designs/
├── app/(site)/             # Public pages and shared layout
├── app/(payload)/          # Payload admin route and layout
├── app/api/                # Contact and Payload API routes
├── collections/            # CMS data schemas
├── docs/                   # Architecture and workflow documentation
├── .env.local             # Your secrets (DON'T commit!)
├── SETUP.md              # Detailed setup guide
└── README.md             # Full documentation
```

## 🔑 Key Files to Know

| File | Purpose |
|------|---------|
| `SETUP.md` | Step-by-step setup instructions |
| `.env.example` | Template for environment variables |
| `.env.local` | Your actual secrets (git-ignored) |
| `payload.config.ts` | CMS configuration |

## 💻 Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Add a package
npm install package-name

# Run the quality gate
npm run check
```

## 🎯 What You Can Do Now

1. **Customize pages** - Edit files in `app/` folder
2. **Create projects** - Use the admin panel and assign categories/tags
3. **Upload images** - Verify the configured storage adapter before production
4. **Follow the workflow** - Read `CONTRIBUTING.md` before opening a PR

## 📊 Free Services Summary

| Service | Free Tier |
|---------|-----------|
| **Vercel** | Unlimited deployments |
| **Supabase** | 500MB database |
| **Cloudinary** | 25GB storage |
| **Total Cost** | **$0** 🎉 |

## ⚡ Pro Tips

- **Images**: Cloudinary auto-compresses. Keep originals under 5MB
- **Speed**: Vercel's CDN makes your site lightning fast
- **Admin Access**: `/admin` panel is where clients can't go
- **SEO**: Update metadata in Payload collection settings

## 🆘 Need Help?

- **Setup questions?** → Read `SETUP.md`
- **Development?** → Check `README.md`
- **CMS questions?** → [payloadcms.com/docs](https://payloadcms.com/docs)

## Todo List

- [ ] Create Supabase account & database
- [ ] Create Cloudinary account & get credentials
- [ ] Update `.env.local` with credentials
- [ ] Run `npm install`
- [ ] Test locally with `npm run dev`
- [ ] Commit the current baseline
- [ ] Push to GitHub and enable the quality workflow
- [ ] Deploy on Vercel
- [ ] Add your portfolio projects in admin panel
- [ ] Share with clients! 🚀

---

Start with Step 1 above, or read `SETUP.md` for detailed service setup.
