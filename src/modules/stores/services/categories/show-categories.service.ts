import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Category from "../../infra/orm/entities/category.entity";
import CategoryQueryOptionsDto from "../../dtos/categories/category-query-options.dto";

@injectable()
class ShowCategoriesService {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: RepositoryProvider<Category>
  ) {}

  public async execute(options: Partial<CategoryQueryOptionsDto>): Promise<Category[]> {
    return await this.categoryRepository.find(options);
  }
}

export default ShowCategoriesService;
