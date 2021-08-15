# expo-storage
Simple way to store persistent data, which does not have size limitations of react-native async-storage

## Usage
### Add to project
```
yarn add expo-storage
```
or
```
expo install expo-storage
```

### Storage
Just like async-storage, expo-storage works with string values and can only store string data, so in order to store object data you need to serialize it first. For data that can be serialized to JSON you can use ```JSON.stringify()``` when saving the data and ```JSON.parse()``` when loading the data.


```JavaScript
import { Storage } from 'expo-storage'
```

To store item:

```JavaScript
   await Storage.setItem({
    key: `${photo.id}`,
    value: JSON.stringify(myJsonObject)
  })
```

To get item:
```JavaScript
  const item = JSON.parse(
    await Storage.getItem({ key: `${item.id}` })
  )
```

To delete a record by key:
```JavaScript
  await Storage.removeItem({ key: `${item.id}` })  
```

To get all keys available in storage:
```JavaScript
  const keys = await Storage.getAllKeys()  
```

## Sample projects
https://github.com/echowaves/WiSaw

https://www.wisaw.com/
