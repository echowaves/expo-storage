# Deferred Work

- source_plan: `_bmad-output/plan-upgrade-expo-sdk-58.md`
  summary: Expo SDK 58's Metro tooling wants TypeScript >=5.8 while the repo pins typescript at 5.7.2, so `npm ls` reports an invalid peer in the dev tree.
  evidence: Real, verified. `node_modules/expo/node_modules/2g/package.json` (also under `@expo/metro-config` and `@expo/metro-file-map`) declares `peerDependencies.typescript: ">=5.8.0"`; `npm ls --all` prints `typescript@5.7.2 deduped invalid: ">=5.8.0" from node_modules/expo/node_modules/2g, ...`. Install does not fail and `tsc`, `ts-standard` and `jest` are green, because this library compiles with `tsc` directly rather than through Metro. Fixing it means raising TypeScript above the pin that `AGENTS.md` declares ("Keep `typescript` at `5.7.2`"), which is a rules change plus a human decision: settle it by confirming `ts-standard@12` / `@typescript-eslint@5` behave correctly on the newest 5.x (their official support ceiling is lower, so expect support warnings) and amending the `AGENTS.md` rule in the same change.

- source_plan: `_bmad-output/plan-upgrade-expo-sdk-58.md`
  summary: The `>=53.0.0` peer floor on `expo` and `expo-file-system` can never be met below `expo-file-system` 55 and could be narrowed to state the real support floor.
  evidence: Real, verified. `npm view expo-file-system versions` has no 53.x or 54.x releases (19.x is followed by 55.0.0), and `bundledNativeModules.json` shows SDK 53 pinning `expo-file-system ~18.1.11` and SDK 54 `~19.0.24`. So the floor already excludes SDK 53/54 consumers today; narrowing it to `>=55.0.0` changes no resolution outcome and only makes the manifest honest. Left alone here because a published package's declared compatibility is the owner's call, and this change widened ceilings only.
