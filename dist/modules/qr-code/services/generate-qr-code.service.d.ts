import CacheProvider from "../../../shared/infra/cache/providers/cache.provider";
import CreateQrCodeDTO from "../dtos/create-qr-code.dto";
declare class GenerateQrCodeService {
    private cacheProvider;
    constructor(cacheProvider: CacheProvider<CreateQrCodeDTO>);
    execute(data: CreateQrCodeDTO): Promise<string>;
}
export default GenerateQrCodeService;
//# sourceMappingURL=generate-qr-code.service.d.ts.map