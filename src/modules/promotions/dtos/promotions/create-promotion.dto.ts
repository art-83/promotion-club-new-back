import Promotion from "../../infra/orm/entities/promotion.entity";

interface CreatePromotionDTO extends Promotion {
  product_id: string;
}

export default CreatePromotionDTO;
