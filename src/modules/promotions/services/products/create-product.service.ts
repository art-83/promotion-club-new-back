import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Product from "../../infra/orm/entities/product.entity";

@injectable()
class CreateProductService {
  constructor(
    @inject("ProductRepository")
    private productRepository: RepositoryProvider<Product>
  ) {}

  public async execute(data: Partial<Product>): Promise<Product> {
    const product = await this.productRepository.create(data);
    return product;
  }
}

export default CreateProductService;
