# AGENTS.md

## Project

Static landing page for **Ultra Structura**, based on a Next.js + Tailwind starter.

Stack: Next.js 14 (Pages Router), React 18, TypeScript (strict), Tailwind CSS 3, PostCSS, styled-jsx, next-seo. Static export (`output: 'export'`) to `out/`. Deploy: GitHub Pages via Actions (`GITHUB_PAGES=true` sets `basePath` to `/ultra_structura`).

## Commands

- `npm install` — install deps
- `npm run dev` — local dev (http://localhost:3000)
- `npm run build` / `npm run build-prod` — production build (`build-prod` cleans then builds)
- `npm run start` — serve production build
- `npm run lint` / `npm run format` — ESLint (+ Prettier for json/yaml)
- `npm run check-types` — `tsc --noEmit`
- `npm run build-stats` — bundle analyzer (`ANALYZE=true`)

## Structure

```
src/
  pages/          # Next.js pages (_app, _document, index)
  templates/      # Page sections composed into Base.tsx
  */              # Atomic UI (button, hero, layout, navigation, footer, …)
  styles/         # global.css (Tailwind)
  utils/AppConfig.ts
public/assets/images/
```

Composition: `pages/index.tsx` → `templates/Base.tsx` → section templates → atomic components.

Path aliases: `@/*` → `src/*`, `@/public/*` → `public/*`.

## Conventions

- Named exports for components (`export { Button }`), default export only for Next pages/`_app`.
- Prefer `import type` for type-only imports (ESLint enforces this).
- Sort imports with `simple-import-sort`.
- Styling: Tailwind utility classes; component-scoped styles via `styled-jsx` + `@apply` when needed (see `button/Button.tsx`).
- Theme colors: `primary.*` and `gray.*` in `tailwind.config.js`.
- Site metadata lives in `src/utils/AppConfig.ts`; SEO via `layout/Meta.tsx` + next-seo.
- Do not use `next/image` for SSG/static export (ESLint disables `@next/next/no-img-element`).
- `trailingSlash: true` in `next.config.js`; respect `router.basePath` for public assets.
- Pre-commit: Husky + lint-staged (eslint --fix, typecheck, prettier on json).

## Where to change what

| Goal | Files |
|------|--------|
| Brand / title / locale | `src/utils/AppConfig.ts`, `templates/Logo.tsx` |
| Page sections order | `src/templates/Base.tsx` |
| Hero / nav / CTA copy | `src/templates/Hero.tsx`, `Banner.tsx`, … |
| Global CSS | `src/styles/global.css` |
| Colors / type scale | `tailwind.config.js` |
| Favicons | `public/favicon*.png`, `public/apple-touch-icon.png` |
| Deploy | GitHub Pages Action; `GITHUB_PAGES=true` for `basePath` |

## Agent guidelines

- Keep the atomic → template → page layering; put reusable UI in atomic folders, page-specific composition in `templates/`.
- Match existing patterns: functional components, TypeScript props as `type I*Props`, `classnames` when combining classes.
- Run `npm run check-types` and `npm run lint` after non-trivial edits.
- Do not add App Router (`app/`) unless explicitly requested — this project uses Pages Router.
- Prefer minimal diffs; do not rewrite the starter into a different stack.
