import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Product from "../../infra/orm/entities/product.entity";

@injectable()
class UpdateProductService {
  constructor(
    @inject("ProductRepository")
    private productRepository: RepositoryProvider<Product>
  ) {}

  public async execute(id: string, data: Partial<Product>): Promise<void> {
    await this.productRepository.update(id, data);
  }
}

export default UpdateProductService;
