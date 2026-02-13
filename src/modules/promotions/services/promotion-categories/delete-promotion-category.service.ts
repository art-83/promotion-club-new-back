import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import PromotionCategory from "../../infra/orm/entities/promotion-category.entity";

@injectable()
class DeletePromotionCategoryService {
  constructor(
    @inject("PromotionCategoryRepository")
    private promotionCategoryRepository: RepositoryProvider<PromotionCategory>
  ) {}

  public async execute(id: string): Promise<void> {
    await this.promotionCategoryRepository.delete(id);
  }
}

export default DeletePromotionCategoryService;
