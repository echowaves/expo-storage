# expo-storage

A simple and efficient solution for persistent data storage in Expo/React Native applications, designed to overcome the size limitations of react-native async-storage by utilizing the expo-file-system.

## Features

- No size limitations (unlike AsyncStorage)
- Simple, Promise-based API
- TypeScript support
- Persistent storage across app restarts
- JSON object support through serialization
- Minimal dependencies

## Requirements

- Expo SDK 18 or newer
- React 18.2.0 or newer
- React Native 0.74.3 or newer
- expo-file-system

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
await Storage.setItem({
  key: "myKey",
  value: JSON.stringify(myJsonObject)
})
```

#### Retrieve Data

```javascript
const item = await Storage.getItem({ key: "myKey" })
const parsedItem = JSON.parse(item)
```

#### Delete Data

```javascript
await Storage.removeItem({ key: "myKey" })
```

#### List All Keys

```javascript
const keys = await Storage.getAllKeys()
```

### Working with Objects

The storage works with string values only. To store objects or arrays:

1. Serialize when storing:
```javascript
await Storage.setItem({
  key: "user",
  value: JSON.stringify({ name: "John", age: 30 })
})
```

2. Deserialize when retrieving:
```javascript
const userString = await Storage.getItem({ key: "user" })
const user = userString ? JSON.parse(userString) : null
```

## Storage Location

Data is stored in the app's document directory using expo-file-system, ensuring:
- Persistence across app restarts
- No size limitations
- Private storage accessible only to your app

## Error Handling

- `getItem` returns `null` if the key doesn't exist
- `removeItem` is idempotent (won't throw if the key doesn't exist)
- All methods return Promises and should be used with async/await or .then()

## Sample Projects

- WiSaw App: [GitHub](https://github.com/echowaves/WiSaw) | [Website](https://www.wisaw.com/)

## License

MIT License - See LICENSE file for details

## Contributing

Issues and pull requests are welcome at the [GitHub repository](https://github.com/echowaves/expo-storage).
