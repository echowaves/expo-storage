# expo-storage

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/519297b08add48e6b9e4c6323a241289)](https://app.codacy.com/gh/echowaves/expo-storage?utm_source=github.com&utm_medium=referral&utm_content=echowaves/expo-storage&utm_campaign=Badge_Grade)

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

- Expo SDK 54 or newer
- React 19.0.0 or newer
- React Native 0.81.0 or newer
- expo-file-system 19.0.0 or newer

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
