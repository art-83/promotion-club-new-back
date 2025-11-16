"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_entity_1 = __importDefault(require("../../entities/product.entity"));
const database_1 = __importDefault(require("../../../../../../shared/infra/orm/database"));
class ProductRepository {
    repository;
    constructor() {
        this.repository = database_1.default.getRepository(product_entity_1.default);
    }
    async find(options) {
        const query = this.repository.createQueryBuilder("products");
        if (options.id)
            query.andWhere("products.id = :id", { id: options.id });
        if (options.name)
            query.andWhere("products.name = :name", { name: options.name });
        if (options.price)
            query.andWhere("products.price = :price", {
                price: options.price,
            });
        if (options.join_store)
            query.leftJoinAndSelect("products.store", "stores");
        if (options.start_date)
            query.andWhere("products.create_at >= :start_date", {
                start_date: options.start_date,
            });
        if (options.end_date)
            query.andWhere("products.create_at <= :end_date", {
                end_date: options.end_date,
            });
        if (options.offset)
            query.skip(options.offset);
        if (options.limit)
            query.take(options.limit);
        return await query.getMany();
    }
    async create(data) {
        const createProduct = this.repository.create(data);
        const saveProduct = await this.repository.save(createProduct);
        return saveProduct;
    }
    async update(id, data) {
        await this.repository.update(id, data);
    }
    async delete(id) {
        await this.repository.delete(id);
    }
}
exports.default = ProductRepository;
//# sourceMappingURL=product-repository.implementation.js.map