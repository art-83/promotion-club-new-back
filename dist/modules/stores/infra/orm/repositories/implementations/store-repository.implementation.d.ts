import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import Store from "../../entities/store.entity";
import StoreQueryOptionsDTO from "../../../../dtos/store-query-options.dto";
declare class StoreRepository implements RepositoryProvider<Store> {
    private repository;
    constructor();
    find(options: StoreQueryOptionsDTO): Promise<Store[]>;
    create(data: Partial<Store>): Promise<Store>;
    update(id: string, data: Partial<Store>): Promise<void>;
    delete(id: string): Promise<void>;
}
export default StoreRepository;
//# sourceMappingURL=store-repository.implementation.d.ts.map