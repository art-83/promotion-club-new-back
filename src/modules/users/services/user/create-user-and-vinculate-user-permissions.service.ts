import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import User from "../../infra/orm/entities/user.entity";
import HashProvider from "../../../../shared/infra/hash/infra/providers/hash.provider";
import UserPermissions from "../../infra/orm/entities/user-permissions.entity";
import Permissions from "../../../../shared/infra/http/middlewares/utils/permissions";
import AppError from "../../../../shared/infra/http/errors/app-error";

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
    const [hasUserByCPF, hasUserByEmail] = await Promise.all([
      (await this.userRepository.find({ cpf: data.cpf })).at(0),
      (await this.userRepository.find({ email: data.email })).at(0),
    ]);

    if (hasUserByCPF || hasUserByEmail) throw new AppError(409, "User already registered.");

    const passwordHash = await this.hash.encrypt(String(data.password));
    data.password = passwordHash;
    const defaultPermissions = [Permissions.GET_ME, Permissions.SHOW_PROMOTIONS, Permissions.CREATE_QR_CODE, Permissions.SHOW_STORES, Permissions.SHOW_USER_PROMOTION_TICKETS];
    const user = await this.userRepository.create(data);
    const userPermissions = await this.userPermissionsRepository.create({ user: user, permissions: defaultPermissions });
    return { user, userPermissions };
  }
}

export default CreateUserAndVinculateUserPermissionsService;
