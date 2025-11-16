import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Product from "../../infra/orm/entities/product.entity";
declare class UpdateProductService {
    private productRepository;
    constructor(productRepository: RepositoryProvider<Product>);
    execute(id: string, data: Partial<Product>): Promise<void>;
}
export default UpdateProductService;
//# sourceMappingURL=update-product.service.d.ts.map