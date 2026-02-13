import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreCategory from "../../infra/orm/entities/store-category.entity";
import CategoryQueryOptionsDto from "../../dtos/categories/category-query-options.dto";

@injectable()
class ShowCategoriesService {
  constructor(
    @inject("StoreCategoryRepository")
    private storeCategoryRepository: RepositoryProvider<StoreCategory>
  ) {}

  public async execute(options: Partial<CategoryQueryOptionsDto>): Promise<StoreCategory[]> {
    return await this.storeCategoryRepository.find(options);
  }
}

export default ShowCategoriesService;
