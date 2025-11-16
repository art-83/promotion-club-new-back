import { inject, injectable } from "tsyringe";
import ProductsQueryOptionsDTO from "../../dtos/products/product-query-options.dto";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Product from "../../infra/orm/entities/product.entity";

@injectable()
class ShowProductsServices {
  constructor(
    @inject("ProductRepository")
    private productRepository: RepositoryProvider<Product>
  ) {}

  public async execute(options: Partial<ProductsQueryOptionsDTO>): Promise<Product[]> {
    return await this.productRepository.find(options);
  }
}

export default ShowProductsServices;
