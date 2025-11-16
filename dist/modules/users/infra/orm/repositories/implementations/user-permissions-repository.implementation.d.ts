import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import UserPermissions from "../../entities/user-permissions.entity";
import UserPermissionsQueryOptionsDTO from "../../../../dtos/user-permissions-query-options.dto";
declare class UserPermissionsRepository implements RepositoryProvider<UserPermissions> {
    private repository;
    constructor();
    find(options: UserPermissionsQueryOptionsDTO): Promise<UserPermissions[]>;
    create(data: Partial<UserPermissions>): Promise<UserPermissions>;
    update(id: string, data: Partial<UserPermissions>): Promise<void>;
    delete(id: string): Promise<void>;
}
export default UserPermissionsRepository;
//# sourceMappingURL=user-permissions-repository.implementation.d.ts.map