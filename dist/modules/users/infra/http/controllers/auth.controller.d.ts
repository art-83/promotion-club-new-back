import { Request, Response } from "express";
declare class AuthController {
    signUp(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    signIn(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}
export default AuthController;
//# sourceMappingURL=auth.controller.d.ts.map