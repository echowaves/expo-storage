declare module 'expo-storage' {

    const Storage: {
        setItem({ key: string, value: any }): Promise<void>;

        getItem({ key: string }): Promise<string | null>;

        removeItem({ key: string }): Promise<void>;

        getAllKeys(): Promise<string[]>;
    };

    export default Storage;
}