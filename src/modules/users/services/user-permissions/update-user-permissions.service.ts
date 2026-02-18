import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import UserPermissions from "../../infra/orm/entities/user-permissions.entity";
import Store from "../../../stores/infra/orm/entities/store.entity";
import AppError from "../../../../shared/infra/http/errors/app-error";
import UserPermissionsQueryOptionsDTO from "../../dtos/users-permissions/user-permissions-query-options.dto";
import CreateOrUpdateUserPermissions from "../../dtos/users-permissions/create-or-update-user-permissions.dto";

@injectable()
class UpdateUserPermissionsService {
  constructor(
    @inject("UserPermissionsRepository")
    private userPermissionsRepository: RepositoryProvider<UserPermissions>,
    @inject("StoreRepository")
    private storeRepository: RepositoryProvider<Store>
  ) {}

  public async execute(id: string, data: Partial<CreateOrUpdateUserPermissions>): Promise<void> {
    if (data.store_id) {
      const store = (await this.storeRepository.find({ id: data.store_id })).at(0);
      if (!store) throw new AppError(404, "Resource not found.", "Recurso não encontrado.");
      data.store = store;
    }

    if (data.store_id == null) {
      data.store = null;
    }

    const userPermissionsQueryOptions = {
      user_id: id,
    } as UserPermissionsQueryOptionsDTO;

    const userPermissions = (await this.userPermissionsRepository.find(userPermissionsQueryOptions)).at(0);

    if (!userPermissions) throw new AppError(404, "Resource not found.", "Recurso não encontrado.");

    await this.userPermissionsRepository.update(userPermissions.id, data);
  }
}

export default UpdateUserPermissionsService;
