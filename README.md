# expo-storage

A simple and efficient solution for persistent data storage in Expo/React Native applications, designed to overcome the size limitations of react-native async-storage by utilizing the expo-file-system.

## Features

- No size limitations (unlike AsyncStorage)
- Simple, Promise-based API
- TypeScript support
- Persistent storage across app restarts
- JSON object support through automatic serialization
- Built-in security features
  - Path traversal prevention
  - Safe filename validation
  - Automatic value serialization
  - Directory existence checks
  - Comprehensive error handling

## Requirements

Compatible with Expo SDK 55 through 58. The declared peer ranges are:

- `expo` >=53.0.0 <59.0.0
- `expo-file-system` >=53.0.0 <59.0.0
- React >=16.8.0 <20.0.0
- React Native >=0.60.0 <1.0.0

SDK 53 and 54 ship `expo-file-system` 18.x / 19.x, which is outside that range, so the effective floor is SDK 55 — the earliest SDK whose `expo-file-system` satisfies it. Your Expo SDK also fixes the React and React Native versions (SDK 55 pairs React 19.2.0 with React Native 0.83.4; SDK 58 pairs React 19.3.0 with React Native 0.88.1).

The major version of `expo-storage` tracks the Expo SDK it was built against: `58.x` is built and tested against Expo SDK 58 (`expo-file-system` 58.0.13). Install the major for your SDK line — `55.x` for SDK 55, `57.x` for SDK 57, `58.x` for SDK 58; there is no `56.x` release.

## Installation

Using yarn:
```bash
yarn add expo-storage
```

Using expo:
```bash
expo install expo-storage
```

## Usage

### Importing

```javascript
import { Storage } from 'expo-storage'
```

### API

#### Store Data

```javascript
try {
  await Storage.setItem({
    key: "myKey",
    value: myValue // automatically serialized if not a string
  })
} catch (error) {
  // Handle invalid keys or storage failures
}
```

#### Retrieve Data

```javascript
try {
  const item = await Storage.getItem({ key: "myKey" })
  if (item !== null) {
    const parsedItem = JSON.parse(item)
  }
} catch (error) {
  // Handle invalid keys or read failures
}
```

#### Delete Data

```javascript
try {
  await Storage.removeItem({ key: "myKey" })
} catch (error) {
  // Handle invalid keys or deletion failures
}
```

#### List All Keys

```javascript
try {
  const keys = await Storage.getAllKeys()
} catch (error) {
  // Handle listing failures
}
```

### Security Features

#### Key Validation
- Keys must be non-empty strings
- Only alphanumeric characters, hyphens, underscores, and dots are allowed
- Path traversal attempts are blocked
- Invalid keys throw errors

#### Value Handling
- Automatic serialization of non-string values
- Safe JSON parsing
- Proper error propagation

#### Storage Directory
- Automatic creation of storage directory if needed
- Safe directory operations
- Path sanitization

### Error Handling

All methods may throw errors for:
- Invalid keys (non-alphanumeric or potential path traversal)
- File system operation failures
- Serialization failures for non-string values

Example error handling:
```javascript
try {
  await Storage.setItem({
    key: "user-preferences",
    value: { theme: "dark" }
  })
} catch (error) {
  if (error.message.includes('Invalid storage key')) {
    // Handle invalid key error
  } else {
    // Handle other storage errors
  }
}
```

## Storage Location

Data is stored in the app's document directory using expo-file-system, ensuring:
- Persistence across app restarts
- No size limitations
- Private storage accessible only to your app
- Safe file operations

## Sample Projects

- WiSaw App: [GitHub](https://github.com/echowaves/WiSaw) | [Website](https://www.wisaw.com/)

## License

MIT License - See LICENSE file for details

## Contributing

Issues and pull requests are welcome at the [GitHub repository](https://github.com/echowaves/expo-storage).

<a href="https://app.codacy.com/gh/echowaves/expo-storage/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/d2ae6874e2954c0fbfaca3591bbd7e0c"/></a>