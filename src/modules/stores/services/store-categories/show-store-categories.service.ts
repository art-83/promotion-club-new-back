import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreCategory from "../../infra/orm/entities/store-category.entity";
import StoreCategoryQueryOptionsDto from "../../dtos/store-categories/store-category-query-options.dto";

@injectable()
class ShowStoreCategoriesService {
  constructor(
    @inject("StoreCategoryRepository")
    private storeCategoryRepository: RepositoryProvider<StoreCategory>
  ) {}

  public async execute(options: Partial<StoreCategoryQueryOptionsDto>): Promise<StoreCategory[]> {
    return await this.storeCategoryRepository.find(options);
  }
}

export default ShowStoreCategoriesService;
