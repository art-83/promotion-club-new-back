import PromotionCategory from "../../infra/orm/entities/promotion-category.entity";

interface CreatePromotionCategoryDto extends PromotionCategory {
  store_id: string;
}

export default CreatePromotionCategoryDto;
