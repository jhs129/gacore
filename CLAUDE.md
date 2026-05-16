# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Start dev server at http://localhost:3000
pnpm build            # Production build
pnpm lint             # ESLint (extends next/core-web-vitals)
pnpm storybook        # Start Storybook at http://localhost:6006
pnpm build-storybook  # Build static Storybook
```

Tests run through Storybook + Vitest (browser mode via Playwright/Chromium). There is no separate test runner command — tests are attached to stories via `@storybook/addon-vitest`.

## Architecture Overview

This is a **Next.js 14 + Builder.io headless CMS** application for the Georgia Cancer Oncology (GACORE) platform. The key architectural concept is that **all page content is managed through Builder.io** — components are built in this repo, registered with Builder, then assembled into pages via the Builder visual editor.

### Page Rendering Flow

- `pages/[...page].jsx` is the catch-all route that renders all Builder.io-managed pages via `<BuilderComponent>` with ISR (5-second revalidation).
- `pages/index.jsx` is the home page, also Builder.io driven.
- `app/api/graphql/route.ts` exposes a GraphQL API backed by Builder.io content (Apollo Server).
- The `pages/` router is primary; `app/` is used only for the GraphQL route.

### Component Registration Pattern

Every Builder.io-integrated component follows a two-file pattern inside `components/ui/<ComponentName>/`:

- `index.tsx` — the React component
- `registration.ts` — registers the component with Builder.io, defining its editable inputs (prop names, types, default values, helper text)

`builder-registry.js` at the root imports all `registration.ts` files and is imported by `_app.jsx` to register everything at startup. When adding a new component, create both files and import the registration in `builder-registry.js`.

### Component File Split Rule

When a component exceeds ~100 lines or needs sub-components/helpers, split into a directory:
```
components/ui/MyComponent/
  index.tsx          # Primary component + Props interface
  MySubComponent.tsx # Sub-components
  helpers.ts         # Utilities
  MyComponent.stories.tsx  # Storybook story (colocated)
```

### Storybook Stories

Stories are **colocated with their components** (e.g., `components/ui/EventCardVertical/EventCardVertical.stories.tsx`). The `.storybook/main.js` globs both `../components/**` and `../stories/**` for story discovery. The `stories/` directory at root contains only Storybook template boilerplate.

### TypeScript / Storybook

- `tsconfig.json` excludes `**/*.stories.ts` and `**/*.stories.tsx` — colocated story files depend on `@storybook/react` which is not in the Next.js build.

### Styling

- **Tailwind CSS** with custom breakpoints: `sm=480px`, `md=640px`, `lg=992px`
- **CSS custom properties** in `styles/globals.css` define the design token palette (primary, secondary, accent colors). These variables are also exposed to the Builder.io editor via `builder-registry.js`.
- **Custom fonts**: PT Serif (primary/serif), Open Sans (secondary/sans) from Google Fonts. Lufga, Gilroy, Aspira are loaded locally from `/public/fonts/`.
- Tailwind brand colors: `brand-green: #58784d`, `ink: #302f2e`

### Algolia Search

`ClinicalTrialSearch` and `ProviderSearch` use `algoliasearch` + `react-instantsearch`. The Algolia App ID and keys are expected as environment variables.

### Key Environment Variables

- `NEXT_PUBLIC_BUILDER_API_KEY` — Builder.io public API key (already in `.env`)

### Image Handling

- Use `next/image` or `next-cloudinary` for images.
- Configured remote image domains: `cdn.builder.io`, `orlandohealth.com`.
- Placeholder images must use `.png` extension (e.g., `https://placehold.co/300x200.png`).
- Do not use `Math.random()` in component render paths — it causes hydration mismatches.
- `next/image` patterns by use case:
  - Full-cover backgrounds: `<Image fill sizes="100vw" />` (parent must have `relative` + defined height)
  - Fixed icons/logos: `<Image width={N} height={N} />` with explicit px dimensions
  - Fluid/percentage-width: `<Image width={0} height={0} sizes="..." />` + `w-full h-auto` class
  - Dynamic third-party URLs (e.g. Algolia): add `unoptimized` prop
