import CacheProvider from "../../../shared/infra/cache/providers/cache.provider";
import CreateQrCodeDTO from "../dtos/create-qr-code.dto";
declare class ValidateQrCodeService {
  private cacheProvider;
  constructor(cacheProvider: CacheProvider<CreateQrCodeDTO>);
  execute(id: string): Promise<string>;
}
export default ValidateQrCodeService;
//# sourceMappingURL=validate-qr-code.service.d.ts.map
