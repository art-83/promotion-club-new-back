"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const store_controller_1 = __importDefault(require("../controllers/store.controller"));
const storeRoutes = (0, express_1.Router)();
const storeController = new store_controller_1.default();
storeRoutes.post("/", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        street: celebrate_1.Joi.string().required(),
        neighborhood: celebrate_1.Joi.string().required(),
        city: celebrate_1.Joi.string().required(),
        state: celebrate_1.Joi.string().required(),
        number: celebrate_1.Joi.string().required(),
    },
}), storeController.create);
storeRoutes.get("/", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.QUERY]: {
        id: celebrate_1.Joi.string().uuid(),
        street: celebrate_1.Joi.string(),
        neighborhood: celebrate_1.Joi.string(),
        city: celebrate_1.Joi.string(),
        state: celebrate_1.Joi.string(),
        number: celebrate_1.Joi.string(),
    },
}), storeController.show);
storeRoutes.put("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    [celebrate_1.Segments.BODY]: {
        street: celebrate_1.Joi.string(),
        neighborhood: celebrate_1.Joi.string(),
        city: celebrate_1.Joi.string(),
        state: celebrate_1.Joi.string(),
        number: celebrate_1.Joi.string(),
    },
}), storeController.update);
storeRoutes.delete("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
}), storeController.delete);
exports.default = storeRoutes;
//# sourceMappingURL=store.routes.js.map