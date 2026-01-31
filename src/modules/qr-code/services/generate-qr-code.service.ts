import { inject, injectable } from "tsyringe";
import CacheProvider from "../../../shared/infra/cache/infra/providers/cache.provider";
import QrCodePayloadDto from "../dtos/qr-code-payload.dto";

@injectable()
class GenerateQrCodeService {
  constructor(
    @inject("CacheProvider")
    private cacheProvider: CacheProvider<QrCodePayloadDto>
  ) {}

  public async execute(data: Partial<QrCodePayloadDto>): Promise<QrCodePayloadDto> {
    return await this.cacheProvider.create(data);
  }
}

export default GenerateQrCodeService;
