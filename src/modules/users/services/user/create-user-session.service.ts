import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import User from "../../infra/orm/entities/user.entity";
import AppError from "../../../../shared/infra/http/errors/app-error";
import HashProvider from "../../../../shared/infra/hash/infra/providers/hash.provider";
import JwtProvider from "../../../../shared/infra/jwt/infra/provider/jwt.provider";

@injectable()
class CreateUserSessionService {
  constructor(
    @inject("UserRepository")
    private userRepository: RepositoryProvider<User>,
    @inject("Hash")
    private hash: HashProvider,
    @inject("Jwt")
    private jwt: JwtProvider
  ) {}

  public async execute(email: string, password: string): Promise<{ user: User; token: string }> {
    const userByEmail = (await this.userRepository.find({ email })).at(0);

    if (!userByEmail) throw new AppError(404, "User not found.");

    const passwordMatch = await this.hash.compare(password, userByEmail.password);

    if (!passwordMatch) throw new AppError(401, "Invalid credentials.");

    const token = this.jwt.generate({ user_id: userByEmail.id });
    return { user: userByEmail, token };
  }
}

export default CreateUserSessionService;
