import { inject, injectable } from "tsyringe";
import JwtProvider from "../infra/provider/jwt.provider";
import JwtPayloadDTO from "../dto/jwt-payload.dto";

@injectable()
class GenerateJwtService {
  constructor(
    @inject("Jwt")
    private jwt: JwtProvider<JwtPayloadDTO>
  ) {}

  public execute(data: JwtPayloadDTO): string {
    return this.jwt.generate(data);
  }
}

export default GenerateJwtService;
