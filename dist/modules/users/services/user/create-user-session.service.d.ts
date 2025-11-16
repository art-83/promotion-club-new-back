import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import User from "../../infra/orm/entities/user.entity";
import HashProvider from "../../../../shared/infra/hash/infra/providers/hash.provider";
import JwtProvider from "../../../../shared/infra/jwt/infra/provider/jwt.provider";
declare class CreateUserSessionService {
    private userRepository;
    private hash;
    private jwt;
    constructor(userRepository: RepositoryProvider<User>, hash: HashProvider, jwt: JwtProvider);
    execute(email: string, password: string): Promise<{
        user: User;
        token: string;
    }>;
}
export default CreateUserSessionService;
//# sourceMappingURL=create-user-session.service.d.ts.map