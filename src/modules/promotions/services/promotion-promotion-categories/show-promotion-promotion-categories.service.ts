import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import PromotionPromotionCategory from "../../infra/orm/entities/promotion-promotion-category.entity";
import PromotionPromotionCategoryQueryOptionsDto from "../../dtos/promotion-promotion-categories/promotion-promotion-category-query-options.dto";

@injectable()
class ShowPromotionPromotionCategoriesService {
  constructor(
    @inject("PromotionPromotionCategoryRepository")
    private promotionPromotionCategoryRepository: RepositoryProvider<PromotionPromotionCategory>
  ) {}

  public async execute(options: Partial<PromotionPromotionCategoryQueryOptionsDto>): Promise<PromotionPromotionCategory[]> {
    return await this.promotionPromotionCategoryRepository.find(options);
  }
}

export default ShowPromotionPromotionCategoriesService;
