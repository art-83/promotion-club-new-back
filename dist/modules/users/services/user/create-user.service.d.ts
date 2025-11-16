import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import User from "../../infra/orm/entities/user.entity";
import HashProvider from "../../../../shared/infra/hash/infra/providers/hash.provider";
import UserPermissions from "../../infra/orm/entities/user-permissions.entity";
declare class CreateUserService {
    private userRepository;
    private userPermissionsRepository;
    private hash;
    constructor(userRepository: RepositoryProvider<User>, userPermissionsRepository: RepositoryProvider<UserPermissions>, hash: HashProvider);
    execute(data: Partial<User>): Promise<{
        user: User;
        userPermissions: UserPermissions;
    }>;
}
export default CreateUserService;
//# sourceMappingURL=create-user.service.d.ts.map