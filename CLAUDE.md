# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server on port 3000
pnpm build      # Production build
pnpm preview    # Preview production build
pnpm test       # Run tests with Vitest
pnpm lint       # Lint with Biome
pnpm format     # Format with Biome
pnpm check      # Combined lint + format check
```

## Architecture

**Stack:** React 19, TypeScript, TanStack Start (SSR meta-framework built on Vite), TanStack Router (file-based), TanStack Store, Tailwind CSS v4, i18next, Biome, Vitest.

### Routing

File-based routing lives in `src/routes/`. TanStack Router auto-generates `src/routeTree.gen.ts` — never edit this file manually. Nested routes use dot notation (e.g., `workspace.about.tsx`).

The app has two main layouts:
- `routes/index.tsx` — landing page
- `routes/workspace.tsx` — VS Code-like IDE shell (all `workspace.*` routes render inside it)

### Workspace UI Pattern

The portfolio is themed as a VS Code workspace. Components in `src/components/workspace/` implement the IDE chrome:
- `WorkspaceShell.tsx` — top-level layout (activity bar, file tree, tab bar, status bar)
- `TabBar.tsx` / `EditorFrame.tsx` — tab-based navigation
- `CommandPalette.tsx` — Cmd+K search overlay
- `files/` — the "file" content displayed in each editor tab (AboutFile, CareerFile, etc.)

Tab state and command palette open/close are managed via `src/stores/workspace.ts` (TanStack Store). Use the exported helpers: `openFile()`, `closeFile()`, `setPaletteOpen()`.

### i18n

Bilingual (Portuguese default, English secondary). Translations live in `src/i18n/locales/pt.json` and `en.json`. Import `useTranslation` from `react-i18next`; keys follow a flat namespace under `translation`.

### Styling

Tailwind CSS v4 — no `tailwind.config.ts`. Theme tokens are defined via `@theme` blocks in `src/styles.css`. Use Tailwind utility classes; avoid inline styles.

### Code Quality

Biome handles both linting and formatting. Configuration in `biome.json`:
- Double quotes for JS/TS strings
- Tab indentation
- Organize imports automatically
- `routeTree.gen.ts` and `styles.css` are excluded from Biome

### Path Alias

`@/*` maps to `./src/*` — use this for all internal imports.
