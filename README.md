# Personal Portfolio

A fast, JSON-driven portfolio built with **Vite + React**. Every word, project,
and stat on the page comes from a single data file — **`src/data/projects.json`**.
Add a project by appending one block to that file; a push to `main` rebuilds and
redeploys automatically.

```
src/
├─ data/projects.json     ← the ONLY file you edit to change content
├─ lib/content.js         ← the single boundary between data and UI
├─ styles/global.css      ← design tokens + reset (dark / light themes)
├─ hooks/useTheme.js
└─ components/            ← pure, presentational; data comes in as props
   ├─ Nav, Hero, WorkIndex, ProjectCard, ProjectModal
   ├─ About, Stack, Experience, Contact, Footer
   └─ SectionHeader, Button, Reveal, ThemeToggle
```

The rendering layer never reaches into the JSON directly — it imports from
`lib/content.js` and receives everything as props. Data and presentation stay
fully separated.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

Requires Node 18+.

## Editing content

Open **`src/data/projects.json`**. It has five top-level keys:

| Key          | What it controls                                             |
| ------------ | ----------------------------------------------------------- |
| `profile`    | Name, role, hero statement, availability, email, socials.   |
| `about`      | Bio heading, paragraphs, and the "at a glance" stat cards.   |
| `stack`      | Grouped lists of tools shown in the Stack section.          |
| `experience` | Timeline entries (set `"current": true` for the live dot).  |
| `projects`   | The array the work grid maps over. **Append here.**         |

### Adding a project

Append a block to the `projects` array. Only `id`, `title`, and `summary` are
required; everything else is optional and hidden when omitted.

```jsonc
{
  "id": "my-project",              // unique slug
  "title": "My Project",
  "year": "2026",
  "role": "Solo — full-stack",
  "status": "Live",                // shown as a pill
  "featured": true,                // spans full width + shows metrics on the card
  "summary": "One line a non-technical recruiter understands instantly.",
  "description": "The longer story shown in the details dialog.",
  "highlights": ["Outcome one", "Outcome two"],
  "metrics": [{ "value": "4.3k", "label": "Users" }],
  "tags": ["React", "TypeScript", "PostgreSQL"],
  "links": [
    { "label": "Live site", "url": "https://…" },
    { "label": "Source", "url": "https://github.com/…" }
  ]
}
```

The first `links` entry becomes the primary (filled) button in the dialog.

> The sample projects, experience, and stack are placeholders — replace them
> with your own. To use your résumé button, drop `resume.pdf` in `public/`
> (or point `profile.resumeUrl` at any URL).

## Deploying

### Vercel (recommended, zero config)

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Vercel detects Vite
   automatically (`vercel.json` is included for clarity).
3. Every push to `main` triggers a rebuild. Done.

### GitHub Pages (included workflow)

A workflow at `.github/workflows/deploy.yml` builds and deploys on every push to
`main`.

1. Push to GitHub.
2. In **Settings → Pages**, set **Source: GitHub Actions**.
3. Push to `main` — the site publishes at `https://<user>.github.io/<repo>/`.

The workflow sets Vite's `base` to `/<repo>/` for you. If you deploy to a custom
domain or a `user.github.io` repo, no change is needed for Vercel; for a custom
domain on Pages, add a `CNAME` file in `public/`.

## The update loop

```
edit projects.json  →  git commit + push  →  CI rebuilds  →  site is live
```

No component changes required to add work — that's the whole point.
