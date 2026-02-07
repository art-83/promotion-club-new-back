import CacheProvider from "../../../../../shared/infra/cache/infra/providers/cache.provider";
import cacheClient from "../../../../../shared/infra/cache/cache";
import cacheConfig from "../../../../../config/cache.config";
import QrCodePayloadDto from "../../../dtos/qr-code-payload.dto";

class QrCodeCache implements CacheProvider<QrCodePayloadDto> {
  private client: typeof cacheClient;

  constructor() {
    this.client = cacheClient;
  }

  public async create(data: QrCodePayloadDto): Promise<QrCodePayloadDto> {
    data.deleted = false;
    const jsonData = JSON.stringify(data);
    await this.client.set(data.user_id, jsonData, cacheConfig.defaultExpiration);
    return data;
  }

  public async find(id: string): Promise<string | null> {
    const qrCode = await this.client.get(id);
    return qrCode;
  }

  public async delete(id: string): Promise<boolean> {
    const qrCodeRawData = await this.client.get(id);
    if (!qrCodeRawData) return false;
    const qrCodeJson = JSON.parse(qrCodeRawData);
    qrCodeJson.deleted = true;
    const jsonData = JSON.stringify(qrCodeJson);
    const softDelete = await this.client.set(id, jsonData, cacheConfig.deleteExpiration);
    return true;
  }
}

export default QrCodeCache;
