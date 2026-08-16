## Why

The library currently tracks Expo SDK 55 (`expo-file-system` 55.x, package version `55.0.5`). Expo SDK 57 has been released (with `expo-file-system` 57.0.2), and consumers upgrading their apps to SDK 57 need a compatible version of `expo-storage`. Updating now keeps the library current and avoids blocking downstream projects. This change also aligns `expo-storage` with the sibling project `expo-cached-image` which is already at SDK 57.

## What Changes

- **BREAKING** – Bump `peerDependencies` to match `expo-cached-image`: add `expo`, widen `expo-file-system` to `>=53.0.0 <58.0.0`, add `react` and `react-native`.
- Bump `devDependencies` `expo-file-system` to `57.0.2` (latest SDK 57 version).
- Add `expo`, `react`, `react-native` to `devDependencies` (for type checking, matching sibling project).
- Bump package version from `55.0.5` to `57.0.0`.
- **Remove** `@types/react-native` from `devDependencies` (deprecated since React Native ships its own types).
- Align tooling with `expo-cached-image`: `@typescript-eslint` v5, `eslint` v8, `typescript` 5.7.2.
- Update any source code (`src/index.ts`, `src/consts.ts`) if the `expo-file-system` API surface changes between v55 and v57.
- Verify the build (`tsc`), lint (`ts-standard`), and tests (`jest`) still pass.

## Capabilities

### New Capabilities

_(none – this is a dependency upgrade, not a feature addition)_

### Modified Capabilities

_(no existing specs to modify)_

## Impact

- **package.json** – version, peerDependencies, devDependencies changes (remove @types/react-native, bump expo-file-system and typescript).
- **tsconfig.json** – potential compiler options adjustments for TypeScript 7.x.
- **src/index.ts** / **src/consts.ts** – potential API adjustments if `expo-file-system` introduces breaking changes between v55 and v57.
- **Consumers** – this is a **breaking** semver change; users on Expo SDK 55 must stay on the 55.x line of `expo-storage`.
