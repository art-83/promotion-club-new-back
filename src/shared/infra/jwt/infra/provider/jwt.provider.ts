import JwtPayloadDTO from "../../dto/jwt-payload.dto";

interface JwtProvider {
  generate(data: JwtPayloadDTO): string;
  validate(token: string): JwtPayloadDTO;
}

export default JwtProvider;
