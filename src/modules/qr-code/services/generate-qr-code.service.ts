import { inject, injectable } from "tsyringe";
import CacheProvider from "../../../shared/infra/cache/providers/cache.provider";
import CreateQrCodeDTO from "../dtos/create-qr-code.dto";

@injectable()
class GenerateQrCodeService {
  constructor(
    @inject("CacheProvider")
    private cacheProvider: CacheProvider<CreateQrCodeDTO>
  ) {}

  public async execute(data: CreateQrCodeDTO): Promise<CreateQrCodeDTO> {
    return await this.cacheProvider.generate(data);
  }
}

export default GenerateQrCodeService;
