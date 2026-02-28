import passwordResetCacheConfig from "../../../../../config/password-reset-cache.config";
import passwordResetCacheClient from "../../../../../shared/infra/cache/password-reset-cache";
import CacheProvider from "../../../../../shared/infra/cache/infra/providers/cache.provider";
import RequestPasswordResetPayloadDTO from "../../../dtos/users/request-password-reset-payload.dto";

class PasswordResetCache implements CacheProvider<RequestPasswordResetPayloadDTO> {
  private client: typeof passwordResetCacheClient;

  constructor() {
    this.client = passwordResetCacheClient;
  }

  public async create(data: RequestPasswordResetPayloadDTO): Promise<RequestPasswordResetPayloadDTO> {
    const jsonData = JSON.stringify(data);
    const keyWithPrefix = `${passwordResetCacheConfig.prefix.passwordReset}:${data.email}`;
    await this.client.set(keyWithPrefix, jsonData, passwordResetCacheConfig.defaultExpiration);
    return data;
  }

  public async find(email: string): Promise<string | null> {
    const keyWithPrefix = `${passwordResetCacheConfig.prefix.passwordReset}:${email}`;
    const data = await this.client.get(keyWithPrefix);
    return data;
  }

  public async delete(email: string): Promise<boolean> {
    const keyWithPrefix = `${passwordResetCacheConfig.prefix.passwordReset}:${email}`;
    const data = await this.client.get(keyWithPrefix);
    if (!data) return false;
    await this.client.del(email);
    return true;
  }
}

export default PasswordResetCache;
