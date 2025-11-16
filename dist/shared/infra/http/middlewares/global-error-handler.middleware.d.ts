import { Request, Response, NextFunction } from "express";
declare const globalErrorHandler: (error: Error, request: Request, response: Response, next: NextFunction) => Response<any, Record<string, any>>;
export default globalErrorHandler;
//# sourceMappingURL=global-error-handler.middleware.d.ts.map