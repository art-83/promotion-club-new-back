import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import PromotionCategory from "../../infra/orm/entities/promotion-category.entity";
import Store from "../../../stores/infra/orm/entities/store.entity";
import CreatePromotionCategoryDto from "../../dtos/promotion-categories/create-promotion-category.dto";
import AppError from "../../../../shared/infra/http/errors/app-error";

@injectable()
class CreatePromotionCategoryService {
  constructor(
    @inject("PromotionCategoryRepository")
    private promotionCategoryRepository: RepositoryProvider<PromotionCategory>,
    @inject("StoreRepository")
    private storeRepository: RepositoryProvider<Store>
  ) {}

  public async execute(data: Partial<CreatePromotionCategoryDto>): Promise<PromotionCategory> {
    const store = (await this.storeRepository.find({ id: data.store_id })).at(0);
    if (!store) throw new AppError(404, "Store not found.", "Loja não encontrada.");
    data.store = store;
    return await this.promotionCategoryRepository.create(data);
  }
}

export default CreatePromotionCategoryService;
