# API — Next.js project generator

NestJS service that generates a ready-to-run Next.js project from a template and returns it as a zip archive. The client describes the project (package metadata, dependencies, pages, color theme, fonts), and the API assembles the files, validates every input, and streams the archive back.

## Stack

- NestJS 12, TypeScript
- `class-validator` / `class-transformer` for request validation
- `archiver` for streaming zip generation
- Biome for linting and formatting
- Part of a pnpm + Turborepo monorepo

## Getting started

```bash
# from the monorepo root
pnpm install
pnpm --filter api dev
```

Create `apps/api/.env.local`:

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the API listens on | `8800` |
| `CLIENT_URL` | Comma-separated list of origins allowed by CORS | `http://localhost:3000` |

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start in watch mode |
| `pnpm build` | Compile to `dist/` |
| `pnpm start:prod` | Run the compiled build |
| `pnpm start:debug` | Start with the debugger attached |

## API

### `POST /generator/project/generate`

Returns `application/zip` with the generated project.

```json
{
  "packageJson": {
    "projectName": "my-app",
    "projectDesc": "Landing page",
    "author": "John Doe",
    "dependencies": [{ "name": "zod", "version": "^4.1.0" }],
    "devDependencies": [{ "name": "@types/node", "version": "^24.0.0" }]
  },
  "pages": ["about-us", "contact"],
  "theme": {
    "background": "#ffffff",
    "foreground": "#171717",
    "primary": "#2563eb",
    "primaryForeground": "#ffffff",
    "secondary": "#f1f5f9",
    "secondaryForeground": "#0f172a",
    "muted": "#f4f4f5",
    "mutedForeground": "#71717a",
    "accent": "#f59e0b",
    "border": "#e4e4e7",
    "destructive": "#dc2626"
  },
  "fonts": {
    "primary": { "family": "Inter", "style": "normal", "subset": "latin" },
    "secondary": { "family": "Lobster", "style": "normal", "subset": "latin" }
  }
}
```

```bash
curl -f -X POST http://localhost:8800/generator/project/generate \
  -H "Content-Type: application/json" \
  -d @request.json \
  -o my-app.zip
```

Invalid input is rejected with `400` before any file is generated, for example:

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": ["fonts.primary.family \"Lobster\" is not available with style \"italic\" and subset \"latin\""]
}
```

### `GET /health/check`

Liveness check.

## What gets generated

| Input | Result in the archive |
|---|---|
| `packageJson` | `package.json` with name, description, author and merged dependencies |
| `pages` | `src/app/<page>/page.tsx` plus `src/views/<page>/` (component, metadata, `index.ts`) |
| `theme` | `src/app/globals.css` with CSS variables exposed to Tailwind (`bg-primary`, `text-muted-foreground`, ...) |
| `fonts` | `src/app/layout.tsx` with `next/font/google` loaders; `--font-sans` and `--font-heading` in Tailwind |

Everything else is copied as-is from `templates/base`.

## Architecture

```
src/
├── modules/
│   ├── generator/      orchestration: DTOs, builders, zip assembly
│   │   └── builders/   one builder per generated file group
│   ├── templates/      reading and rendering template files
│   ├── fonts/          Google Fonts registry and validation
│   └── health/
└── shared/
    ├── consts/         template paths, ignore list
    ├── helpers/        code stubs for generated files
    └── utils/          pure, domain-agnostic functions
```

**Request flow**

1. `ValidationPipe` validates the whole request against the DTOs. Unknown fields are rejected (`forbidNonWhitelisted`).
2. `GeneratorService` runs all builders in parallel. Each builder implements `ProjectFileBuilder` and returns a list of `{ name, content }` entries.
3. The template directory is added to the archive, excluding files listed in `TEMPLATE_IGNORE` (build artifacts and files produced by builders).
4. Builder output is appended and the archive is streamed to the client via `StreamableFile`. Nothing is written to disk.

**Adding a new generated file**

1. Create a builder in `modules/generator/builders` implementing `ProjectFileBuilder`.
2. Register it in `GeneratorModule` providers and in the `builders` list of `GeneratorService`.
3. If it replaces a template file, add that path to `TEMPLATE_IGNORE`.

## Template placeholders

Builders render template files by replacing placeholders:

| File | Placeholders |
|---|---|
| `package.json` | `__PROJECT_NAME__`, `__PROJECT_DESC__`, `__PROJECT_AUTHOR__` |
| `src/app/globals.css` | `__COLOR_<NAME>__`, e.g. `__COLOR_PRIMARY_FOREGROUND__` |
| `src/app/layout.tsx` | `"__FONT_IMPORTS__"`, `"__FONT_DECLARATIONS__"`, `__FONT_VARIABLES__` |

## Fonts

Font data lives in the shared `@repo/fonts` package (`packages/fonts`), which both the API and the web app use. The list is copied from `next/font` in the template and must match the Next.js version used by `templates/base`; otherwise a font could pass validation and still fail to build in the generated project.

After upgrading `next` in the template:

```bash
pnpm --filter @repo/fonts fonts:sync
```

The data is loaded once and looked up by key, so validation does not scan the list per request.
