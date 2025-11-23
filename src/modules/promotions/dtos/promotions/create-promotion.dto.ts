import Promotion from "../../infra/orm/entities/promotion.entity";

interface CreateOrUpdatePromotionDTO extends Promotion {
  product_id: string;
}

export default CreateOrUpdatePromotionDTO;
