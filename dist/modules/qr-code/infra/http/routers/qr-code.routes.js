"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const qr_code_controller_1 = __importDefault(require("../controllers/qr-code.controller"));
const auth_middleware_1 = __importDefault(require("../../../../../shared/infra/http/middlewares/auth.middleware"));
const qrCodeRoutes = (0, express_1.Router)();
const qrCodeController = new qr_code_controller_1.default();
qrCodeRoutes.use(auth_middleware_1.default);
qrCodeRoutes.post("/", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        promotion_id: celebrate_1.Joi.string().uuid().required(),
    },
}), qrCodeController.create);
qrCodeRoutes.delete("/:id", qrCodeController.validate);
exports.default = qrCodeRoutes;
//# sourceMappingURL=qr-code.routes.js.map