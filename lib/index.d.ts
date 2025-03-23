interface StorageParams {
    key: string;
    value?: any;
}
export declare const Storage: {
    setItem: ({ key, value }: StorageParams) => Promise<void>;
    getItem: ({ key }: StorageParams) => Promise<string | null>;
    removeItem: ({ key }: StorageParams) => Promise<void>;
    getAllKeys: () => Promise<string[]>;
};
export default Storage;
