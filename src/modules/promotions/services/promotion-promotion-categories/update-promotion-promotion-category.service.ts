import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import PromotionPromotionCategory from "../../infra/orm/entities/promotion-promotion-category.entity";
import CreateOrUpdatePromotionPromotionCategoryDto from "../../dtos/promotion-promotion-categories/create-or-update-promotion-promotion-category.dto";
import AppError from "../../../../shared/infra/http/errors/app-error";

@injectable()
class UpdatePromotionPromotionCategoryService {
  constructor(
    @inject("PromotionPromotionCategoryRepository")
    private promotionPromotionCategoryRepository: RepositoryProvider<PromotionPromotionCategory>
  ) {}

  public async execute(id: string, data: Partial<CreateOrUpdatePromotionPromotionCategoryDto>): Promise<void> {
    const promotionPromotionCategory = (await this.promotionPromotionCategoryRepository.find({ id })).at(0);
    if (!promotionPromotionCategory)
      throw new AppError(404, "Promotion category link not found.", "Vínculo da categoria da promoção não encontrado.");
    await this.promotionPromotionCategoryRepository.update(id, data);
  }
}

export default UpdatePromotionPromotionCategoryService;
