import { inject, injectable } from "tsyringe";
import PasswordResetCache from "../../infra/cache/implementation/password-reset-cache.implementation";
import ValidatePasswordResetDTO from "../../dtos/users/validate-password-reset.dto";
import PasswordResetPayloadDTO from "../../dtos/users/password-reset-payload.dto";
import CacheProvider from "../../../../shared/infra/cache/infra/providers/cache.provider";
import JwtProvider from "../../../../shared/infra/jwt/infra/provider/jwt.provider";
import AppError from "../../../../shared/infra/http/errors/app-error";

@injectable()
class ValidatePasswordResetCodeService {
  constructor(
    @inject("PasswordResetCache")
    private passwordResetCache: CacheProvider<PasswordResetPayloadDTO>,
    @inject("PasswordResetJwt")
    private passwordResetJwt: JwtProvider<PasswordResetPayloadDTO>,
    @inject("PasswordResetTokenBlacklistCache")
    private passwordResetTokenBlacklistCache: CacheProvider<string>,
  ) {}

  public async execute(data: ValidatePasswordResetDTO) {
    console.log("data", data);
    const cacheData = await this.passwordResetCache.find(data.email);
    console.log("cacheData", cacheData);
    if (!cacheData) throw new AppError(400, "Password reset code not found.", "Código de redefinição de senha não encontrado.");
    const cacheDataParsed = JSON.parse(cacheData);
    if (cacheDataParsed.code !== data.code) throw new AppError(400, "Invalid code.", "Código inválido.");
    const passwordResetJwt = this.passwordResetJwt.generate({ email: data.email, code: data.code });
    await this.passwordResetTokenBlacklistCache.create(passwordResetJwt);
    return passwordResetJwt;
  }
}

export default ValidatePasswordResetCodeService;