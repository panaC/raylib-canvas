# AGENTS.md

## Project Intent

This repository is a Node.js package that aims to expose a Canvas-like 2D API backed by raylib-oriented rendering targets. Keep the public API close to the web Canvas API unless a difference is deliberate and documented.

## Architecture

- `src/index.ts` contains the current public API and the first software raster backend.
- `examples/` contains integration examples that should exercise the package as a user would.
- `tests/unit/` contains fast API and encoding tests.
- `tests/e2e/` contains browser-facing integration tests.

## Development Rules

- Build with esbuild.
- Keep the package dependency-light.
- Prefer small, well-tested Canvas API increments over broad unverified surface area.
- Add or update unit tests for API behavior and e2e tests for user-visible rendering behavior.
- Do not replace user changes in the worktree without explicit permission.

## Commands

- `npm run build` builds ESM, CJS, and TypeScript declarations.
- `npm run test:unit` runs unit tests.
- `npm run test:e2e` runs the browser harness.
- `npm test` runs the full test suite.
- `npm run demo:build` bundles the browser demo.
- `npm run demo:serve` serves the demo at `http://127.0.0.1:4173/examples/basic.html`.
