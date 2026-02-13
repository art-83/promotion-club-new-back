import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreCategory from "../../infra/orm/entities/store-category.entity";
import CreateCategoryDto from "../../dtos/categories/create-category.dto";

@injectable()
class CreateCategoryService {
  constructor(
    @inject("StoreCategoryRepository")
    private storeCategoryRepository: RepositoryProvider<StoreCategory>
  ) {}

  public async execute(data: Partial<CreateCategoryDto>): Promise<StoreCategory> {
    return await this.storeCategoryRepository.create(data);
  }
}

export default CreateCategoryService;
