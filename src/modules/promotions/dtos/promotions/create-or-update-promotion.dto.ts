import Promotion from "../../infra/orm/entities/promotion.entity";

interface CreateOrUpdatePromotionDTO extends Promotion {
  store_id: string;
  image_id: string;
}

export default CreateOrUpdatePromotionDTO;
