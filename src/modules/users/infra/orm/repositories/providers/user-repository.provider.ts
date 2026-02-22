import User from "../../entities/user.entity";
import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";

interface UserRepositoryProvider extends RepositoryProvider<User> {
    totalSpentByUser(id: string): Promise<number>;
}

export default UserRepositoryProvider;