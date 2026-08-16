## ADDED Requirements

### Requirement: SDK 57 dependency compatibility
The package SHALL declare `expo-file-system` peer dependency compatible with Expo SDK 57 and SHALL NOT accept `expo-file-system` versions from SDK 55 or earlier.

#### Scenario: Peer dependency resolves in an Expo SDK 57 project
- **WHEN** a consumer installs `expo-storage@57.0.0` in an Expo SDK 57 project
- **THEN** the `expo-file-system` peer dependency range SHALL be satisfied by the SDK 57 version of `expo-file-system`

#### Scenario: Peer dependency conflict in an Expo SDK 55 project
- **WHEN** a consumer attempts to install `expo-storage@57.0.0` in an Expo SDK 55 project
- **THEN** npm SHALL report a peer dependency conflict because the `expo-file-system` version does not match

### Requirement: Storage API backward compatibility
The `Storage` object SHALL continue to expose `setItem`, `getItem`, `removeItem`, and `getAllKeys` with the same signatures and behavior after the dependency upgrade.

#### Scenario: Read-write round-trip after upgrade
- **WHEN** a consumer calls `Storage.setItem({ key: 'test', value: 'hello' })` followed by `Storage.getItem({ key: 'test' })`
- **THEN** the returned value SHALL be `'hello'`

#### Scenario: Build succeeds with TypeScript 7.x
- **WHEN** `npm run build` is executed with TypeScript 7.0.2
- **THEN** TypeScript compilation SHALL complete without errors

### Requirement: Deprecated dependencies removed
The package SHALL NOT include `@types/react-native` as a dependency, since React Native now ships its own type definitions.

#### Scenario: No @types/react-native in devDependencies
- **WHEN** a consumer inspects `package.json` devDependencies
- **THEN** `@types/react-native` SHALL NOT be present
