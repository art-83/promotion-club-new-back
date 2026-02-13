import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import PromotionCategory from "../../infra/orm/entities/promotion-category.entity";
import PromotionCategoryQueryOptionsDto from "../../dtos/promotion-categories/promotion-category-query-options.dto";

@injectable()
class ShowPromotionCategoriesService {
  constructor(
    @inject("PromotionCategoryRepository")
    private promotionCategoryRepository: RepositoryProvider<PromotionCategory>
  ) {}

  public async execute(options: Partial<PromotionCategoryQueryOptionsDto>): Promise<PromotionCategory[]> {
    return await this.promotionCategoryRepository.find(options);
  }
}

export default ShowPromotionCategoriesService;
