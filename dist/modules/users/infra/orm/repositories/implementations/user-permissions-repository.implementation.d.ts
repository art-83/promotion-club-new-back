import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import UserPermissions from "../../entities/user-permissions.entity";
import UserPermissionsQueryOptionsDTO from "../../../../dtos/users-permissions/user-permissions-query-options.dto";
import CreateOrUpdateUserPermissions from "../../../../dtos/users-permissions/create-or-update-user-permissions.dto";
declare class UserPermissionsRepository implements RepositoryProvider<UserPermissions> {
    private repository;
    constructor();
    find(options: UserPermissionsQueryOptionsDTO): Promise<UserPermissions[]>;
    create(data: Partial<CreateOrUpdateUserPermissions>): Promise<UserPermissions>;
    update(id: string, data: Partial<CreateOrUpdateUserPermissions>): Promise<void>;
    delete(id: string): Promise<void>;
}
export default UserPermissionsRepository;
//# sourceMappingURL=user-permissions-repository.implementation.d.ts.map