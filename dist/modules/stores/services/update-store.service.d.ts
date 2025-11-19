import RepositoryProvider from "../../../shared/infra/orm/repositories/providers/repository.provider";
import Store from "../infra/orm/entities/store.entity";
import Image from "../../images/infra/orm/entities/image.entity";
import CreateOrUpdateStoreDTO from "../dtos/create-or-update-store.dto";
declare class UpdateStoreService {
    private storeRepository;
    private imageRepository;
    constructor(storeRepository: RepositoryProvider<Store>, imageRepository: RepositoryProvider<Image>);
    execute(id: string, data: CreateOrUpdateStoreDTO): Promise<void>;
}
export default UpdateStoreService;
//# sourceMappingURL=update-store.service.d.ts.map