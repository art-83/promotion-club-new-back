import { inject, injectable } from "tsyringe";
import JwtProvider from "../infra/provider/jwt.provider";
import JwtPayloadDTO from "../dto/jwt-payload.dto";
import AppError from "../../http/errors/app-error";

@injectable()
class ValidateJwtService {
  constructor(
    @inject("Jwt")
    private jwt: JwtProvider<JwtPayloadDTO>
  ) {}

  public execute(token: string): JwtPayloadDTO {
    const jwt = token.split(" ").at(1);
    if (!jwt) throw new AppError(401, "Token must be provided.", "O token deve ser fornecido.");
    return this.jwt.validate(jwt);
  }
}

export default ValidateJwtService;
