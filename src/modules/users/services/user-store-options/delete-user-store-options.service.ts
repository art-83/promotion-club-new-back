import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import UserStoreOptions from "../../infra/orm/entities/user-store-options.entity";
import UserStoreOptionsQueryOptionsDTO from "../../dtos/user-store-options/user-store-options-query-options.dto";
import AppError from "../../../../shared/infra/http/errors/app-error";

@injectable()
class DeleteUserStoreOptionsService {
  constructor(
    @inject("UserStoreOptionsRepository")
    private userStoreOptionsRepository: RepositoryProvider<UserStoreOptions>
  ) {}

  public async execute(user_id: string, store_id: string): Promise<void> {
    const userStoreOptionsQueryOptions = {
      user_id,
      store_id,
    } as UserStoreOptionsQueryOptionsDTO;

    const userStoreOptions = (await this.userStoreOptionsRepository.find(userStoreOptionsQueryOptions)).at(0);

    if (!userStoreOptions) {
      throw new AppError(404, "Resource not found.", "Recurso não encontrado.");
    }

    await this.userStoreOptionsRepository.delete(userStoreOptions.id);
  }
}

export default DeleteUserStoreOptionsService;
