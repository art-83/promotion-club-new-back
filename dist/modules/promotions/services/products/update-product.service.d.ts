import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Product from "../../infra/orm/entities/product.entity";
import Image from "../../../images/infra/orm/entities/image.entity";
import CreateOrUpdateProductDTO from "../../dtos/products/create-or-update-product.dto";
declare class UpdateProductService {
    private productRepository;
    private imageRepository;
    constructor(productRepository: RepositoryProvider<Product>, imageRepository: RepositoryProvider<Image>);
    execute(id: string, data: CreateOrUpdateProductDTO): Promise<void>;
}
export default UpdateProductService;
//# sourceMappingURL=update-product.service.d.ts.map