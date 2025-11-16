import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";
import Store from "../infra/orm/entities/store.entity";
declare class CreateStoreService {
    private storeRepository;
    constructor(storeRepository: RepositoryProvider<Store>);
    execute(data: Partial<Store>): Promise<Store>;
}
export default CreateStoreService;
//# sourceMappingURL=create-store.service.d.ts.map