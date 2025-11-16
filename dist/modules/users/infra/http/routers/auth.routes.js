"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const celebrate_1 = require("celebrate");
const authRouter = (0, express_1.Router)();
const authController = new auth_controller_1.default();
authRouter.post("/sign-up", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
        cpf: celebrate_1.Joi.string().required(),
    },
}), authController.signUp);
authRouter.post("/sign-in", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
    },
}), authController.signIn);
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map