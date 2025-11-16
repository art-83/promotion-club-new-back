import RepositoryProvider from "../../../../../../shared/infra/orm/repositories/providers/repository.provider";
import User from "../../entities/user.entity";
import UserQueryOptionsDTO from "../../../../dtos/user-query-options.dto";
declare class UserRepository implements RepositoryProvider<User> {
    private repository;
    constructor();
    find(options: UserQueryOptionsDTO): Promise<User[]>;
    create(data: Partial<User>): Promise<User>;
    update(id: string, data: Partial<User>): Promise<void>;
    delete(id: string): Promise<void>;
}
export default UserRepository;
//# sourceMappingURL=user-repository.implemetation.d.ts.map