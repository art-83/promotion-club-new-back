import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreCategory from "../../infra/orm/entities/store-category.entity";

@injectable()
class DeleteStoreCategoryService {
  constructor(
    @inject("StoreCategoryRepository")
    private storeCategoryRepository: RepositoryProvider<StoreCategory>
  ) {}

  public async execute(id: string): Promise<void> {
    await this.storeCategoryRepository.delete(id);
  }
}

export default DeleteStoreCategoryService;
