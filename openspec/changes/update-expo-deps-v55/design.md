## Context

`expo-storage` v54.0.9 wraps `expo-file-system` v19.x (Expo SDK 54). The library uses `File` and `Paths` from `expo-file-system` for all storage operations. Expo SDK 55 has been released, and downstream consumers need a compatible `expo-storage` release.

Current dependency surface:
- `import { File, Paths } from 'expo-file-system'` in `src/index.ts`
- `import { Paths } from 'expo-file-system'` in `src/consts.ts`
- APIs used: `Paths.document`, `File` constructor, `file.write()`, `file.text()`, `file.delete()`, `file.exists`, `file.name`, `dir.list()`, `dir.exists`, `dir.create()`

## Goals / Non-Goals

**Goals:**
- Update `expo-file-system` peer and dev dependency to the SDK 55–compatible version
- Bump package version to `55.0.5`
- Adapt source code to any breaking API changes in the new `expo-file-system`
- Ensure `tsc` build and `ts-standard` lint pass cleanly

**Non-Goals:**
- Adding new Storage API methods or features
- Changing the public API surface of `expo-storage`
- Supporting both SDK 54 and SDK 55 simultaneously in one release

## Decisions

1. **Version the package as `55.0.5`**
   - Rationale: aligns the major version with the Expo SDK major, which is the existing convention (`54.x` → SDK 54). The user explicitly requested `55.0.5`.

2. **Update `peerDependencies` range to match SDK 55 `expo-file-system` major**
   - If SDK 55 ships `expo-file-system` 20.x → `">20.0.0 <21.0.0"` (or appropriate range).
   - If the major doesn't change, adjust the range to the compatible minor/patch floor.
   - Rationale: peer dependency range must match what SDK 55 apps will resolve.

3. **Update `devDependencies` to the specific SDK 55–compatible version**
   - Pin the dev version to the latest patch of the new major so CI reproduces the same build.

4. **Adapt imports/API calls only if the new `expo-file-system` introduces breaking changes**
   - Check the `expo-file-system` changelog / release notes for SDK 55.
   - If `File`, `Paths`, and their methods remain the same, no source changes are needed.
   - If APIs are renamed or restructured, update `src/index.ts` and `src/consts.ts` accordingly.

5. **Keep TypeScript and other devDependencies at current versions unless they block the build**
   - Rationale: minimise scope; only change what's necessary for the SDK 55 upgrade.

## Risks / Trade-offs

- **`expo-file-system` API breakage** → Mitigated by reviewing changelogs before updating; adapt source code in the same PR.
- **Downstream breakage for SDK 54 users** → Mitigated by semver major bump (54.x → 55.x); document in README that 55.x requires Expo SDK 55.
- **Untested edge cases** → Mitigated by running existing Jest tests and verifying the build. Manual testing in an Expo 55 app is recommended but out of scope for this change.
