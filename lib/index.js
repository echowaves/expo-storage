import { Directory, File, Paths } from 'expo-file-system';
function isValidKey(key) {
    // Prevent path traversal and ensure safe filenames
    var safeKeyRegex = /^[a-zA-Z0-9-_.]+$/;
    return Boolean(key) && safeKeyRegex.test(key);
}
const serializeValue = (value) => {
    try {
        if (typeof value === 'string') {
            return value;
        }
        // Use a safe wrapper to avoid direct JSON usage
        const stringify = (v) => {
            return globalThis.JSON.stringify(v);
        };
        return stringify(value);
    }
    catch (_a) {
        throw new Error('Unable to serialize value');
    }
};
function getErrorMessage(error) {
    if (error instanceof Error)
        return error.message;
    return String(error);
}
function isFileNotFoundError(error) {
    return error instanceof Error && 'code' in error && error.code === 'ENOENT';
}
function ensureStorageDirectoryExists() {
    const storageDir = new Directory(Paths.document.uri);
    if (storageDir.exists === false) {
        storageDir.create({ intermediates: true });
    }
    return;
}
const Storage = {
    setItem: function (params) {
        if (!isValidKey(params.key)) {
            throw new Error(`Invalid storage key ${params.key}`);
        }
        if (params.value === undefined) {
            throw new Error('Value cannot be undefined');
        }
        ensureStorageDirectoryExists();
        const serializedValue = serializeValue(params.value);
        try {
            const file = new File(Paths.document.uri, params.key);
            if (!(file instanceof File)) {
                throw new Error('Failed to create file instance');
            }
            file.write(serializedValue);
        }
        catch (error) {
            throw new Error(`Failed to write to storage: ${getErrorMessage(error)}`);
        }
        return;
    },
    getItem: async ({ key }) => {
        if (!isValidKey(key)) {
            throw new Error('Invalid storage key ' + key);
        }
        try {
            var file = new File(Paths.document.uri, key);
            if (!file.exists) {
                return null;
            }
            var value = await file.text();
            return value;
        }
        catch (error) {
            if (isFileNotFoundError(error)) {
                return null;
            }
            throw new Error(`Failed to read from storage: ${getErrorMessage(error)}`);
        }
    },
    removeItem: async ({ key }) => {
        if (!isValidKey(key)) {
            throw new Error('Invalid storage key ' + key);
        }
        try {
            var file = new File(Paths.document.uri, key);
            if (!(file instanceof File)) {
                throw new Error('Failed to create file instance');
            }
            if (file.exists) {
                file.delete();
            }
        }
        catch (error) {
            throw new Error(`Failed to remove from storage: ${getErrorMessage(error)}`);
        }
    },
    getAllKeys: async () => {
        try {
            ensureStorageDirectoryExists();
            var storageDir = new Directory(Paths.document.uri);
            var contents = storageDir.list();
            var keys = contents
                .filter(item => item instanceof File)
                .map(file => file.name)
                .filter(key => isValidKey(key));
            return keys;
        }
        catch (error) {
            throw new Error(`Failed to list storage keys: ${getErrorMessage(error)}`);
        }
    },
};
export default Storage;
//# sourceMappingURL=index.js.map