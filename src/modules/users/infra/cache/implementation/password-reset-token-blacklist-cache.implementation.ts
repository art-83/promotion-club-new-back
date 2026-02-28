import passwordResetCacheConfig from "../../../../../config/password-reset-cache.config";
import CacheProvider from "../../../../../shared/infra/cache/infra/providers/cache.provider";
import passwordResetCacheClient from "../../../../../shared/infra/cache/password-reset-cache";

class PasswordResetTokenBlacklistCache implements CacheProvider<string> {
  private client: typeof passwordResetCacheClient;

  constructor() {
    this.client = passwordResetCacheClient;
  }

  public async create(data: string): Promise<string> {
    const keyWithPrefix = `${passwordResetCacheConfig.prefix.tokenBlacklist}:${data}`;
    await this.client.set(keyWithPrefix, data, passwordResetCacheConfig.defaultExpiration);
    return data;
  }

  public async find(token: string): Promise<string | null> {
    const keyWithPrefix = `${passwordResetCacheConfig.prefix.tokenBlacklist}:${token}`;
    const data = await this.client.get(keyWithPrefix);
    return data;
  }

  public async delete(token: string): Promise<boolean> {
    const keyWithPrefix = `${passwordResetCacheConfig.prefix.tokenBlacklist}:${token}`;
    const data = await this.client.get(keyWithPrefix);
    if (!data) return false;
    await this.client.del(keyWithPrefix);
    return true;
  }
}

export default PasswordResetTokenBlacklistCache;
