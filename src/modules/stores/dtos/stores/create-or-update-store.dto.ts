import Store from "../../infra/orm/entities/store.entity";

interface CreateOrUpdateStoreDTO extends Store {
  file_id: string;
}

export default CreateOrUpdateStoreDTO;
