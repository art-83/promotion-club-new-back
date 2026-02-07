import UserStoreOptions from "../../infra/orm/entities/user-store-options.entity";

interface CreateOrUpdateUserStoreOptionsDTO extends UserStoreOptions {
  user_id: string;
  store_id: string;
}

export default CreateOrUpdateUserStoreOptionsDTO;
