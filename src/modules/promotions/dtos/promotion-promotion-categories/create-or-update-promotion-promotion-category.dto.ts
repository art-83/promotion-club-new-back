import PromotionPromotionCategory from "../../infra/orm/entities/promotion-promotion-category.entity";

interface CreateOrUpdatePromotionPromotionCategoryDto extends PromotionPromotionCategory {
  promotion_id: string;
  promotion_category_id: string;
}

export default CreateOrUpdatePromotionPromotionCategoryDto;
