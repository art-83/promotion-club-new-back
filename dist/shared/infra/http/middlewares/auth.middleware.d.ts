import { Request, Response, NextFunction } from "express";
declare const authMiddleware: (request: Request, response: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default authMiddleware;
//# sourceMappingURL=auth.middleware.d.ts.map