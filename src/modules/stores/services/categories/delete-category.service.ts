import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import Category from "../../infra/orm/entities/category.entity";

@injectable()
class DeleteCategoryService {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: RepositoryProvider<Category>
  ) {}

  public async execute(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}

export default DeleteCategoryService;
