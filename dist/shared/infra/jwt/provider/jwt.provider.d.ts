import JwtPayloadDTO from "../dto/jwt-payload.dto";
interface JwtProvider {
  encode(data: JwtPayloadDTO): string;
  decode(token: string): JwtPayloadDTO;
}
export default JwtProvider;
//# sourceMappingURL=jwt.provider.d.ts.map
