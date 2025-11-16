import StoreQueryOptionsDTO from "../dtos/store-query-options.dto";
import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";
import Store from "../infra/orm/entities/store.entity";
declare class ShowStoresServices {
    private storeRepository;
    constructor(storeRepository: RepositoryProvider<Store>);
    execute(options: Partial<StoreQueryOptionsDTO>): Promise<Store[]>;
}
export default ShowStoresServices;
//# sourceMappingURL=show-stores.service.d.ts.map