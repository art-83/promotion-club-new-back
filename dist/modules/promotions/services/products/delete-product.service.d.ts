import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Product from "../../infra/orm/entities/product.entity";
declare class DeleteProductService {
    private productRepository;
    constructor(productRepository: RepositoryProvider<Product>);
    execute(id: string): Promise<void>;
}
export default DeleteProductService;
//# sourceMappingURL=delete-product.service.d.ts.map