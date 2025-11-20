import UserQueryOptionsDTO from "../../../dtos/users/user-query-options.dto";
import { Request, Response } from "express";
declare class UserController {
    show(request: Request<{}, {}, {}, UserQueryOptionsDTO>, response: Response): Promise<Response<any, Record<string, any>>>;
    updateUserPermissions(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    me(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}
export default UserController;
//# sourceMappingURL=user.controller.d.ts.map