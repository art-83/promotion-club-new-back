"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const create_image_service_1 = __importDefault(require("../../../services/create-image.service"));
class ImageController {
    async create(request, response) {
        const createImageService = tsyringe_1.container.resolve(create_image_service_1.default);
        const image = await createImageService.execute(request);
        return response.status(201).json(image);
    }
}
exports.default = ImageController;
//# sourceMappingURL=image.controller.js.map