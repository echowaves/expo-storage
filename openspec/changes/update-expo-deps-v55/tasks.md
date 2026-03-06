## 1. Update package metadata

- [ ] 1.1 Bump `version` in `package.json` from `54.0.9` to `55.0.5`
- [ ] 1.2 Update `peerDependencies` `expo-file-system` range to the SDK 55–compatible range (e.g. `">20.0.0 <21.0.0"`)
- [ ] 1.3 Update `devDependencies` `expo-file-system` to the latest SDK 55–compatible version

## 2. Adapt source code (if needed)

- [ ] 2.1 Review `expo-file-system` SDK 55 changelog for breaking changes to `File`, `Paths`, and their methods
- [ ] 2.2 Update `src/index.ts` imports and API calls if any breaking changes are found
- [ ] 2.3 Update `src/consts.ts` if `Paths.document` API has changed

## 3. Verify build and lint

- [ ] 3.1 Run `npm run build` (`tsc`) and fix any compilation errors
- [ ] 3.2 Run `npm run lint` (`ts-standard`) and fix any lint errors

## 4. Verify tests

- [ ] 4.1 Run `npm test` and ensure all existing tests pass
