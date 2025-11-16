import StoreQueryOptionsDTO from "../../../dtos/store-query-options.dto";
import { Request, Response } from "express";
declare class StoreController {
    create(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    show(request: Request<{}, {}, {}, StoreQueryOptionsDTO>, response: Response): Promise<Response<any, Record<string, any>>>;
    update(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    delete(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}
export default StoreController;
//# sourceMappingURL=store.controller.d.ts.map