import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Product from "../../infra/orm/entities/product.entity";

@injectable()
class DeleteProductService {
  constructor(
    @inject("ProductRepository")
    private productRepository: RepositoryProvider<Product>
  ) {}

  public async execute(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}

export default DeleteProductService;
