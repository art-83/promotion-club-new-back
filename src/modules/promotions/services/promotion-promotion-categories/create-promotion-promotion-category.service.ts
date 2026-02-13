import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import PromotionPromotionCategory from "../../infra/orm/entities/promotion-promotion-category.entity";
import Promotion from "../../infra/orm/entities/promotion.entity";
import PromotionCategory from "../../infra/orm/entities/promotion-category.entity";
import CreateOrUpdatePromotionPromotionCategoryDto from "../../dtos/promotion-promotion-categories/create-or-update-promotion-promotion-category.dto";
import AppError from "../../../../shared/infra/http/errors/app-error";

@injectable()
class CreatePromotionPromotionCategoryService {
  constructor(
    @inject("PromotionPromotionCategoryRepository")
    private promotionPromotionCategoryRepository: RepositoryProvider<PromotionPromotionCategory>,
    @inject("PromotionRepository")
    private promotionRepository: RepositoryProvider<Promotion>,
    @inject("PromotionCategoryRepository")
    private promotionCategoryRepository: RepositoryProvider<PromotionCategory>
  ) {}

  public async execute(data: Partial<CreateOrUpdatePromotionPromotionCategoryDto>): Promise<PromotionPromotionCategory> {
    const [promotion, promotionCategory] = await Promise.all([
      (await this.promotionRepository.find({ id: data.promotion_id })).at(0),
      (await this.promotionCategoryRepository.find({ id: data.promotion_category_id })).at(0),
    ]);
    if (!promotion) throw new AppError(404, "Promotion not found.");
    if (!promotionCategory) throw new AppError(404, "Promotion category not found.");
    data.promotion = promotion;
    data.promotion_category = promotionCategory;
    return await this.promotionPromotionCategoryRepository.create(data);
  }
}

export default CreatePromotionPromotionCategoryService;
