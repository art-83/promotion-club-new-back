import Promotion from "../../infra/orm/entities/promotion.entity";

interface CreateOrUpdatePromotionDTO extends Promotion {
  store_id: string;
  file_id: string;
}

export default CreateOrUpdatePromotionDTO;
