import CacheProvider from "../../../../../shared/infra/cache/providers/cache.provider";
import cacheClient from "../../../../../shared/infra/cache/cache";
import cacheConfig from "../../../../../config/cache.config";
import CreateQrCodeDTO from "../../../dtos/create-qr-code.dto";

class Cache implements CacheProvider<CreateQrCodeDTO> {
  private client: typeof cacheClient;

  constructor() {
    this.client = cacheClient;
  }

  public async generate(data: CreateQrCodeDTO): Promise<string> {
    const jsonData = JSON.stringify(data);
    const save = String(await this.client.set(data.user_id, jsonData, cacheConfig.expiration));
    return save;
  }

  public async find(id: string): Promise<string> {
    const qrCode = String(this.client.get(id));
    return qrCode;
  }

  public async delete(id: string): Promise<number> {
    const deleteQrCode = await this.client.del(id);
    return deleteQrCode;
  }
}

export default Cache;
