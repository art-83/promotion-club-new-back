import Store from "../../infra/orm/entities/store.entity";

interface CreateOrUpdateStoreDTO extends Store {
  image_id: string;
}

export default CreateOrUpdateStoreDTO;
