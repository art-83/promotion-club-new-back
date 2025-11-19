"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const promotion_controller_1 = __importDefault(require("../controllers/promotion.controller"));
const promotionRoutes = (0, express_1.Router)();
const promotionController = new promotion_controller_1.default();
promotionRoutes.post("/", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        discount_percentage: celebrate_1.Joi.number().required(),
        product_id: celebrate_1.Joi.string().uuid().required(),
        expire_at: celebrate_1.Joi.date().required(),
    },
}), promotionController.create);
promotionRoutes.get("/", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.QUERY]: {
        id: celebrate_1.Joi.string().uuid(),
        discount_percentage: celebrate_1.Joi.number(),
        start_final_price: celebrate_1.Joi.number(),
        end_final_price: celebrate_1.Joi.number(),
        expire_at: celebrate_1.Joi.date(),
        store_id: celebrate_1.Joi.string().uuid(),
        start_date: celebrate_1.Joi.date(),
        end_date: celebrate_1.Joi.date(),
        offset: celebrate_1.Joi.number().integer(),
        limit: celebrate_1.Joi.number().integer(),
    },
}), promotionController.show);
promotionRoutes.put("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    [celebrate_1.Segments.BODY]: {
        discount_percentage: celebrate_1.Joi.number(),
        final_price: celebrate_1.Joi.number(),
        expire_at: celebrate_1.Joi.date(),
    },
}), promotionController.update);
promotionRoutes.delete("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
}), promotionController.delete);
exports.default = promotionRoutes;
//# sourceMappingURL=promotion.routes.js.map