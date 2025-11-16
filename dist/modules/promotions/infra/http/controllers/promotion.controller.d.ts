import PromotionQueryOptionsDTO from "../../../dtos/promotions/promotion-query-options.dto";
import { Request, Response } from "express";
declare class PromotionController {
    create(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    show(request: Request<{}, {}, {}, PromotionQueryOptionsDTO>, response: Response): Promise<Response<any, Record<string, any>>>;
    update(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    delete(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}
export default PromotionController;
//# sourceMappingURL=promotion.controller.d.ts.map