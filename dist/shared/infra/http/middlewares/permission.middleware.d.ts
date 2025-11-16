import { Request, Response, NextFunction } from "express";
declare const permissionMiddleware: (requiredPermission: string) => (request: Request, response: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default permissionMiddleware;
//# sourceMappingURL=permission.middleware.d.ts.map