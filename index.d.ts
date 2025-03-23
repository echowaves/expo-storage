declare module 'expo-storage' {
    interface StorageParams {
        key: string;
        value?: any;
    }

    interface StorageInterface {
        /**
         * Store a value with the given key
         * @throws {Error} If the key is invalid or storage operation fails
         */
        setItem(params: StorageParams): Promise<void>;

        /**
         * Retrieve a value by key
         * @throws {Error} If the key is invalid
         * @returns null if the key doesn't exist
         */
        getItem(params: { key: string }): Promise<string | null>;

        /**
         * Remove a value by key
         * @throws {Error} If the key is invalid or removal operation fails
         */
        removeItem(params: { key: string }): Promise<void>;

        /**
         * List all valid storage keys
         * @throws {Error} If the listing operation fails
         */
        getAllKeys(): Promise<string[]>;
    }

    const Storage: StorageInterface;
    export default Storage;
}