import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreStoreCategory from "../../infra/orm/entities/store-store-category.entity";

@injectable()
class DeleteStoreCategoryService {
  constructor(
    @inject("StoreStoreCategoryRepository")
    private storeStoreCategoryRepository: RepositoryProvider<StoreStoreCategory>
  ) {}

  public async execute(id: string): Promise<void> {
    await this.storeStoreCategoryRepository.delete(id);
  }
}

export default DeleteStoreCategoryService;
