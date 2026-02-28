import { inject, injectable } from "tsyringe";
import RepositoryProvider from "../../../../shared/infra/orm/repositories/providers/repository.provider";
import User from "../../infra/orm/entities/user.entity";
import AppError from "../../../../shared/infra/http/errors/app-error";
import HashProvider from "../../../../shared/infra/hash/infra/providers/hash.provider";
import JwtProvider from "../../../../shared/infra/jwt/infra/provider/jwt.provider";
import JwtPayloadDTO from "../../../../shared/infra/jwt/dto/jwt-payload.dto";

@injectable()
class CreateUserSessionService {
  constructor(
    @inject("UserRepository")
    private userRepository: RepositoryProvider<User>,
    @inject("Hash")
    private hash: HashProvider,
    @inject("Jwt")
    private jwt: JwtProvider<JwtPayloadDTO>
  ) {}

  public async execute(email: string, password: string): Promise<{ message: string; token: string }> {
    const userByEmail = (await this.userRepository.find({ email })).at(0);

    // Use same generic message for missing user and wrong password to avoid revealing if email exists
    if (!userByEmail) throw new AppError(401, "Invalid credentials.", "Credenciais inválidas.");

    const passwordMatch = await this.hash.compare(password, userByEmail.password);

    if (!passwordMatch) throw new AppError(401, "Invalid credentials.", "Credenciais inválidas.");

    const token = this.jwt.generate({ user_id: userByEmail.id });
    return { message: "User logged successfully!", token };
  }
}

export default CreateUserSessionService;
