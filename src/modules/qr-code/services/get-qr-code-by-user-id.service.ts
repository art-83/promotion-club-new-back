import { inject, injectable } from "tsyringe";
import CacheProvider from "../../../shared/infra/cache/infra/providers/cache.provider";
import AppError from "../../../shared/infra/http/errors/app-error";
import QrCodePayloadDto from "../dtos/qr-code-payload.dto";

@injectable()
class GetQrCodeByUserIdService {
  constructor(
    @inject("CacheProvider")
    private cacheProvider: CacheProvider<QrCodePayloadDto>
  ) {}

  public async execute(user_id: string): Promise<QrCodePayloadDto> {
    const raw = await this.cacheProvider.find(user_id);

    if (!raw) throw new AppError(404, "QrCode not found.", "QR Code não encontrado.");

    const qrCode = JSON.parse(raw) as QrCodePayloadDto;

    return qrCode;
  }
}

export default GetQrCodeByUserIdService;
