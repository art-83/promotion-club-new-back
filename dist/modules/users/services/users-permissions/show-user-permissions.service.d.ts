import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import UserPermissions from "../../infra/orm/entities/user-permissions.entity";
import UserPermissionsQueryOptionsDTO from "../../dtos/users-permissions/user-permissions-query-options.dto";
declare class ShowUserPermissionsService {
    private userPermissionsRepository;
    constructor(userPermissionsRepository: RepositoryProvider<UserPermissions>);
    execute(options: Partial<UserPermissionsQueryOptionsDTO>): Promise<UserPermissions[]>;
}
export default ShowUserPermissionsService;
//# sourceMappingURL=show-user-permissions.service.d.ts.map