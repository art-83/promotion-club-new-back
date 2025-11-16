import ProductsQueryOptionsDTO from "../../../dtos/products/product-query-options.dto";
import { Request, Response } from "express";
declare class ProductController {
    create(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    show(request: Request<{}, {}, {}, ProductsQueryOptionsDTO>, response: Response): Promise<Response<any, Record<string, any>>>;
    update(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    delete(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}
export default ProductController;
//# sourceMappingURL=product.controller.d.ts.map