## Context

`expo-storage` v55.0.5 wraps `expo-file-system` 55.x (Expo SDK 55). The library uses `File` and `Paths` from `expo-file-system` for all storage operations. Expo SDK 57 has been released (`expo-file-system` 57.0.2), and downstream consumers need a compatible `expo-storage` release.

Current dependency surface:
- `import { File, Paths } from 'expo-file-system'` in `src/index.ts`
- `import { Paths } from 'expo-file-system'` in `src/consts.ts`
- APIs used: `Paths.document`, `File` constructor, `file.write()`, `file.text()`, `file.delete()`, `file.exists`, `file.name`, `dir.list()`, `dir.exists`, `dir.create()`

## Goals / Non-Goals

**Goals:**
- Update `expo-file-system` peer and dev dependency to SDK 57 (57.0.2)
- Bump package version to `57.0.0`
- Remove deprecated `@types/react-native` devDependency
- Bump TypeScript from 5.7.2 to 7.0.2
- Adapt source code to any breaking API changes in the new `expo-file-system`
- Ensure `tsc` build and `ts-standard` lint pass cleanly

**Non-Goals:**
- Adding new Storage API methods or features
- Changing the public API surface of `expo-storage`
- Supporting both SDK 55 and SDK 57 simultaneously in one release
- Updating ESLint or other tooling beyond what's required for the build

## Decisions

1. **Version the package as `57.0.0`**
   - Rationale: aligns the major version with the Expo SDK major, which is the existing convention (`55.x` → SDK 55). Starting at `.0.0` since this is a fresh SDK jump (skipping SDK 56).

2. **Update `peerDependencies` range to `>57.0.0 <58.0.0`**
   - SDK 57 ships `expo-file-system` 57.x. This range matches the pattern used for SDK 55 (`>55.0.0 <56.0.0`).

3. **Pin `devDependencies` `expo-file-system` to `57.0.2`**
   - This is the latest available SDK 57 version as of the proposal date.

4. **Remove `@types/react-native` entirely**
   - Rationale: the package is deprecated; React Native has shipped its own type definitions for multiple versions. This dependency adds no value and may cause type conflicts.

5. **Keep TypeScript at `5.7.2`, aligned with `expo-cached-image`**
   - Rationale: TypeScript 7.x is incompatible with `ts-standard` v12 (which bundles `@typescript-eslint` that doesn't support TS 7). The sibling project `expo-cached-image` uses TS 5.7.2 with `@typescript-eslint` v5, and this keeps both projects consistent. Upgrading to TS 7 would require migrating away from `ts-standard` entirely.

6. **Align linting tooling with `expo-cached-image`**
   - Use `@typescript-eslint` v5, `eslint` v8, `ts-standard` v12 — matching the sibling project for consistency across the org.

6. **Adapt imports/API calls only if the new `expo-file-system` introduces breaking changes**
   - The OOP API (`File`, `Directory`, `Paths`) has been stable since its introduction. The imperative legacy API (`writeAsStringAsync`, etc.) is now deprecated in favor of the OOP API — but we already use the OOP API, so we're on the right side of this migration.
   - Key observation: `Directory.create()` may have changed from async (`Promise<void>`) to sync (`void`). The `await` in current code is harmless on a non-Promise, so no source change needed there.

7. **Keep TypeScript and other devDependencies at current versions unless they block the build**
   - Rationale: minimise scope; only change what's necessary for the SDK 57 upgrade. Exception: TypeScript and `@types/react-native` are explicitly being bumped as part of this change per user request.

## Risks / Trade-offs

- **`expo-file-system` API breakage** → Mitigated by reviewing the SDK 57 API docs; the OOP API (`File`/`Directory`/`Paths`) is stable. The library only uses a subset of well-established methods.
- **TypeScript 7.x breaking changes** → TS 6→7 is a major jump from 5.7. Check `tsconfig.json` for deprecated compiler options (e.g., `esModuleInterop` behavior, module resolution changes). Mitigated by running `tsc` and fixing any errors.
- **Downstream breakage for SDK 55 users** → Mitigated by semver major bump (55.x → 57.x); users on SDK 55 stay on 55.x line.
- **Untested edge cases** → Mitigated by running existing Jest tests and verifying the build. Manual testing in an Expo 57 app is recommended but out of scope for this change.
