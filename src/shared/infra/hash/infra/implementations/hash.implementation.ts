import HashProvider from "../providers/hash.provider";
import bcrypt from "bcrypt";

class Hash implements HashProvider {
  public async encrypt(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}

export default Hash;
