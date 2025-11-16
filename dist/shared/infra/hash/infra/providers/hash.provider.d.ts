interface HashProvider {
    encrypt(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
}
export default HashProvider;
//# sourceMappingURL=hash.provider.d.ts.map