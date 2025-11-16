import JwtPayloadDTO from "../../dto/jwt-payload.dto";
import JwtProvider from "../provider/jwt.provider";
declare class Jwt implements JwtProvider {
    generate(data: JwtPayloadDTO): string;
    validate(token: string): JwtPayloadDTO;
}
export default Jwt;
//# sourceMappingURL=jwt.implementation.d.ts.map