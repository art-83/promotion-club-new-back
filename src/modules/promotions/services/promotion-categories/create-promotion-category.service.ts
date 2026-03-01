import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import PromotionCategory from "../../infra/orm/entities/promotion-category.entity";

@injectable()
class CreatePromotionCategoryService {
  constructor(
    @inject("PromotionCategoryRepository")
    private promotionCategoryRepository: RepositoryProvider<PromotionCategory>
  ) {}

  public async execute(data: Partial<PromotionCategory>): Promise<PromotionCategory> {
    return await this.promotionCategoryRepository.create(data);
  }
}

export default CreatePromotionCategoryService;
