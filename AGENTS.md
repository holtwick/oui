# AGENTS.md

## Dev environment tips

- Use `pnpm install` to install dependencies.
- Run `pnpm build` to build the library (runs `vite build` with TypeScript compilation and bundling).
- Check `package.json` for available scripts.
- Read JSDoc comments in source files (`lib/**/*.ts`) for inline API documentation and usage examples.
- Read Markdown documentation files (e.g., `src/**/*.md`) for additional guides and examples.
- Run and examine demo files (`src/**/*.demo.vue`) to understand component usage and examples.
- Run and examine test specs (`lib/**/*.spec.ts`) to understand functionality, expected behavior, and integration patterns.
- Check `README.md` for project overview, architecture, and usage patterns.

## Testing instructions

- Run `pnpm test --run` to run all tests with Vitest.
- Run `pnpm test --coverage` to check test coverage.
- Run `pnpm lint` to check linting with ESLint.
- Run `pnpm lint:fix` to auto-fix linting issues.
- Fix any test or type errors until the whole suite is green.
- Add or update tests for the code you change, even if nobody asked.

## PR instructions

- Title format: [oui] <Title>
- Always run `pnpm lint:fix` and `pnpm test --run` before committing.
