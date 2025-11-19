"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const productRoutes = (0, express_1.Router)();
const productController = new product_controller_1.default();
productRoutes.post("/", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        price: celebrate_1.Joi.number().required(),
        store_id: celebrate_1.Joi.string().uuid().required(),
        image_id: celebrate_1.Joi.string().uuid().optional(),
    },
}), productController.create);
productRoutes.get("/", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.QUERY]: {
        id: celebrate_1.Joi.string().uuid(),
        name: celebrate_1.Joi.string(),
        price: celebrate_1.Joi.number(),
        start_price: celebrate_1.Joi.number(),
        end_price: celebrate_1.Joi.number(),
        store_id: celebrate_1.Joi.string().uuid(),
        join_store: celebrate_1.Joi.boolean(),
        join_image: celebrate_1.Joi.boolean(),
    },
}), productController.show);
productRoutes.put("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().optional(),
        price: celebrate_1.Joi.number().optional(),
        store_id: celebrate_1.Joi.string().uuid().optional(),
        image_id: celebrate_1.Joi.string().uuid().optional(),
    },
}), productController.update);
productRoutes.delete("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
}), productController.delete);
exports.default = productRoutes;
//# sourceMappingURL=product.routes.js.map