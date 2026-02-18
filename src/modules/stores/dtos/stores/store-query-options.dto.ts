import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";
import Store from "../../infra/orm/entities/store.entity";

interface StoreQueryOptionsDTO extends Store, DefaultQueryOptions {
  join_file: boolean;
  with_ratings_and_promotions?: boolean;
}

export default StoreQueryOptionsDTO;
