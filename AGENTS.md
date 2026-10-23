# Repository Guidelines

## Project Structure & Module Organization

This is a static personal profile page built with TypeScript and Vite, without a UI framework.

- `src/data.ts`: profile content, contacts, and theme settings; start here for content changes.
- `src/types.ts`, `src/render.ts`, and `src/platforms.ts`: data contracts, HTML rendering, and platform metadata.
- `src/env.ts`: build-time overrides read by `vite.config.ts`; `TITLE` sets the page title, `ICP` sets the footer registration number, `CONTACTS` (JSON array) replaces `contacts`.
- `src/main.ts`: browser entry; binds layout from `masonry.ts` and clipboard interactions from `copy.ts`.
- `src/style.css`, `src/lace.ts`, and `public/`: styles, decorative graphics, and static assets.
- `vite.config.ts` and `plugins/`: prerendering, font trimming, and entry script/style inlining.
- `dist/`: ignored build output; do not edit directly. No test directory currently exists.

## Build, Test, and Development Commands

- `npm ci`: install dependencies from `package-lock.json`.
- `npm run dev`: start the development server.
- `npm run build`: run `tsc --noEmit`, then generate `dist/` with Vite.
- `npm run preview`: serve the existing production build; build first.
- `npm run format`: format supported project files with Prettier.
- `npm run format:check`: check formatting without writing files.

Page content is prerendered; browser code handles interactions. Verify production output when changing rendering or plugins.

## Coding Style & Naming Conventions

Use four-space indentation, single-quoted TypeScript strings, no statement-ending semicolons, and `import type` for types. Use camelCase for functions and variables, PascalCase for types, and lowercase or kebab-case filenames. Follow existing CSS names such as `card__title` and `card--about`.

Preserve strict typing and avoid unused declarations. Follow `.editorconfig` and `.prettierrc.json`; run `npm run format:check` before submitting changes. Dependencies, build output, and browser artifacts are excluded in `.prettierignore`. No ESLint configuration exists. Unless requested otherwise, write human-facing documentation and comments in Chinese and agent-facing instructions in English.

## Testing Guidelines

No automated test framework, test script, or coverage threshold is configured. After code changes, run `npm run build` and manually check:

- Desktop/mobile layouts, long text, and empty-section hiding.
- Default theme, `?theme=mint`, and `?theme=sky`.
- Clipboard actions, status feedback, avatars, and fonts.

For asset or inlining changes, check subdirectory hosting and direct opening of `dist/index.html`; font fallback is expected locally. Document commands and naming conventions when adding tests.

## Commit & Pull Request Guidelines

Do not commit or push unless explicitly requested. When requested, use Conventional Commits (`type(scope): description`, optional scope), with a brief subject and any details after a blank line.

PRs should describe purpose, scope, validation, and related issues. Include desktop/mobile screenshots for visual changes. Exclude generated output and temporary artifacts.

## Configuration & Content Safety

Profile data becomes public: never include secrets. Escape interpolated text with `esc()`. Preserve relative asset paths and `base: './'`. Build-time env overrides are read by `vite.config.ts` via `loadEnv`: `TITLE` is optional and falls back to `<name>的扩列条`; `ICP` is optional and hides the footer link when unset; `CONTACTS` is parsed and validated as a JSON array.
