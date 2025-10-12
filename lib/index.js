var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Directory, File, Paths } from 'expo-file-system';
function isValidKey(key) {
    // Prevent path traversal and ensure safe filenames
    var safeKeyRegex = /^[a-zA-Z0-9-_.]+$/;
    return Boolean(key) && safeKeyRegex.test(key);
}
var serializeValue = function (value) {
    try {
        if (typeof value === 'string') {
            return value;
        }
        // Use a safe wrapper to avoid direct JSON usage
        var stringify = function (v) {
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
    var storageDir = new Directory(Paths.document.uri);
    if (storageDir.exists === false) {
        storageDir.create({ intermediates: true });
    }
    return;
}
var Storage = {
    setItem: function (params) {
        if (!isValidKey(params.key)) {
            throw new Error("Invalid storage key ".concat(params.key));
        }
        if (params.value === undefined) {
            throw new Error('Value cannot be undefined');
        }
        ensureStorageDirectoryExists();
        var serializedValue = serializeValue(params.value);
        try {
            var file = new File(Paths.document.uri, params.key);
            if (!(file instanceof File)) {
                throw new Error('Failed to create file instance');
            }
            file.write(serializedValue);
        }
        catch (error) {
            throw new Error("Failed to write to storage: ".concat(getErrorMessage(error)));
        }
        return;
    },
    getItem: function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var file, value, error_1;
        var key = _b.key;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!isValidKey(key)) {
                        throw new Error('Invalid storage key ' + key);
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    file = new File(Paths.document.uri, key);
                    if (!file.exists) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, file.text()];
                case 2:
                    value = _c.sent();
                    return [2 /*return*/, value];
                case 3:
                    error_1 = _c.sent();
                    if (isFileNotFoundError(error_1)) {
                        return [2 /*return*/, null];
                    }
                    throw new Error("Failed to read from storage: ".concat(getErrorMessage(error_1)));
                case 4: return [2 /*return*/];
            }
        });
    }); },
    removeItem: function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var file;
        var key = _b.key;
        return __generator(this, function (_c) {
            if (!isValidKey(key)) {
                throw new Error('Invalid storage key ' + key);
            }
            try {
                file = new File(Paths.document.uri, key);
                if (!(file instanceof File)) {
                    throw new Error('Failed to create file instance');
                }
                if (file.exists) {
                    file.delete();
                }
            }
            catch (error) {
                throw new Error("Failed to remove from storage: ".concat(getErrorMessage(error)));
            }
            return [2 /*return*/];
        });
    }); },
    getAllKeys: function () { return __awaiter(void 0, void 0, void 0, function () {
        var storageDir, contents, keys;
        return __generator(this, function (_a) {
            try {
                ensureStorageDirectoryExists();
                storageDir = new Directory(Paths.document.uri);
                contents = storageDir.list();
                keys = contents
                    .filter(function (item) { return item instanceof File; })
                    .map(function (file) { return file.name; })
                    .filter(function (key) { return isValidKey(key); });
                return [2 /*return*/, keys];
            }
            catch (error) {
                throw new Error("Failed to list storage keys: ".concat(getErrorMessage(error)));
            }
            return [2 /*return*/];
        });
    }); },
};
export default Storage;
