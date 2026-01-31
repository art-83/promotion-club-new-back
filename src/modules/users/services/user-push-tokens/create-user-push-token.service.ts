import { injectable, inject } from "tsyringe";
import UserPushToken from "../../infra/orm/entities/user-push-token.entity";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import CreateOrUpdateUserPushTokenDTO from "../../dtos/user-push-tokens/create-or-update-user-push-token.dto";
import AppError from "../../../../shared/infra/http/errors/app-error";
import User from "../../infra/orm/entities/user.entity";

@injectable()
class CreateUserPushTokenService {
  constructor(
    @inject("UserPushTokenRepository")
    private userPushTokenRepository: RepositoryProvider<UserPushToken>,
    @inject("UserRepository")
    private userRepository: RepositoryProvider<User>
  ) {}

  public async execute(user_id: string, data: Partial<CreateOrUpdateUserPushTokenDTO>): Promise<UserPushToken> {
    const user = (await this.userRepository.find({ id: user_id })).at(0);
    if (!user) throw new AppError(404, "User not found.");
    data.user = user;
    return await this.userPushTokenRepository.create(data);
  }
}

export default CreateUserPushTokenService;
