import UserPermissions from "../../infra/orm/entities/user-permissions.entity";

interface CreateOrUpdateUserPermissions extends UserPermissions {
  store_id: string;
}

export default CreateOrUpdateUserPermissions;
