# AGENTS.md

<!-- bmad:context -->
## Rules

- Pin exact dependency versions in `package.json` — no `^` or `~`. Use `npm install --save-exact`.
- Do not add a new dependency unless the user explicitly approves it. Prefer an existing dependency or a built-in API.
- npm is the package manager (`package-lock.json`). Do not introduce yarn, pnpm, or bun lockfiles.
- The package version tracks the Expo SDK major: `57.x` supports SDK 57. An SDK jump is a semver major and bumps `peerDependencies`.
- Keep `typescript` at `5.7.2`: `ts-standard` v12 bundles `@typescript-eslint` v5, which cannot parse TS ≥ 6. Bumping TS requires replacing `ts-standard`.
- Never edit `lib/` — it is `tsc` output and gitignored. Change `src/` and run `npm run build`.

## Pitfalls

- `expo-file-system` deprecated the imperative legacy API (`writeAsStringAsync`, etc.) in favour of the OOP API (`File`, `Directory`, `Paths`). This library uses the OOP API; do not migrate code back to the legacy calls.
<!-- /bmad:context -->
