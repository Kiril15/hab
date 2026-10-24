@AGENTS.md

# __PROJECT_NAME__

__PROJECT_DESC__

## Stack

- Next.js (App Router) + React, TypeScript
- Tailwind CSS v4
- Biome for linting and formatting — do not add ESLint or Prettier
- pnpm as the package manager

## Commands

- `pnpm dev` — dev server
- `pnpm build` — production build
- `pnpm lint` — Biome check
- `pnpm format` — Biome format

## Structure

```
src/
├── app/<route>/page.tsx      routing only
├── views/<route>/            page content
│   ├── <Name>Page.tsx        the page component
│   ├── <route>.metadata.tsx  Next.js metadata for the route
│   └── index.ts              re-exports the component (default) and metadata
├── components/
│   ├── ui/                   reusable primitives (buttons, inputs, ...)
│   └── layout/               app shell (header, footer, ...)
├── consts/                   app-wide constants (SITE_NAME, ...)
└── lib/                      utilities (cn, ...)
```

## Conventions

- `app/<route>/page.tsx` contains no markup or logic: it imports the view from `@/views/<route>`, re-exports `metadata`, and renders the view.
- All page markup and logic live in `src/views/<route>/`.
- Every folder under `components/`, `consts/` and `lib/` exposes its public API through `index.ts`; import from the folder, not from individual files.
- Constants live in `src/consts/<topic>.const.ts`; do not hardcode the site name or other shared values in components.
- Read the site URL from `SITE_URL` in `@/consts`, not from `process.env.NEXT_PUBLIC_SITE_URL` directly.
- Use the `@/` alias for imports from `src/` instead of long relative paths.
- Route folder names are kebab-case (`about-us`); component names are PascalCase with a `Page` suffix (`AboutUsPage`).
