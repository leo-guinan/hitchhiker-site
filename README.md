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

- **`NEXT_PUBLIC_SUBSTACK_URL`** – Substack publication URL (e.g. `https://yoursubstack.substack.com`). Used by email capture to redirect after signup.
- **`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`** – Plausible analytics domain (e.g. `hitchhikersguidetothefuture.com`). Script only loads when set.
- **`NEXT_PUBLIC_CALENDLY_URL`** – (Optional) Calendly link or embed URL for the Network page “Book Intro Call”.

## Structure

- **`app/`** – Routes: `/`, `/hitchhiker`, `/about`, `/guides`, `/guides/[slug]`, `/podcast`, `/essays`, `/essays/[slug]`, `/course`, `/network`, `/waystations`.
- **`content/guides/`** – MDX guides (frontmatter: `title`, `excerpt`, `date`, `hook`, `topic`).
- **`content/essays/`** – MDX essays (frontmatter: `title`, `excerpt`, `date`).
- **`content/podcast/episodes.json`** – Episode metadata (number, title, duration, date, type, embedUrl, description, showNotes, transcriptUrl).
- **`components/`** – Header, Footer, EmailCapture.
- **`lib/content.ts`** – Guide/essay slug listing and frontmatter + content loading.
- **`lib/podcast.ts`** – Episode listing.

## Build

```bash
npm run build
```

Static pages for all guides and essays are generated at build time. Set env vars before building if you want Plausible in production.
