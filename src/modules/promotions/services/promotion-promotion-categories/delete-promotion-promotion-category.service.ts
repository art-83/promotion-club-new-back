import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import PromotionPromotionCategory from "../../infra/orm/entities/promotion-promotion-category.entity";

@injectable()
class DeletePromotionPromotionCategoryService {
  constructor(
    @inject("PromotionPromotionCategoryRepository")
    private promotionPromotionCategoryRepository: RepositoryProvider<PromotionPromotionCategory>
  ) {}

  public async execute(id: string): Promise<void> {
    await this.promotionPromotionCategoryRepository.delete(id);
  }
}

export default DeletePromotionPromotionCategoryService;
