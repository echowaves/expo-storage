## ADDED Requirements

### Requirement: SDK 55 dependency compatibility
The package SHALL declare `expo-file-system` peer dependency compatible with Expo SDK 55 and SHALL NOT accept `expo-file-system` versions from SDK 54 or earlier.

#### Scenario: Peer dependency resolves in an Expo SDK 55 project
- **WHEN** a consumer installs `expo-storage@55.0.5` in an Expo SDK 55 project
- **THEN** the `expo-file-system` peer dependency range SHALL be satisfied by the SDK 55 version of `expo-file-system`

#### Scenario: Peer dependency conflict in an Expo SDK 54 project
- **WHEN** a consumer attempts to install `expo-storage@55.0.5` in an Expo SDK 54 project
- **THEN** npm SHALL report a peer dependency conflict because the `expo-file-system` version does not match

### Requirement: Storage API backward compatibility
The `Storage` object SHALL continue to expose `setItem`, `getItem`, `removeItem`, and `getAllKeys` with the same signatures and behavior after the dependency upgrade.

#### Scenario: Read-write round-trip after upgrade
- **WHEN** a consumer calls `Storage.setItem({ key: 'test', value: 'hello' })` followed by `Storage.getItem({ key: 'test' })`
- **THEN** the returned value SHALL be `'hello'`

#### Scenario: Build succeeds
- **WHEN** `npm run build` is executed
- **THEN** TypeScript compilation SHALL complete without errors
