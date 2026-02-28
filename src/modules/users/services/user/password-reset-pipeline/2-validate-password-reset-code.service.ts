import { inject, injectable } from "tsyringe";
import ValidatePasswordResetDTO from "../../../dtos/users/validate-password-reset.dto";
import RequestPasswordResetPayloadDTO from "../../../dtos/users/request-password-reset-payload.dto";
import CacheProvider from "../../../../../shared/infra/cache/infra/providers/cache.provider";
import JwtProvider from "../../../../../shared/infra/jwt/infra/provider/jwt.provider";
import AppError from "../../../../../shared/infra/http/errors/app-error";

@injectable()
class ValidatePasswordResetCodeService {
  constructor(
    @inject("PasswordResetCache")
    private passwordResetCache: CacheProvider<RequestPasswordResetPayloadDTO>,
    @inject("PasswordResetJwt")
    private passwordResetJwt: JwtProvider<RequestPasswordResetPayloadDTO>,
  ) {}

  public async execute(data: ValidatePasswordResetDTO) {
    const cacheData = await this.passwordResetCache.find(data.email);
    if (!cacheData) throw new AppError(400, "Password reset code not found.", "Código de redefinição de senha não encontrado.");
    const cacheDataParsed = JSON.parse(cacheData);
    if (cacheDataParsed.code !== data.code) throw new AppError(400, "Invalid code.", "Código inválido.");
    const passwordResetJwt = this.passwordResetJwt.generate({ email: data.email, code: data.code });
    return passwordResetJwt;
  }
}

export default ValidatePasswordResetCodeService;
