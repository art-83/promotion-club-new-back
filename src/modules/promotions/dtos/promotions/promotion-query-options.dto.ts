import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";
import Promotion from "../../infra/orm/entities/promotion.entity";

interface PromotionQueryOptionsDTO extends Promotion, DefaultQueryOptions {
  name: string;
  start_final_price: number;
  end_final_price: number;
  store_id: string;
  not_expired?: boolean;

  join_store: boolean;
  join_file: boolean;
}

export default PromotionQueryOptionsDTO;
