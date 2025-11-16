"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const image_controller_1 = __importDefault(require("../controllers/image.controller"));
const multer_config_1 = __importDefault(require("../../../../../config/multer.config"));
const imageRoutes = (0, express_1.Router)();
const imageController = new image_controller_1.default();
imageRoutes.post("/", multer_config_1.default.single("image"), (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        product_id: celebrate_1.Joi.string().uuid().required(),
    },
}), imageController.create);
exports.default = imageRoutes;
//# sourceMappingURL=image.routes.js.map