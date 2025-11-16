import HashProvider from "../providers/hash.provider";
declare class Hash implements HashProvider {
    encrypt(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
}
export default Hash;
//# sourceMappingURL=hash.implementation.d.ts.map