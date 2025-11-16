"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_product_service_1 = __importDefault(require("../../../services/products/create-product.service"));
const delete_product_service_1 = __importDefault(require("../../../services/products/delete-product.service"));
const show_products_service_1 = __importDefault(require("../../../services/products/show-products.service"));
const update_product_service_1 = __importDefault(require("../../../services/products/update-product.service"));
const tsyringe_1 = require("tsyringe");
class ProductController {
    async create(request, response) {
        const createProductService = tsyringe_1.container.resolve(create_product_service_1.default);
        const createProduct = await createProductService.execute(request.body);
        return response.status(201).json(createProduct);
    }
    async show(request, response) {
        const showProductsService = tsyringe_1.container.resolve(show_products_service_1.default);
        const showProducts = await showProductsService.execute(request.query);
        return response.status(200).json(showProducts);
    }
    async update(request, response) {
        const id = String(request.params.id);
        const updateProductService = tsyringe_1.container.resolve(update_product_service_1.default);
        const updateProduct = await updateProductService.execute(id, request.body);
        return response.status(200).json(updateProduct);
    }
    async delete(request, response) {
        const id = String(request.params.id);
        const deleteProductService = tsyringe_1.container.resolve(delete_product_service_1.default);
        await deleteProductService.execute(id);
        return response.status(204).send();
    }
}
exports.default = ProductController;
//# sourceMappingURL=product.controller.js.map