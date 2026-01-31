import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Category from "../../infra/orm/entities/category.entity";
import CreateCategoryDto from "../../dtos/categories/create-category.dto";

@injectable()
class CreateCategoryService {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: RepositoryProvider<Category>
  ) {}

  public async execute(data: Partial<CreateCategoryDto>): Promise<Category> {
    return await this.categoryRepository.create(data);
  }
}

export default CreateCategoryService;
