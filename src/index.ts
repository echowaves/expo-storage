import * as FileSystem from 'expo-file-system'
import * as CONST from './consts'

interface StorageParams {
  key: string;
  value?: any;
}

const isValidKey = (key: string): boolean => {
  // Prevent path traversal and ensure safe filenames
  const safeKeyRegex = /^[a-zA-Z0-9-_\.]+$/
  return Boolean(key) && safeKeyRegex.test(key)
}

const serializeValue = (value: any): string => {
  try {
    return typeof value === 'string' ? value : JSON.stringify(value)
  } catch {
    throw new Error('Unable to serialize value')
  }
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message
  return String(error)
}

const isFileNotFoundError = (error: unknown): boolean => {
  return error instanceof Error && 'code' in error && error.code === 'ENOENT'
}

const ensureStorageDirectoryExists = async (): Promise<void> => {
  const dirInfo = await FileSystem.getInfoAsync(CONST.DOCUMENT_FOLDER)
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(CONST.DOCUMENT_FOLDER, { intermediates: true })
  }
}

export const Storage = {
  setItem: async ({ key, value }: StorageParams): Promise<void> => {
    if (!isValidKey(key)) {
      throw new Error(`Invalid storage key ${key}`)
    }
    await ensureStorageDirectoryExists()
    const serializedValue = serializeValue(value)
    
    try {
      await FileSystem.writeAsStringAsync(`${CONST.DOCUMENT_FOLDER}${key}`, serializedValue)
    } catch (error) {
      throw new Error(`Failed to write to storage: ${getErrorMessage(error)}`)
    }
  },
  
  getItem: async ({ key }: StorageParams): Promise<string | null> => {
    if (!isValidKey(key)) {
      throw new Error(`Invalid storage key ${key}`)
    }

    try {      
      const value = await FileSystem.readAsStringAsync(`${CONST.DOCUMENT_FOLDER}${key}`)
      return value
    } catch (error) {
      if (isFileNotFoundError(error)) {
        return null
      }
      throw new Error(`Failed to read from storage: ${getErrorMessage(error)}`)
    }
  },
  
  removeItem: async ({ key }: StorageParams): Promise<void> => {
    if (!isValidKey(key)) {
      throw new Error(`Invalid storage key ${key}`)
    }

    try {
      await FileSystem.deleteAsync(
        `${CONST.DOCUMENT_FOLDER}${key}`,
        { idempotent: true }
      )
    } catch (error) {
      throw new Error(`Failed to remove from storage: ${getErrorMessage(error)}`)
    }
  },
  
  getAllKeys: async (): Promise<string[]> => {
    try {
      await ensureStorageDirectoryExists()
      const keys = await FileSystem.readDirectoryAsync(CONST.DOCUMENT_FOLDER)
      return keys.filter(key => isValidKey(key))
    } catch (error) {
      throw new Error(`Failed to list storage keys: ${getErrorMessage(error)}`)
    }
  },
}

export default Storage