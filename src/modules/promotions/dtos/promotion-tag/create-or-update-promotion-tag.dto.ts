import PromotionTag from "../../infra/orm/entities/promotion-tag.entity";

interface CreateOrUpdatePromotionTagDTO extends Partial<PromotionTag> {
  promotion_id: string;
  tag_id: string;
}

export default CreateOrUpdatePromotionTagDTO;
