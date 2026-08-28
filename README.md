# WITHdirection

The public website for [WITHdirection](https://withdirection.net) — a Deaf-led sign
language interpreting and accessibility consulting firm in Brooklyn, NY.

Vite + React 18 + React Router 7, styled with Tailwind. Originally exported from
Figma Make.

---

## The one rule

**Nothing exists until it is pushed to GitHub.**

Work has historically arrived here three ways — the Figma Make bot, the GitHub web
editor, and a laptop. Only the first two reached the repository on their own. A file
created locally and never committed is invisible to everyone else, to CI, and to any
deploy: that is how `src/assets/e15166bd…png` went missing and broke the production
build for months without anyone noticing.

If you edit locally, finish with:

```bash
git status        # anything listed here exists only on your machine
git add -A && git commit -m "..." && git push
```

---

## Working from any device

You do not need a particular machine.

| | Good for | Terminal? |
|---|---|---|
| **GitHub Codespaces** | Real work — running tests, the dev server, the build | Yes |
| **github.dev** (press `.` on the repo) | Quick text edits | No |
| **Claude Code on the web** | Delegating a change end to end | n/a |

Codespaces is preconfigured by `.devcontainer/devcontainer.json` — dependencies and
the Chromium browser install themselves on first build, and the dev server port
forwards automatically. Open the repo on GitHub → **Code** → **Codespaces** →
**Create codespace**.

---

## Running it

```bash
npm install     # first time, or after pulling dependency changes
npm run dev     # http://localhost:5173
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build on :4173 |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Unit and guardrail tests (Vitest) |
| `npm run test:watch` | The same, re-running as you edit |
| `npm run test:coverage` | Coverage report |
| `npm run test:e2e` | Browser tests (Playwright, against the production build) |
| `npm run ci` | typecheck + test + build — what CI runs |

Run `npm run ci` before pushing. It is the same sequence GitHub Actions uses, so if
it passes locally the PR should be green.

---

## Tests

Two kinds, in `tests/`.

**Unit tests** (`tests/unit/`) cover behaviour: the contact form intercepts its own
submit, the consent gate loads nothing before a decision, the calendar maths, page
titles.

**Guardrails** (`tests/guardrails/`) are less usual and worth understanding, because
they fail for reasons that are not bugs in the ordinary sense:

| Guardrail | Fails when |
|---|---|
| `no-dead-controls` | A `<button>` has no handler, or a `<form>` no `onSubmit` |
| `links-resolve` | An internal link points at a route that does not exist |
| `content` | Placeholder text ships, or copy breaks `guidelines/Guidelines.md` |
| `services-in-sync` | An enquiry form offers a service the Services page does not describe |

`no-dead-controls` reads the source rather than the rendered page on purpose: React
attaches handlers at the root via event delegation, so a rendered button reports
`onclick === null` whether or not it is wired. The DOM genuinely cannot answer that
question.

If a guardrail fails, the fix is usually to change the code — not the test. Where an
exception is legitimate, `no-dead-controls` honours a `data-inert-control` attribute.

**Browser tests** (`tests/e2e/`) run against the production build, because the dev
server behaves differently in the two places that matter: it bundles the consent gate
differently, and it fakes the SPA fallback a static host must be configured for.

---

## Deploying

The build is a static single-page app. Any static host works, but it **must rewrite
unknown paths to `/index.html`** — React Router uses real URL paths, so without that
rule `/services` returns a 404 from the host when opened directly or refreshed. Both
the dev server and `npm run preview` fake this, which is why the problem only ever
appears in production.

Config for that is already committed:

- `public/_redirects` — Netlify, Cloudflare Pages
- `vercel.json` — Vercel

Connect the host to this repository and let it build on push. That keeps GitHub as
the source of truth and takes every individual machine out of the deploy path.

Build command `npm run build`, publish directory `dist`, Node 22.

---

## Analytics and consent

Nothing that tracks a visitor loads until they opt in. `src/consent.ts` owns that
decision and is the only place Google Analytics, MailerLite or Tally are injected —
do not add a third-party `<script>` tag to `index.html`, or it will load for people
who declined. `tests/e2e/consent.spec.ts` asserts that no such request escapes.

---

## Layout

```
src/
  app/
    components/   Shared UI, used by more than one page
    pages/        One per route
    data/         Content and the logic over it (events, services)
    routes.tsx    The route table — page titles live here too
  consent.ts      Cookie consent gate
  styles/         Tailwind entry and theme
tests/
  unit/           Behaviour
  guardrails/     Whole classes of mistake
  e2e/            Playwright, against the production build
guidelines/       Brand and content style guide — the content guardrail enforces it
```
