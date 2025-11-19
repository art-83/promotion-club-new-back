"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../../../../../shared/infra/orm/database"));
const image_entity_1 = __importDefault(require("../../entities/image.entity"));
class ImageRepository {
    repository;
    constructor() {
        this.repository = database_1.default.getRepository(image_entity_1.default);
    }
    async create(data) {
        const createImage = this.repository.create(data);
        const saveImage = await this.repository.save(createImage);
        return saveImage;
    }
    async find(options) {
        const query = this.repository.createQueryBuilder("image");
        query.andWhere("image.id = :id", { id: options.id });
        return await query.getMany();
    }
}
exports.default = ImageRepository;
//# sourceMappingURL=image-repository.implementation.js.map