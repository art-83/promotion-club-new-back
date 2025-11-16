"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_promotion_service_1 = __importDefault(require("../../../services/promotions/create-promotion.service"));
const delete_promotion_service_1 = __importDefault(require("../../../services/promotions/delete-promotion.service"));
const show_promotions_service_1 = __importDefault(require("../../../services/promotions/show-promotions.service"));
const update_promotion_service_1 = __importDefault(require("../../../services/promotions/update-promotion.service"));
const tsyringe_1 = require("tsyringe");
class PromotionController {
    async create(request, response) {
        const createPromotionService = tsyringe_1.container.resolve(create_promotion_service_1.default);
        const createPromotion = await createPromotionService.execute(request.body);
        return response.status(201).json(createPromotion);
    }
    async show(request, response) {
        const showPromotionsService = tsyringe_1.container.resolve(show_promotions_service_1.default);
        const showPromotions = await showPromotionsService.execute(request.query);
        return response.status(200).json(showPromotions);
    }
    async update(request, response) {
        const id = String(request.params.id);
        const updatePromotionService = tsyringe_1.container.resolve(update_promotion_service_1.default);
        const updatePromotion = await updatePromotionService.execute(id, request.body);
        return response.status(200).json(updatePromotion);
    }
    async delete(request, response) {
        const id = String(request.params.id);
        const deletePromotionService = tsyringe_1.container.resolve(delete_promotion_service_1.default);
        await deletePromotionService.execute(id);
        return response.status(204).send();
    }
}
exports.default = PromotionController;
//# sourceMappingURL=promotion.controller.js.map