import { inject, injectable } from "tsyringe";
import UserQueryOptionsDTO from "../../dtos/users/user-query-options.dto";
import UserRepositoryProvider from "../../infra/orm/repositories/providers/user-repository.provider";
import AppError from "../../../../shared/infra/http/errors/app-error";
import User from "../../infra/orm/entities/user.entity";

@injectable()
class ShowUsersServices {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepositoryProvider
  ) {}

  public async execute(options: Partial<UserQueryOptionsDTO>): Promise<User[]> {
    // to /users/me
    if (options.id) {
      const userQueryOptions = {
        id: options.id,
        join_user_permissions: true,
      } as UserQueryOptionsDTO;
      const [user, totalSpentByUser] = await Promise.all([
        (await this.userRepository.find(userQueryOptions)).at(0),
        this.userRepository.totalSpentByUser(options.id),
      ]);
      
      if (!user) throw new AppError(404, "Resource not found.", "Recurso não encontrado.");

      const userWithTotalSpent = {
        ...user,
        total_spent: totalSpentByUser,
      };
      return [userWithTotalSpent];
    }
    // to /users
    return await this.userRepository.find(options);
  }
}

export default ShowUsersServices;
