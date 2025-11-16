"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const app_error_1 = __importDefault(require("../../../shared/infra/http/errors/app-error"));
let CreateImageService = class CreateImageService {
    imageRepository;
    productRepository;
    constructor(imageRepository, productRepository) {
        this.imageRepository = imageRepository;
        this.productRepository = productRepository;
    }
    async execute(data) {
        if (!data.file)
            throw new app_error_1.default(400, "Image not provided.");
        const product = (await this.productRepository.find({ id: data.body.product_id })).at(0);
        if (!product)
            throw new app_error_1.default(404, "Product not found.");
        const image = await this.imageRepository.create({
            name: data.file.originalname,
            path: data.file.filename,
            mimetype: data.file.mimetype,
            product: product,
        });
        return image;
    }
};
CreateImageService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ImageRepository")),
    __param(1, (0, tsyringe_1.inject)("ProductRepository")),
    __metadata("design:paramtypes", [Object, Object])
], CreateImageService);
exports.default = CreateImageService;
//# sourceMappingURL=create-image.service.js.map