import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";
import Store from "../infra/orm/entities/store.entity";
declare class DeleteStoreService {
    private storeRepository;
    constructor(storeRepository: RepositoryProvider<Store>);
    execute(id: string): Promise<void>;
}
export default DeleteStoreService;
//# sourceMappingURL=delete-store.service.d.ts.map