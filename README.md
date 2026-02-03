# The Hitchhiker's Guide to the Future

Next.js site for [hitchhikersguidetothefuture.com](https://hitchhikersguidetothefuture.com): the hub for the Hitchhiker identity, guides, podcast, email course funnel, consulting agency, and waystations.

## Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4** + `@tailwindcss/typography`
- **MDX** (guides & essays via `next-mdx-remote`, content in `content/`)
- **TypeScript**

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local` and set:

- **`NEXT_PUBLIC_SITE_URL`** – Base URL for canonical and share links (e.g. `https://hitchhikersguidetothefuture.com`).
- **`DATABASE_URL`** – Neon Postgres connection string. Add via [Vercel Marketplace → Neon](https://vercel.com/marketplace/neon) or from [neon.tech](https://neon.tech). Required for exercise submissions.
- **`CONVERTKIT_API_KEY`** – Kit V4 API key (app.kit.com → Developer). Used by `/api/subscribe` to add subscribers.
- **`CONVERTKIT_FORM_ID_COURSE`** – ConvertKit form ID for the 5-Day Course signup.
- **`CONVERTKIT_FORM_ID_NEWSLETTER`** – (Optional) ConvertKit form ID for “Subscribe for updates”. Omit to return 503 for newsletter list.
- **`NEXT_PUBLIC_SUBSTACK_URL`**, **`NEXT_PUBLIC_TWITTER_URL`**, **`NEXT_PUBLIC_LINKEDIN_URL`**, **`NEXT_PUBLIC_GITHUB_URL`**, **`NEXT_PUBLIC_SPEAKING_URL`** – Footer “Connect” and “Speaking” links. Leave empty to hide.
- **`NEXT_PUBLIC_APPLE_PODCASTS_URL`**, **`NEXT_PUBLIC_SPOTIFY_URL`**, **`NEXT_PUBLIC_PODCAST_RSS_URL`** – Podcast subscribe links. Leave empty to show “Subscribe links coming soon”.
- **`NEXT_PUBLIC_FATHOM_SITE_ID`** – Fathom Analytics site ID. Script only loads when set.
- **`NEXT_PUBLIC_CAL_COM_URL`** – (Optional) Cal.com scheduling URL for “Book Intro Call”. Defaults to hitchhiker-intro. Book links go through `/book-intro` for Fathom tracking.

## Structure

- **`app/`** – Routes: `/`, `/hitchhiker`, `/about`, `/guides`, `/guides/[slug]`, `/deep-dives`, `/deep-dives/[slug]`, `/podcast`, `/essays`, `/essays/[slug]`, `/course`, `/course/dashboard`, `/course/exercises`, `/course/exercises/day-[1-5]`, `/network`, `/book-intro` (tracked Cal.com redirect), `/waystations`, `/api/subscribe`, `/api/submit-exercise`, `/api/dashboard-stats`.
- **`content/guides/`** – MDX guides (frontmatter: `title`, `excerpt`, `date`, `hook`, `topic`).
- **`content/deep-dives/`** – MDX deep dives (frontmatter: `title`, `excerpt`, `date`). PDFs generated via `npm run build:pdfs`.
- **`content/essays/`** – MDX essays (frontmatter: `title`, `excerpt`, `date`).
- **Podcast episodes** – Fetched from RSS (`NEXT_PUBLIC_PODCAST_RSS_URL`, defaults to Anchor feed). Revalidated hourly.
- **`components/`** – Header, Footer, EmailCapture, ShareBar, Fathom.
- **`lib/content.ts`** – Guide/essay slug listing and frontmatter + content loading.
- **`lib/podcast.ts`** – Episode listing.
- **`lib/site.ts`** – Site config (social URLs, podcast URLs, siteUrl from env).

## Build

```bash
npm run build
```

Static pages for all guides, essays, and deep dives are generated at build time. Set env vars before building if you want Fathom in production.

### Deep Dive PDFs

To generate PDFs for deep dives (required for download links to work):

```bash
npm run build:pdfs
```

This reads `content/deep-dives/*.mdx` and outputs PDFs to `public/deep-dives/`. Run after adding or updating deep dives.

### Database (Exercise Submissions)

Exercise submissions are stored in Neon Postgres. Set up:

1. Add Neon via [Vercel Marketplace](https://vercel.com/marketplace/neon) or create a project at [neon.tech](https://neon.tech).
2. Add `DATABASE_URL` to `.env.local` (or let Vercel inject it).
3. Initialize the schema:

```bash
npm run db:init
```

This creates the `submissions` table. Run once per environment (local, production).
