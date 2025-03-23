import * as FileSystem from 'expo-file-system'
import * as CONST from './consts'

interface StorageParams {
  key: string;
  value?: any;
}

export const Storage = {
  setItem: async ({ key, value }: StorageParams): Promise<void> => {
    await FileSystem.writeAsStringAsync(`${CONST.DOCUMENT_FOLDER}${key}`, value)
  },
  
  getItem: async ({ key }: StorageParams): Promise<string | null> => {
    try {
      const value = await FileSystem.readAsStringAsync(`${CONST.DOCUMENT_FOLDER}${key}`)
      return value
    } catch (error) {
      return null
    }
  },
  
  removeItem: async ({ key }: StorageParams): Promise<void> => {
    await FileSystem.deleteAsync(
      `${CONST.DOCUMENT_FOLDER}${key}`,
      { idempotent: true } // don't throw an error if there is no file or directory at this URI
    )
  },
  
  getAllKeys: async (): Promise<string[]> => {
    const keys = await FileSystem.readDirectoryAsync(`${CONST.DOCUMENT_FOLDER}`)
    return keys
  },
}

export default Storage