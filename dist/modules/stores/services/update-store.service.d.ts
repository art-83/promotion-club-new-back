import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";
import Store from "../infra/orm/entities/store.entity";
declare class UpdateStoreService {
    private storeRepository;
    constructor(storeRepository: RepositoryProvider<Store>);
    execute(id: string, data: Partial<Store>): Promise<void>;
}
export default UpdateStoreService;
//# sourceMappingURL=update-store.service.d.ts.map