import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import User from "../../infra/orm/entities/user.entity";
import HashProvider from "../../../../shared/infra/hash/infra/providers/hash.provider";
import UserPermissions from "../../infra/orm/entities/user-permissions.entity";
import Permissions from "../../../../shared/infra/http/middlewares/utils/permissions";

@injectable()
class CreateUserAndVinculateUserPermissionsService {
  constructor(
    @inject("UserRepository")
    private userRepository: RepositoryProvider<User>,
    @inject("UserPermissionsRepository")
    private userPermissionsRepository: RepositoryProvider<UserPermissions>,
    @inject("Hash")
    private hash: HashProvider
  ) {}

  public async execute(data: Partial<User>): Promise<{ user: User; userPermissions: UserPermissions }> {
    const passwordHash = await this.hash.encrypt(String(data.password));
    data.password = passwordHash;
    const defaultPermissions = [Permissions.GET_ME, Permissions.SHOW_PROMOTIONS, Permissions.CREATE_QR_CODE, Permissions.SHOW_STORES];
    const user = await this.userRepository.create(data);
    const userPermissions = await this.userPermissionsRepository.create({ user: user, permissions: defaultPermissions });
    return { user, userPermissions };
  }
}

export default CreateUserAndVinculateUserPermissionsService;
