import { File, Paths } from 'expo-file-system'

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
  const storageDir = Paths.document
  if (!storageDir.exists) {
    storageDir.create({ intermediates: true })
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
      const file = new File(Paths.document, key)
      file.write(serializedValue)
    } catch (error) {
      throw new Error(`Failed to write to storage: ${getErrorMessage(error)}`)
    }
  },
  
  getItem: async ({ key }: StorageParams): Promise<string | null> => {
    if (!isValidKey(key)) {
      throw new Error(`Invalid storage key ${key}`)
    }

    try {      
      const file = new File(Paths.document, key)
      if (!file.exists) {
        return null
      }
      const value = await file.text()
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
      const file = new File(Paths.document, key)
      if (file.exists) {
        file.delete()
      }
    } catch (error) {
      throw new Error(`Failed to remove from storage: ${getErrorMessage(error)}`)
    }
  },
  
  getAllKeys: async (): Promise<string[]> => {
    try {
      await ensureStorageDirectoryExists()
      const storageDir = Paths.document
      const contents = storageDir.list()
      const keys = contents
        .filter(item => item instanceof File)
        .map(file => file.name)
        .filter(key => isValidKey(key))
      return keys
    } catch (error) {
      throw new Error(`Failed to list storage keys: ${getErrorMessage(error)}`)
    }
  },
}

export default Storage