import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreStoreCategory from "../../infra/orm/entities/store-store-category.entity";
import CreateOrUpdateStoreCategoryDto from "../../dtos/store-categories/create-or-update-store-category.dto";
import AppError from "../../../../shared/infra/http/errors/app-error";

@injectable()
class UpdateStoreCategoryService {
  constructor(
    @inject("StoreStoreCategoryRepository")
    private storeStoreCategoryRepository: RepositoryProvider<StoreStoreCategory>
  ) {}

  public async execute(id: string, data: Partial<CreateOrUpdateStoreCategoryDto>): Promise<void> {
    const storeStoreCategory = (await this.storeStoreCategoryRepository.find({ id })).at(0);
    if (!storeStoreCategory) throw new AppError(404, "Store category link not found.");
    await this.storeStoreCategoryRepository.update(id, data);
  }
}

export default UpdateStoreCategoryService;
