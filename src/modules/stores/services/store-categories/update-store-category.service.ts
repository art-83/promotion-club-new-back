import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreCategory from "../../infra/orm/entities/store-category.entity";
import CreateOrUpdateStoreCategoryDto from "../../dtos/store-categories/create-or-update-store-category.dto";
import AppError from "../../../../shared/infra/http/errors/app-error";

@injectable()
class UpdateStoreCategoryService {
  constructor(
    @inject("StoreCategoryRepository")
    private storeCategoryRepository: RepositoryProvider<StoreCategory>
  ) {}

  public async execute(id: string, data: Partial<CreateOrUpdateStoreCategoryDto>): Promise<void> {
    const storeCategory = (await this.storeCategoryRepository.find({ id })).at(0);
    if (!storeCategory) throw new AppError(404, "StoreCategory not found.");
    await this.storeCategoryRepository.update(id, data);
  }
}

export default UpdateStoreCategoryService;
