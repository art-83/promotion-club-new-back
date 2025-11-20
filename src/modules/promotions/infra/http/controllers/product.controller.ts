import ProductsQueryOptionsDTO from "../../../dtos/products/product-query-options.dto";
import CreateProductService from "../../../services/products/create-product.service";
import DeleteProductService from "../../../services/products/delete-product.service";
import ShowProductsServices from "../../../services/products/show-products.service";
import UpdateProductService from "../../../services/products/update-product.service";
import { Request, Response } from "express";
import { container } from "tsyringe";

class ProductController {
  public async create(request: Request, response: Response) {
    const createProductService = container.resolve(CreateProductService);
    const createProduct = await createProductService.execute(request.body);
    return response.status(201).json(createProduct);
  }

  public async show(request: Request<{}, {}, {}, ProductsQueryOptionsDTO>, response: Response) {
    const showProductsService = container.resolve(ShowProductsServices);
    const showProducts = await showProductsService.execute(request.query);
    return response.status(200).json(showProducts);
  }

  public async update(request: Request, response: Response) {
    const id = String(request.params.id);
    const updateProductService = container.resolve(UpdateProductService);
    await updateProductService.execute(id, request.body);
    return response.status(200).send();
  }

  public async delete(request: Request, response: Response) {
    const id = String(request.params.id);
    const deleteProductService = container.resolve(DeleteProductService);
    await deleteProductService.execute(id);
    return response.status(204).send();
  }
}

export default ProductController;
