import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import User from "../../infra/orm/entities/user.entity";
import HashProvider from "../../../../shared/infra/hash/infra/providers/hash.provider";
import UserPermissions from "../../infra/orm/entities/user-permissions.entity";

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
    const user = await this.userRepository.create(data);
    const userPermissions = await this.userPermissionsRepository.create({ user: user });
    return { user, userPermissions };
  }
}

export default CreateUserAndVinculateUserPermissionsService;
