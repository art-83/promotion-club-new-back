import ProductsQueryOptionsDTO from "../../dtos/products/product-query-options.dto";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Product from "../../infra/orm/entities/product.entity";
declare class ShowProductsServices {
    private productRepository;
    constructor(productRepository: RepositoryProvider<Product>);
    execute(options: Partial<ProductsQueryOptionsDTO>): Promise<Product[]>;
}
export default ShowProductsServices;
//# sourceMappingURL=show-products.service.d.ts.map