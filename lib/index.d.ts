interface StorageParams {
    key: string;
    value?: object;
}
declare const Storage: {
    setItem: (params: StorageParams) => void;
    getItem: ({ key }: StorageParams) => Promise<string | null>;
    removeItem: ({ key }: StorageParams) => Promise<void>;
    getAllKeys: () => Promise<string[]>;
};
export default Storage;
