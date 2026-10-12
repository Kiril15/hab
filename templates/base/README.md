# Next.js app

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

## Project structure

```
src/
├── app/          routes — each page.tsx only renders a view
├── views/        page content, one folder per route
└── components/
    ├── ui/       reusable primitives
    └── layout/   app shell
```

To add a page, create `src/views/<route>/` with the page component, its metadata and an `index.ts`, then add `src/app/<route>/page.tsx` that renders the view.
