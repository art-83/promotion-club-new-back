import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreStoreCategory from "../../infra/orm/entities/store-store-category.entity";
import StoreCategoryQueryOptionsDto from "../../dtos/store-categories/store-category-query-options.dto";

@injectable()
class ShowStoreCategoriesService {
  constructor(
    @inject("StoreStoreCategoryRepository")
    private storeStoreCategoryRepository: RepositoryProvider<StoreStoreCategory>
  ) {}

  public async execute(options: Partial<StoreCategoryQueryOptionsDto>): Promise<StoreStoreCategory[]> {
    return await this.storeStoreCategoryRepository.find(options);
  }
}

export default ShowStoreCategoriesService;
