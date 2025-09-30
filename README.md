# StoryGarden — Children’s Stories Website

A minimal, kid-friendly site built with **Next.js (App Router)** and **Tailwind CSS**.

## Quick start

```bash
pnpm install   # or npm install / yarn
pnpm dev       # http://localhost:3000
```

## Add your stories

Edit `app/page.tsx` and replace the `STARTER_STORIES` array with your own content:
```ts
{
  id: 'a-unique-id',
  title: 'Title',
  ageRange: '4-6',
  minutes: 5,
  tags: ['bedtime','kindness'],
  summary: 'One or two sentences',
  body: 'Your full story text...'
}
```

## Accessibility & Safety
- Dark mode and optional high-contrast toggle
- Big, clear buttons; keyboard focus rings
- “Read Aloud” via browser Speech Synthesis (where supported)
- No trackers or analytics by default

## Deploy
- **Vercel**: push to a Git repo and import in Vercel (works out of the box).
- **Static**: `next build` then `next start` for Node hosting.

## License
MIT

## File-based stories (Markdown)

Add `.md` files in `content/stories/` with frontmatter:

```md
---
title: My Story
slug: my-story
ageRange: "4-6"
minutes: 5
tags: ["bedtime","kindness"]
summary: One or two sentences here.
---

Your story **markdown** goes here.
```

The site auto-builds pages at `/stories/[slug]` and age filters at `/ages/[age]`.

## Favorites
Click ☆ on a story page. Stored in the browser (localStorage).

## Print to PDF
Open `/stories/[slug]/print`, then use your browser's **Print → Save as PDF**.

## Deploy to Vercel

1. Create a Git repo and push this code.
2. Import the repo on [vercel.com](https://vercel.com).
3. Framework preset: **Next.js**. Build command: `next build`. Output: `.next` (default).
4. Click **Deploy**.

## Deploy to Netlify (optional)

- Build command: `next build`
- Publish directory: `.next`
- Add the Next.js runtime plugin if prompted.

## Static hosting note
This app uses the Next.js App Router with filesystem reads during build.
It is compatible with serverless deployments (Vercel/Netlify) out of the box.
