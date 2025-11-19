import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import Product from "../../entities/product.entity";
import ProductsQueryOptionsDTO from "../../../../dtos/products/product-query-options.dto";
import CreateOrUpdateProductDTO from "../../../../dtos/products/create-or-update-product.dto";
declare class ProductRepository implements RepositoryProvider<Product> {
    private repository;
    constructor();
    find(options: Partial<ProductsQueryOptionsDTO>): Promise<Product[]>;
    create(data: Partial<CreateOrUpdateProductDTO>): Promise<Product>;
    update(id: string, data: Partial<CreateOrUpdateProductDTO>): Promise<void>;
    delete(id: string): Promise<void>;
}
export default ProductRepository;
//# sourceMappingURL=product-repository.implementation.d.ts.map