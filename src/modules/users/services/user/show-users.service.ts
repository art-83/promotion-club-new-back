import { inject, injectable } from "tsyringe";
import UserQueryOptionsDTO from "../../dtos/users/user-query-options.dto";
import UserRepositoryProvider from "../../infra/orm/repositories/providers/user-repository.provider";

@injectable()
class ShowUsersServices {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepositoryProvider
  ) {}

  public async execute(options: Partial<UserQueryOptionsDTO>) {
    // to /users/me
    if (options.id) {
      const userQueryOptions = {
        id: options.id,
        join_user_permissions: true,
      } as UserQueryOptionsDTO;
      const [user, totalSpentByUser] = await Promise.all([
        this.userRepository.find(userQueryOptions),
        this.userRepository.totalSpentByUser(options.id),
      ]);
      return {
        ...user,
        total_spent: totalSpentByUser,
      };
    }
    // to /users
    return await this.userRepository.find(options);
  }
}

export default ShowUsersServices;
