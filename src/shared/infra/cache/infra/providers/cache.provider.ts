interface CacheProvider<T> {
  create(data: Partial<T>): Promise<T>;
  find(id: string): Promise<string | null>;
  delete(id: string): Promise<boolean>;
}

export default CacheProvider;
