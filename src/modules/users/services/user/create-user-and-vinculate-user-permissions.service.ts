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

  public async execute(data: Partial<User>): Promise<{ message: string }> {
    const [hasUserByCPF, hasUserByEmail] = await Promise.all([
      (await this.userRepository.find({ cpf: data.cpf })).at(0),
      (await this.userRepository.find({ email: data.email })).at(0),
    ]);

    // Generic message to avoid revealing whether email or CPF is already taken
    if (hasUserByCPF || hasUserByEmail) throw new AppError(409, "Data provided is already in use.", "Os dados informados já estão vinculados a uma conta.");

    const passwordHash = await this.hash.encrypt(String(data.password));
    data.password = passwordHash;
    const defaultPermissions = [
      Permissions.GET_ME,
      Permissions.SHOW_PROMOTIONS,
      Permissions.CREATE_QR_CODE,
      Permissions.SHOW_STORES,
      Permissions.SHOW_USER_PROMOTION_TICKETS,
      Permissions.SHOW_RECOMMENDED_PROMOTIONS_BY_PROMOTION_TICKET,
      Permissions.CREATE_USER_PUSH_TOKEN,
      Permissions.CREATE_USER_STORE_OPTIONS,
      Permissions.DELETE_USER_STORE_OPTIONS,
      Permissions.SHOW_USER_STORE_OPTIONS,
      Permissions.SHOW_QR_CODES,
      Permissions.SHOW_BENEFITS,
      Permissions.SHOW_USER_BENEFITS,
      Permissions.CREATE_USER_BENEFIT,
      Permissions.DELETE_USER_BENEFIT,
      Permissions.SHOW_STORE_RATINGS,
      Permissions.CREATE_STORE_RATING,
      Permissions.UPDATE_STORE_RATING,
      Permissions.DELETE_STORE_RATING,
      Permissions.SHOW_BENEFIT_TIERS,
    ];
    const user = await this.userRepository.create(data);
    const userPermissions = await this.userPermissionsRepository.create({ user: user, permissions: defaultPermissions });
    return { message: "User logged successfully!" };
  }
}

export default CreateUserAndVinculateUserPermissionsService;
