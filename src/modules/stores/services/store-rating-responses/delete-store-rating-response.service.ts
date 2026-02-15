import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreRatingResponse from "../../infra/orm/entities/store-rating-response.entity";

@injectable()
class DeleteStoreRatingResponseService {
  constructor(
    @inject("StoreRatingResponseRepository")
    private storeRatingResponseRepository: RepositoryProvider<StoreRatingResponse>
  ) {}

  public async execute(id: string): Promise<void> {
    await this.storeRatingResponseRepository.delete(id);
  }
}

export default DeleteStoreRatingResponseService;
