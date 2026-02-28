import { inject, injectable } from "tsyringe";
import User from "../../../infra/orm/entities/user.entity";
import RepositoryProvider from "../../../../../shared/infra/orm/repositories/providers/repository.provider";
import HashProvider from "../../../../../shared/infra/hash/infra/providers/hash.provider";
import PasswordResetTokenBlacklistCache from "../../../infra/cache/implementation/password-reset-token-blacklist-cache.implementation";
import ChangePasswordDTO from "../../../dtos/users/change-password.dto";
import RequestPasswordResetPayloadDTO from "../../../dtos/users/request-password-reset-payload.dto";
import JwtProvider from "../../../../../shared/infra/jwt/infra/provider/jwt.provider";
import AppError from "../../../../../shared/infra/http/errors/app-error";

@injectable()
class ChangeUserPasswordService {
  constructor(
    @inject("UserRepository")
    private userRepository: RepositoryProvider<User>,
    @inject("Hash")
    private hash: HashProvider,
    @inject("PasswordResetJwt")
    private passwordResetJwt: JwtProvider<RequestPasswordResetPayloadDTO>,
    @inject("PasswordResetTokenBlacklistCache")
    private passwordResetTokenBlacklistCache: PasswordResetTokenBlacklistCache
  ) {}

  public async execute(authorizationHeader: string, data: ChangePasswordDTO) {
    const token = authorizationHeader.split(" ")[1];
    if (!token) throw new AppError(401, "Missing or invalid Authorization header.", "Header de autorização ausente ou inválido.");
    const blacklisted = await this.passwordResetTokenBlacklistCache.find(token);
    if (blacklisted) throw new AppError(400, "Token already used.", "Token já utilizado.");
    const decodedToken = this.passwordResetJwt.validate(token);
    const user = (await this.userRepository.find({ email: decodedToken.email })).at(0);
    if (!user) throw new AppError(400, "User not found.", "Usuário não encontrado.");
    const passwordHash = await this.hash.encrypt(String(data.password));
    user.password = passwordHash;
    await this.userRepository.update(user.id, user);
    await this.passwordResetTokenBlacklistCache.create(token);
    return { message: "Password changed successfully." };
  }
}

export default ChangeUserPasswordService;
