"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userRoutes = (0, express_1.Router)();
const userController = new user_controller_1.default();
userRoutes.get("/me", userController.me);
userRoutes.get("/", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.QUERY]: {
        id: celebrate_1.Joi.string().uuid(),
        name: celebrate_1.Joi.string(),
    },
}), userController.show);
exports.default = userRoutes;
//# sourceMappingURL=user.routes.js.map