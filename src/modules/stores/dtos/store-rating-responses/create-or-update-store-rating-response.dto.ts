import StoreRatingResponse from "../../infra/orm/entities/store-rating-response.entity";

interface CreateOrUpdateStoreRatingResponseDto extends StoreRatingResponse {
  user_id: string;
  store_rating_id: string;
}

export default CreateOrUpdateStoreRatingResponseDto;
