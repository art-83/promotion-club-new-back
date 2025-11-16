interface CacheProvider<T> {
    generate(data: T): Promise<string>;
    find(id: string): Promise<string>;
    delete(id: string): Promise<number>;
}
export default CacheProvider;
//# sourceMappingURL=cache.provider.d.ts.map