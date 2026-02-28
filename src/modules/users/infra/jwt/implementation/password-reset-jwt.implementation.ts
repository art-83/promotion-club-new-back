import jwtConfig from "../../../../../config/jwt.config";
import JwtPayloadDTO from "../../../../../shared/infra/jwt/dto/jwt-payload.dto";
import JwtProvider from "../../../../../shared/infra/jwt/infra/provider/jwt.provider";
import jwt, { Algorithm } from "jsonwebtoken";
import RequestPasswordResetPayloadDTO from "../../../dtos/users/request-password-reset-payload.dto";

class PasswordResetJwt implements JwtProvider<RequestPasswordResetPayloadDTO> {
  public generate(data: RequestPasswordResetPayloadDTO): string {
    return jwt.sign(data, jwtConfig.secret.passwordReset, {
      algorithm: jwtConfig.algorithm as Algorithm,
      expiresIn: jwtConfig.expiresIn.passwordReset,
    });
  }

  public validate(token: string): RequestPasswordResetPayloadDTO {
    return jwt.verify(token, jwtConfig.secret.passwordReset, {
      algorithms: [jwtConfig.algorithm as Algorithm],
    }) as RequestPasswordResetPayloadDTO;
  }
}

export default PasswordResetJwt;
