import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreStoreCategory from "../../infra/orm/entities/store-store-category.entity";
import Store from "../../infra/orm/entities/store.entity";
import StoreCategory from "../../infra/orm/entities/store-category.entity";
import CreateOrUpdateStoreCategoryDto from "../../dtos/store-categories/create-or-update-store-category.dto";
import AppError from "../../../../shared/infra/http/errors/app-error";

@injectable()
class CreateStoreCategoryService {
  constructor(
    @inject("StoreStoreCategoryRepository")
    private storeStoreCategoryRepository: RepositoryProvider<StoreStoreCategory>,
    @inject("StoreRepository")
    private storeRepository: RepositoryProvider<Store>,
    @inject("StoreCategoryRepository")
    private storeCategoryRepository: RepositoryProvider<StoreCategory>
  ) {}

  public async execute(data: Partial<CreateOrUpdateStoreCategoryDto>): Promise<StoreStoreCategory> {
    const [store, storeCategory] = await Promise.all([
      (await this.storeRepository.find({ id: data.store_id })).at(0),
      (await this.storeCategoryRepository.find({ id: data.category_id })).at(0),
    ]);
    if (!store) throw new AppError(404, "Store not found.");
    if (!storeCategory) throw new AppError(404, "Store category not found.");
    data.store = store;
    data.category = storeCategory;
    return await this.storeStoreCategoryRepository.create(data);
  }
}

export default CreateStoreCategoryService;
