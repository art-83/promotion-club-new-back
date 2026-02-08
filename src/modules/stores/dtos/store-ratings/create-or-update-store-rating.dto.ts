import StoreRating from "../../infra/orm/entities/store-rating.entity";

interface CreateOrUpdateStoreRatingDTO extends StoreRating {
  user_id: string;
  store_id: string;
}

export default CreateOrUpdateStoreRatingDTO;
