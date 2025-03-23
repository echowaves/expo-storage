declare module 'expo-storage' {
    interface StorageParams {
        key: string;
        value?: any;
    }

    const Storage: {
        setItem(params: StorageParams): Promise<void>;
        getItem(params: { key: string }): Promise<string | null>;
        removeItem(params: { key: string }): Promise<void>;
        getAllKeys(): Promise<string[]>;
    };
    export default Storage;
}