import DefaultQueryOptions from "../../../shared/infra/orm/dtos/default-query-options.dto";
import User from "../infra/orm/entities/user.entity";
interface UserQueryOptionsDTO extends User, DefaultQueryOptions {
    join_store: boolean;
}
export default UserQueryOptionsDTO;
//# sourceMappingURL=user-query-options.dto.d.ts.map