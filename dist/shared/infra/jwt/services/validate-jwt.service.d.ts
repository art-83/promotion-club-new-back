import JwtProvider from "../infra/provider/jwt.provider";
import JwtPayloadDTO from "../dto/jwt-payload.dto";
declare class ValidateJwtService {
    private jwt;
    constructor(jwt: JwtProvider);
    execute(token: string): JwtPayloadDTO;
}
export default ValidateJwtService;
//# sourceMappingURL=validate-jwt.service.d.ts.map