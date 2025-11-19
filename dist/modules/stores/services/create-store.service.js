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
let CreateStoreService = class CreateStoreService {
    storeRepository;
    imageRepository;
    constructor(storeRepository, imageRepository) {
        this.storeRepository = storeRepository;
        this.imageRepository = imageRepository;
    }
    async execute(data) {
        if (data.image_id) {
            const image = (await this.imageRepository.find({ id: data.image_id })).at(0);
            if (!image)
                throw new app_error_1.default(404, "Image not found");
            data.image = image;
        }
        const store = await this.storeRepository.create(data);
        return store;
    }
};
CreateStoreService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("StoreRepository")),
    __param(1, (0, tsyringe_1.inject)("ImageRepository")),
    __metadata("design:paramtypes", [Object, Object])
], CreateStoreService);
exports.default = CreateStoreService;
//# sourceMappingURL=create-store.service.js.map