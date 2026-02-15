import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreRatingResponse from "../../infra/orm/entities/store-rating-response.entity";
import StoreRatingResponseQueryOptionsDto from "../../dtos/store-rating-responses/store-rating-response-query-options.dto";

@injectable()
class ShowStoreRatingResponsesService {
  constructor(
    @inject("StoreRatingResponseRepository")
    private storeRatingResponseRepository: RepositoryProvider<StoreRatingResponse>
  ) {}

  public async execute(options: Partial<StoreRatingResponseQueryOptionsDto>): Promise<StoreRatingResponse[]> {
    return await this.storeRatingResponseRepository.find(options);
  }
}

export default ShowStoreRatingResponsesService;
