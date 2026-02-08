import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreRating from "../../infra/orm/entities/store-rating.entity";
import AppError from "../../../../shared/infra/http/errors/app-error";
import CreateOrUpdateStoreRatingDTO from "../../dtos/store-ratings/create-or-update-store-rating.dto";

@injectable()
class UpdateStoreRatingService {
  constructor(
    @inject("StoreRatingRepository")
    private storeRatingRepository: RepositoryProvider<StoreRating>
  ) {}

  public async execute(id: string, data: Partial<CreateOrUpdateStoreRatingDTO>): Promise<void> {
    const storeRating = (await this.storeRatingRepository.find({ id })).at(0);
    if (!storeRating) throw new AppError(404, "Store rating not found.");
    await this.storeRatingRepository.update(id, data);
  }
}

export default UpdateStoreRatingService;
