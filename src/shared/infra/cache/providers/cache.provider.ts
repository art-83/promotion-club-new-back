interface CacheProvider<T> {
  generate(data: T): Promise<T>;
  find(id: string): Promise<string | null>;
  delete(id: string): Promise<number>;
}

export default CacheProvider;
