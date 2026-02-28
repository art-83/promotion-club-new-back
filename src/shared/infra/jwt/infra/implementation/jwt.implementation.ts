import JwtPayloadDTO from "../../dto/jwt-payload.dto";
import JwtProvider from "../provider/jwt.provider";
import jwt, { Algorithm } from "jsonwebtoken";
import jwtConfig from "../../../../../config/jwt.config";

class Jwt implements JwtProvider <JwtPayloadDTO> {
  public generate(data: JwtPayloadDTO): string {
    return jwt.sign(data, jwtConfig.secret.default, {
      algorithm: jwtConfig.algorithm as Algorithm,
    });
  }

  public validate(token: string): JwtPayloadDTO {
    return jwt.verify(token, jwtConfig.secret.default, {
      algorithms: [jwtConfig.algorithm as Algorithm],
    }) as JwtPayloadDTO;
  }
}

export default Jwt;
