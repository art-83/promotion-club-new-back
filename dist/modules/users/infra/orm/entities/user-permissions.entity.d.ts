import User from "./user.entity";
import Store from "../../../../stores/infra/orm/entities/store.entity";
declare class UserPermissions {
    id: string;
    permissions: string[];
    store: Store;
    user: User;
}
export default UserPermissions;
//# sourceMappingURL=user-permissions.entity.d.ts.map