import UserStoreOptions from "../../infra/orm/entities/user-store-options.entity";
import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";

interface UserStoreOptionsQueryOptionsDTO extends UserStoreOptions, DefaultQueryOptions {
  user_id: string;
  store_id: string;
}

export default UserStoreOptionsQueryOptionsDTO;
