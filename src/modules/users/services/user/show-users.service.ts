import { inject, injectable } from "tsyringe";
import UserQueryOptionsDTO from "../../dtos/users/user-query-options.dto";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import User from "../../infra/orm/entities/user.entity";

@injectable()
class ShowUsersServices {
  constructor(
    @inject("UserRepository")
    private userRepository: RepositoryProvider<User>
  ) {}

  public async execute(options: Partial<UserQueryOptionsDTO>): Promise<User[]> {
    return await this.userRepository.find(options);
  }
}

export default ShowUsersServices;
