import UserStoreOptions from "../../infra/orm/entities/user-store-options.entity";

import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import CreateOrUpdateUserStoreOptionsDTO from "../../dtos/user-store-options/create-or-update-user-store-options.dto";
import User from "../../infra/orm/entities/user.entity";
import Store from "../../../stores/infra/orm/entities/store.entity";
import AppError from "../../../../shared/infra/http/errors/app-error";

@injectable()
class CreateUserStoreOptionsService {
  constructor(
    @inject("UserRepository")
    private userRepository: RepositoryProvider<User>,
    @inject("StoreRepository")
    private storeRepository: RepositoryProvider<Store>,
    @inject("UserStoreOptionsRepository")
    private userStoreOptionsRepository: RepositoryProvider<UserStoreOptions>
  ) {}

  public async execute(data: Partial<CreateOrUpdateUserStoreOptionsDTO>): Promise<UserStoreOptions> {
    const [user, store] = await Promise.all([
      (await this.userRepository.find({ id: data.user_id })).at(0),
      (await this.storeRepository.find({ id: data.store_id })).at(0),
    ]);

    if (!user) throw new AppError(404, "User not found.");
    if (!store) throw new AppError(404, "Store not found.");

    data.user = user;
    data.store = store;

    return await this.userStoreOptionsRepository.create(data);
  }
}

export default CreateUserStoreOptionsService;
