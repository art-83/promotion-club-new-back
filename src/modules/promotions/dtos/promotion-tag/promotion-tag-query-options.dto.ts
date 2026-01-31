import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";
import PromotionTag from "../../infra/orm/entities/promotion-tag.entity";

interface PromotionTagQueryOptionsDTO extends PromotionTag, DefaultQueryOptions {
  promotion_id: string;
  tag_id: string;
}

export default PromotionTagQueryOptionsDTO;
