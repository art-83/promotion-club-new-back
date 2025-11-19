import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";
import Store from "../infra/orm/entities/store.entity";
import ImageRepositoryProvider from "../../images/infra/orm/repositories/provider/image-repository.provider";
import CreateStoreDTO from "../dtos/create-or-update-store.dto";
declare class CreateStoreService {
    private storeRepository;
    private imageRepository;
    constructor(storeRepository: RepositoryProvider<Store>, imageRepository: ImageRepositoryProvider);
    execute(data: CreateStoreDTO): Promise<Store>;
}
export default CreateStoreService;
//# sourceMappingURL=create-store.service.d.ts.map