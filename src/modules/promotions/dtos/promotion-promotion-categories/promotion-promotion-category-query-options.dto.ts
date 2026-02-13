import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";
import PromotionPromotionCategory from "../../infra/orm/entities/promotion-promotion-category.entity";

interface PromotionPromotionCategoryQueryOptionsDto extends PromotionPromotionCategory, DefaultQueryOptions {
  promotion_id: string;
  promotion_category_id: string;
}

export default PromotionPromotionCategoryQueryOptionsDto;
