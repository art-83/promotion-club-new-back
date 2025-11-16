import CacheProvider from "../../../../../shared/infra/cache/providers/cache.provider";
import CreateQrCodeDTO from "../../../dtos/create-qr-code.dto";
declare class Cache implements CacheProvider<CreateQrCodeDTO> {
    private client;
    constructor();
    generate(data: CreateQrCodeDTO): Promise<string>;
    find(id: string): Promise<string>;
    delete(id: string): Promise<number>;
}
export default Cache;
//# sourceMappingURL=cache.implementation.d.ts.map