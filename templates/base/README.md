# __PROJECT_NAME__

__PROJECT_DESC__

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Build for production |
| `pnpm start` | Run the production build |
| `pnpm lint` | Check code with Biome |
| `pnpm format` | Format code with Biome |

## Environment

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public site URL, falls back to `__SITE_URL__` |

Copy `.env.example` to `.env.local` to override values locally.

## Project structure

```
src/
├── app/          routes — each page.tsx only renders a view
├── views/        page content, one folder per route
├── components/
│   ├── ui/       reusable primitives
│   └── layout/   app shell
├── consts/       app-wide constants
└── lib/          utilities
```

To add a page, create `src/views/<route>/` with the page component, its metadata and an `index.ts`, then add `src/app/<route>/page.tsx` that renders the view.

## Author

__PROJECT_AUTHOR__
