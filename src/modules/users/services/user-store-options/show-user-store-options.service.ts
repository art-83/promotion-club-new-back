import { inject } from "tsyringe";
import UserStoreOptions from "../../infra/orm/entities/user-store-options.entity";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import UserStoreOptionsQueryOptionsDTO from "../../dtos/user-store-options/user-store-options-query-options.dto";

class ShowUserStoreOptionsService {
  constructor(
    @inject("UserStoreOptionsRepository")
    private userStoreOptionsRepository: RepositoryProvider<UserStoreOptions>
  ) {}

  public async execute(options: Partial<UserStoreOptionsQueryOptionsDTO>): Promise<UserStoreOptions[]> {
    return await this.userStoreOptionsRepository.find(options);
  }
}

export default ShowUserStoreOptionsService;
