"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_controller_1 = __importDefault(require("../controllers/image.controller"));
const multer_config_1 = __importDefault(require("../../../../../config/multer.config"));
const imageRoutes = (0, express_1.Router)();
const imageController = new image_controller_1.default();
imageRoutes.post("/", multer_config_1.default.single("image"), imageController.create);
exports.default = imageRoutes;
//# sourceMappingURL=image.routes.js.map