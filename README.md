# DevMentor — Frontend

Angular 22 (standalone components, signals, zoneless) client for the DevMentor
platform: AI interviews, timed exams, and verifiable certificates.

## Tech stack

- Angular 22, standalone components (no NgModules)
- Signals for state, `provideZonelessChangeDetection()`
- Reactive Forms
- Plain CSS with design tokens in `src/styles.css` (no CSS framework)
- Google Fonts: Newsreader (display), IBM Plex Sans (UI), IBM Plex Mono (data)

## Prerequisites

- Node.js + npm
- The backend API running (see the backend README)

## Setup

```bash
npm install
```

Set the API URL in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5102/api'
};
```

Run the dev server:

```bash
ng serve
```

Then visit `http://localhost:4200`.

## Routing structure

```
/                          → public Home page (marketing, no auth required)
/auth/login                → login + Google/GitHub buttons
/auth/register             → register + Google/GitHub buttons
/auth/confirm-email        → email confirmation landing (from the emailed link)
/auth/forgot-password      → request a reset link
/auth/reset-password       → set a new password (from the emailed link)
/auth/external-callback    → receives tokens after Google/GitHub sign-in
/verify/:code              → public certificate verification (no auth required)
/app/*                     → everything behind the auth guard:
    /app/dashboard
    /app/exams, /app/exams/:id, /app/exams/:id/result
    /app/interview, /app/interview/:id
    /app/certificates, /app/certificates/:id
    /app/profile
```

`/app` is a single guarded parent route wrapping the sidebar shell
(`layout/shell/shell.component.ts`). Public and protected areas are deliberately
split at the routing level, so a page refresh on a public route never depends on
having a token.

## Folder structure

```
src/app/
  core/
    auth/          → AuthService, JWT interceptor (auto-refresh), auth guard
    models/        → shared auth DTOs
  layout/
    shell/         → sidebar + router-outlet for authenticated pages
  features/
    home/          → public landing page
    auth/          → login, register, confirm-email, forgot/reset password,
                     external-callback, and the shared AuthShellComponent
                     (split-screen layout used by every auth page)
    dashboard/
    exams/
    interview/
    certificates/
    profile/
```

Each feature follows `data-access/` (services + models) + `pages/` (routed
components) + `ui/` (dumb, reusable pieces) where applicable.

## Design system

Tokens are defined once in `src/styles.css` as CSS variables (`--accent`, `--ink`,
`--gold`, `--font-serif`, etc.) and reused everywhere. No component has its own
`styleUrl`; everything shares the global stylesheet on purpose, so the palette and
type scale never drift between pages. If you add a new page, use the existing
classes (`.panel`, `.btn`, `.chip`, `.mono`, ...) before inventing new ones.

## Authentication flow

- **Email/password:** `AuthService.login()` stores `accessToken`, `refreshToken`, and
  `currentUser` in `localStorage`.
- **Google/GitHub:** the login button is a plain `<a>` to the backend's OAuth-start
  endpoint. The backend redirects back to `/auth/external-callback` with the
  tokens as query params, and that page reads them once and stores them the same way.
- **`auth.interceptor.ts`** attaches the access token to every request and
  transparently refreshes it once on a 401 before giving up and logging out.
- **`auth.guard.ts`** protects everything under `/app`.

## Build

```bash
ng build
```
