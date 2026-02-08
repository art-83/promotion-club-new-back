import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreRating from "../../infra/orm/entities/store-rating.entity";
import StoreRatingQueryOptionsDto from "../../dtos/store-ratings/store-rating-query-options.dto";

@injectable()
class ShowStoreRatingsService {
  constructor(
    @inject("StoreRatingRepository")
    private storeRatingRepository: RepositoryProvider<StoreRating>
  ) {}

  public async execute(options: Partial<StoreRatingQueryOptionsDto>): Promise<StoreRating[]> {
    return await this.storeRatingRepository.find(options);
  }
}

export default ShowStoreRatingsService;
