# Ariel Agdon — Portfolio

An interactive portfolio built around a **hybrid 3D workspace**: a scrolling,
accessible resume on one side, and a live Three.js room that follows your
reading position on the other. Built with Next.js 15, React 19, Tailwind CSS 4
and React Three Fiber.

## Highlights

- **Hybrid split-screen** — the resume panel and the 3D scene stay in sync
  through a dependency-free external store (`useSyncExternalStore`, no context
  re-renders). Scroll the page and the camera follows; click an object in the
  room and the page scrolls to the matching section.
- **Performance-first 3D** — Three.js is lazy-loaded (`next/dynamic`,
  `ssr: false`) only when the scene panel nears the viewport; the render loop
  stops completely (`frameloop="never"`) when offscreen or the tab is hidden.
- **Accessible by default** — keyboard navigation, focus trap and Escape
  handling in the chat dialog, `aria-live` scene announcements, and
  `prefers-reduced-motion` support throughout.
- **Contact chat** — a chat-styled contact form with validation, rate
  limiting, HTML-injection protection and SMTP delivery (Nodemailer).
- **Dark mode** — system-aware theming via `next-themes`.

## Tech stack

| Layer      | Choice |
| ---------- | ------ |
| Framework  | Next.js 15 (App Router) · React 19 |
| Styling    | Tailwind CSS 4 · `tailwind-merge` |
| 3D         | Three.js · React Three Fiber · Drei |
| Animation  | Framer Motion (imperative camera tweens; CSS for micro-interactions) |
| Email      | Nodemailer (SMTP) |
| Tooling    | TypeScript · ESLint 9 |

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure the contact form
cp .env.example .env.local
# then fill in the SMTP values (see table below)
# Build/runtime fails gracefully without them: the API returns 503
# and the rest of the site works normally.

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Required | Purpose |
| -------- | -------- | ------- |
| `SMTP_HOST` | Yes (contact form) | SMTP server hostname |
| `SMTP_PORT` | No | Defaults to `587`; `465` enables implicit TLS |
| `SMTP_USER` / `SMTP_PASS` | Yes (contact form) | SMTP credentials |
| `EMAIL_FROM` | Yes (contact form) | Sender address for notifications |
| `EMAIL_TO` | Yes (contact form) | Where contact messages are delivered |
| `NEXT_PUBLIC_EMAIL` | No | Public address shown as a mailto link |
| `NEXT_PUBLIC_CONTACT_API` | No | Form endpoint override (default `/api/contact`) |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical origin for metadata, `sitemap.xml` and `robots.txt` |

> Only `NEXT_PUBLIC_*` values are exposed to the browser — never put SMTP
> credentials there.

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (flat config) |
| `npm run typecheck` | TypeScript without emitting |
| `npm test` | Contact API test suite (Vitest) |

## Project structure

```
app/
  api/contact/   POST endpoint: validation, rate limit, SMTP delivery
  layout.tsx     Fonts, theme provider, metadata, JSON-LD
  page.tsx       Homepage composition
components/
  portfolio/     Hybrid layout: ResumePanel, ScenePanel, scroll sync
  three/         R3F canvas, procedural room, camera rig, scene objects
  contact/       Floating chat launcher + lazily loaded panel
  ui/            Navbar, toaster
lib/             Scene config/store, utilities, canonical site URL
hooks/           DOM↔scene sync, outside-click
data/            Nav, projects, skills, social links
```

## Deployment

Any Node host works. On Vercel:

1. Import this repository and pick the `main` branch.
2. Add the environment variables from `.env.example` in **Project → Settings →
   Environment Variables** (set `NEXT_PUBLIC_SITE_URL` to your domain).
3. Deploy — pushes to `main` redeploy automatically.

The contact API keeps its rate-limit state in memory, which is per-instance on
serverless; swap in a shared store (e.g. Upstash Redis) if you expect high
traffic.

---

© Ariel Agdon. All rights reserved.
