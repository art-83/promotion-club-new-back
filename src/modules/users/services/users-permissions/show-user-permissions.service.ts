import { inject, injectable } from "tsyringe";

import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import UserPermissions from "../../infra/orm/entities/user-permissions.entity";
import UserPermissionsQueryOptionsDTO from "../../dtos/users-permissions/user-permissions-query-options.dto";

@injectable()
class ShowUserPermissionsService {
  constructor(
    @inject("UserPermissionsRepository")
    private userPermissionsRepository: RepositoryProvider<UserPermissions>
  ) {}

  public async execute(options: Partial<UserPermissionsQueryOptionsDTO>): Promise<UserPermissions[]> {
    const userPermissions = await this.userPermissionsRepository.find(options);
    return userPermissions;
  }
}

export default ShowUserPermissionsService;
