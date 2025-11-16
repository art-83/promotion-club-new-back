import UserQueryOptionsDTO from "../../dtos/user-query-options.dto";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import User from "../../infra/orm/entities/user.entity";
declare class ShowUsersServices {
    private userRepository;
    constructor(userRepository: RepositoryProvider<User>);
    execute(options: Partial<UserQueryOptionsDTO>): Promise<User[]>;
}
export default ShowUsersServices;
//# sourceMappingURL=show-users.service.d.ts.map