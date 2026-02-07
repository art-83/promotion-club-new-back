import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import UserStoreOptions from "../../infra/orm/entities/user-store-options.entity";

@injectable()
class DeleteUserStoreOptionsService {
  constructor(
    @inject("UserStoreOptionsRepository")
    private userStoreOptionsRepository: RepositoryProvider<UserStoreOptions>
  ) {}

  public async execute(id: string): Promise<void> {
    await this.userStoreOptionsRepository.delete(id);
  }
}

export default DeleteUserStoreOptionsService;
