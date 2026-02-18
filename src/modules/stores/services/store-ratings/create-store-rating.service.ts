import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import StoreRating from "../../infra/orm/entities/store-rating.entity";
import Store from "../../infra/orm/entities/store.entity";
import User from "../../../users/infra/orm/entities/user.entity";
import CreateOrUpdateStoreRatingDto from "../../dtos/store-ratings/create-or-update-store-rating.dto";
import AppError from "../../../../shared/infra/http/errors/app-error";

@injectable()
class CreateStoreRatingService {
  constructor(
    @inject("StoreRatingRepository")
    private storeRatingRepository: RepositoryProvider<StoreRating>,
    @inject("StoreRepository")
    private storeRepository: RepositoryProvider<Store>,
    @inject("UserRepository")
    private userRepository: RepositoryProvider<User>
  ) {}

  public async execute(data: Partial<CreateOrUpdateStoreRatingDto>): Promise<StoreRating> {
    const [store, user] = await Promise.all([
      (await this.storeRepository.find({ id: data.store_id })).at(0),
      (await this.userRepository.find({ id: data.user_id })).at(0),
    ]);
    if (!store) throw new AppError(404, "Store not found.", "Loja não encontrada.");
    if (!user) throw new AppError(404, "User not found.", "Usuário não encontrado.");

    data.store = store;
    data.user = user;

    return await this.storeRatingRepository.create(data);
  }
}

export default CreateStoreRatingService;
