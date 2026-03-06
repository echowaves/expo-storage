## Why

The library currently tracks Expo SDK 54 (`expo-file-system` 19.x, package version `54.0.9`). Expo SDK 55 has been released, and consumers upgrading their apps to SDK 55 need a compatible version of `expo-storage`. Updating now keeps the library current and avoids blocking downstream projects.

## What Changes

- **BREAKING** – Bump `peerDependencies` for `expo-file-system` from `>19.0.0 <20.0.0` to the range compatible with SDK 55 (e.g. `>20.0.0 <21.0.0` or whichever major the new SDK ships).
- Bump `devDependencies` `expo-file-system` to the SDK 55–compatible version.
- Bump package version from `54.0.9` to `55.0.5`.
- Update any source code (`src/index.ts`, `src/consts.ts`) if the `expo-file-system` API surface changes between v19 and the SDK 55 release.
- Update `tsconfig.json` compiler options if required by newer TypeScript or Expo tooling.
- Verify the build (`tsc`) and lint (`ts-standard`) still pass.

## Capabilities

### New Capabilities

_(none – this is a dependency upgrade, not a feature addition)_

### Modified Capabilities

_(no existing specs to modify)_

## Impact

- **package.json** – version, peerDependencies, devDependencies changes.
- **src/index.ts** / **src/consts.ts** – potential API adjustments if `expo-file-system` introduces breaking changes in its `File` / `Paths` exports.
- **Consumers** – this is a **breaking** semver change; users on Expo SDK 54 must stay on the 54.x line of `expo-storage`.
