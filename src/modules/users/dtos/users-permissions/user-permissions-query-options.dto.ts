import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";
import UserPermissions from "../../infra/orm/entities/user-permissions.entity";

interface UserPermissionsQueryOptionsDTO extends UserPermissions, DefaultQueryOptions {
  user_id: string;
}

export default UserPermissionsQueryOptionsDTO;
