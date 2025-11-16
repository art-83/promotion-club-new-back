interface RepositoryProvider<T> {
    find(options: Partial<T>): Promise<T[]>;
    create(data: Partial<T>): Promise<T>;
    update(id: string, data: Partial<T>): Promise<void>;
    delete(id: string): Promise<void>;
}
export default RepositoryProvider;
//# sourceMappingURL=repository.provider.d.ts.map