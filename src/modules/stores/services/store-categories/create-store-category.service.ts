import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreCategory from "../../infra/orm/entities/store-category.entity";
import Store from "../../infra/orm/entities/store.entity";
import Category from "../../infra/orm/entities/category.entity";
import CreateOrUpdateStoreCategoryDto from "../../dtos/store-categories/create-or-update-store-category.dto";
import AppError from "../../../../shared/infra/http/errors/app-error";

@injectable()
class CreateStoreCategoryService {
  constructor(
    @inject("StoreCategoryRepository")
    private storeCategoryRepository: RepositoryProvider<StoreCategory>,
    @inject("StoreRepository")
    private storeRepository: RepositoryProvider<Store>,
    @inject("CategoryRepository")
    private categoryRepository: RepositoryProvider<Category>
  ) {}

  public async execute(data: Partial<CreateOrUpdateStoreCategoryDto>): Promise<StoreCategory> {
    const [store, category] = await Promise.all([
      (await this.storeRepository.find({ id: data.store_id })).at(0),
      (await this.categoryRepository.find({ id: data.category_id })).at(0),
    ]);
    if (!store) throw new AppError(404, "Store not found.");
    if (!category) throw new AppError(404, "Category not found.");
    data.store = store;
    data.category = category;
    return await this.storeCategoryRepository.create(data);
  }
}

export default CreateStoreCategoryService;
