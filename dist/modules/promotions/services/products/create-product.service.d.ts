import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Product from "../../infra/orm/entities/product.entity";
declare class CreateProductService {
    private productRepository;
    constructor(productRepository: RepositoryProvider<Product>);
    execute(data: Partial<Product>): Promise<Product>;
}
export default CreateProductService;
//# sourceMappingURL=create-product.service.d.ts.map