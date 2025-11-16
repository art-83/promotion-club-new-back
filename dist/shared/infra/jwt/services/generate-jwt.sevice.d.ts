import JwtProvider from "../infra/provider/jwt.provider";
import JwtPayloadDTO from "../dto/jwt-payload.dto";
declare class GenerateJwtService {
    private jwt;
    constructor(jwt: JwtProvider);
    execute(data: JwtPayloadDTO): string;
}
export default GenerateJwtService;
//# sourceMappingURL=generate-jwt.sevice.d.ts.map