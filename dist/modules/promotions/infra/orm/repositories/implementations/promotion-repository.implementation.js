"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promotion_entity_1 = __importDefault(require("../../entities/promotion.entity"));
const database_1 = __importDefault(require("../../../../../../shared/infra/orm/database"));
class PromotionRepository {
    repository;
    constructor() {
        this.repository = database_1.default.getRepository(promotion_entity_1.default);
    }
    async find(options) {
        const query = this.repository.createQueryBuilder("promotions");
        query.leftJoinAndSelect("promotions.product", "product");
        query.leftJoinAndSelect("product.image", "image");
        query.leftJoinAndSelect("product.store", "store");
        if (options.id)
            query.andWhere("promotions.id = :id", { id: options.id });
        if (options.discount_percentage) {
            query.andWhere("promotions.discount_percentage = :discount_percentage", {
                discount_percentage: options.discount_percentage,
            });
        }
        if (options.final_price)
            query.andWhere("promotions.final_price = :final_price", {
                final_price: options.final_price,
            });
        if (options.start_final_price)
            query.andWhere("promotions.final_price >= :start_final_price", { start_final_price: options.start_final_price });
        if (options.end_final_price)
            query.andWhere("promotions.final_price <= :end_final_price", { end_final_price: options.end_final_price });
        if (options.expire_at)
            query.andWhere("promotions.expire_at = :expire_at", {
                expire_at: options.expire_at,
            });
        if (options.store_id) {
            query.andWhere("product.store_id = :store_id", {
                store_id: options.store_id,
            });
        }
        if (options.start_date)
            query.andWhere("promotions.create_at >= :start_date", {
                start_date: options.start_date,
            });
        if (options.end_date)
            query.andWhere("promotions.create_at <= :end_date", {
                end_date: options.end_date,
            });
        if (options.offset)
            query.skip(options.offset);
        if (options.limit)
            query.take(options.limit);
        return await query.getMany();
    }
    async create(data) {
        const createPromotion = this.repository.create(data);
        const savePromotion = await this.repository.save(createPromotion);
        return savePromotion;
    }
    async update(id, data) {
        await this.repository.update(id, data);
    }
    async delete(id) {
        await this.repository.delete(id);
    }
    async removeAllExpiredPromotions() {
        const now = new Date();
        await this.repository.createQueryBuilder("promotions").delete().where("promotions.expire_at < :now", { now }).execute();
    }
}
exports.default = PromotionRepository;
//# sourceMappingURL=promotion-repository.implementation.js.map