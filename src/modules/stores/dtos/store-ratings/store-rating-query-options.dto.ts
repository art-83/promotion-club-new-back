import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";
import StoreRating from "../../infra/orm/entities/store-rating.entity";

interface StoreRatingQueryOptionsDto extends StoreRating, DefaultQueryOptions {
  user_id: string;
  store_id: string;
}

export default StoreRatingQueryOptionsDto;
