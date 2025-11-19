import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Product from "../../infra/orm/entities/product.entity";
import Image from "../../../images/infra/orm/entities/image.entity";
import CreateOrUpdateProductDTO from "../../dtos/products/create-or-update-product.dto";
import Store from "../../../stores/infra/orm/entities/store.entity";
declare class CreateProductService {
    private productRepository;
    private imageRepository;
    private storeRepository;
    constructor(productRepository: RepositoryProvider<Product>, imageRepository: RepositoryProvider<Image>, storeRepository: RepositoryProvider<Store>);
    execute(data: CreateOrUpdateProductDTO): Promise<Product>;
}
export default CreateProductService;
//# sourceMappingURL=create-product.service.d.ts.map