import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";
import StoreRatingResponse from "../../infra/orm/entities/store-rating-response.entity";

interface StoreRatingResponseQueryOptionsDto extends StoreRatingResponse, DefaultQueryOptions {
  user_id: string;
  store_rating_id: string;
}

export default StoreRatingResponseQueryOptionsDto;
