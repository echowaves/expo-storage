"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
const expo_file_system_1 = require("expo-file-system");
const isValidKey = (key) => {
    // Prevent path traversal and ensure safe filenames
    const safeKeyRegex = /^[a-zA-Z0-9-_\.]+$/;
    return Boolean(key) && safeKeyRegex.test(key);
};
const serializeValue = (value) => {
    try {
        return typeof value === 'string' ? value : JSON.stringify(value);
    }
    catch (_a) {
        throw new Error('Unable to serialize value');
    }
};
const getErrorMessage = (error) => {
    if (error instanceof Error)
        return error.message;
    return String(error);
};
const isFileNotFoundError = (error) => {
    return error instanceof Error && 'code' in error && error.code === 'ENOENT';
};
const ensureStorageDirectoryExists = () => __awaiter(void 0, void 0, void 0, function* () {
    const storageDir = expo_file_system_1.Paths.document;
    if (!storageDir.exists) {
        storageDir.create({ intermediates: true });
    }
});
exports.Storage = {
    setItem: (_a) => __awaiter(void 0, [_a], void 0, function* ({ key, value }) {
        if (!isValidKey(key)) {
            throw new Error(`Invalid storage key ${key}`);
        }
        yield ensureStorageDirectoryExists();
        const serializedValue = serializeValue(value);
        try {
            const file = new expo_file_system_1.File(expo_file_system_1.Paths.document, key);
            file.write(serializedValue);
        }
        catch (error) {
            throw new Error(`Failed to write to storage: ${getErrorMessage(error)}`);
        }
    }),
    getItem: (_a) => __awaiter(void 0, [_a], void 0, function* ({ key }) {
        if (!isValidKey(key)) {
            throw new Error(`Invalid storage key ${key}`);
        }
        try {
            const file = new expo_file_system_1.File(expo_file_system_1.Paths.document, key);
            if (!file.exists) {
                return null;
            }
            const value = yield file.text();
            return value;
        }
        catch (error) {
            if (isFileNotFoundError(error)) {
                return null;
            }
            throw new Error(`Failed to read from storage: ${getErrorMessage(error)}`);
        }
    }),
    removeItem: (_a) => __awaiter(void 0, [_a], void 0, function* ({ key }) {
        if (!isValidKey(key)) {
            throw new Error(`Invalid storage key ${key}`);
        }
        try {
            const file = new expo_file_system_1.File(expo_file_system_1.Paths.document, key);
            if (file.exists) {
                file.delete();
            }
        }
        catch (error) {
            throw new Error(`Failed to remove from storage: ${getErrorMessage(error)}`);
        }
    }),
    getAllKeys: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield ensureStorageDirectoryExists();
            const storageDir = expo_file_system_1.Paths.document;
            const contents = storageDir.list();
            const keys = contents
                .filter(item => item instanceof expo_file_system_1.File)
                .map(file => file.name)
                .filter(key => isValidKey(key));
            return keys;
        }
        catch (error) {
            throw new Error(`Failed to list storage keys: ${getErrorMessage(error)}`);
        }
    }),
};
exports.default = exports.Storage;
