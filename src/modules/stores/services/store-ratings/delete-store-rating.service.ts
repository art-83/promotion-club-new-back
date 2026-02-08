import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreRating from "../../infra/orm/entities/store-rating.entity";
import AppError from "../../../../shared/infra/http/errors/app-error";

@injectable()
class DeleteStoreRatingService {
  constructor(
    @inject("StoreRatingRepository")
    private storeRatingRepository: RepositoryProvider<StoreRating>
  ) {}

  public async execute(id: string): Promise<void> {
    await this.storeRatingRepository.delete(id);
  }
}

export default DeleteStoreRatingService;
