## 1. Update package metadata

- [x] 1.1 Bump `version` in `package.json` from `55.0.5` to `57.0.0`
- [x] 1.2 Update `peerDependencies` `expo-file-system` from `">55.0.0 <56.0.0"` to `">57.0.0 <58.0.0"`
- [x] 1.3 Update `devDependencies` `expo-file-system` from `55.0.10` to `57.0.2`
- [x] 1.4 Remove `@types/react-native` from `devDependencies`
- [x] 1.5 Bump `typescript` in `devDependencies` from `5.7.2` to `7.0.2`

## 2. Update TypeScript configuration

- [x] 2.1 Review `tsconfig.json` for any compiler options deprecated or changed in TypeScript 7.x
- [x] 2.2 Update `tsconfig.json` if needed (e.g., `target`, `lib`, `moduleResolution`)

## 3. Adapt source code (if needed)

- [x] 3.1 Review `expo-file-system` SDK 57 changelog for breaking changes to `File`, `Paths`, and `Directory` APIs
- [x] 3.2 Update `src/index.ts` imports and API calls if any breaking changes are found
- [x] 3.3 Update `src/consts.ts` if `Paths.document` API has changed

## 4. Verify build and lint

- [x] 4.1 Run `npm run build` (`tsc`) and fix any compilation errors
- [x] 4.2 Run `npm run lint` (`ts-standard`) and fix any lint errors

## 5. Verify tests

- [x] 5.1 Run `npm test` and ensure all existing tests pass
