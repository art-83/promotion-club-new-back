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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const product_entity_1 = __importDefault(require("../../../../promotions/infra/orm/entities/product.entity"));
let Image = class Image {
    id;
    name;
    path;
    mimetype;
    created_at;
    // relations
    product;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Image.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Image.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Image.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Image.prototype, "mimetype", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Image.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => product_entity_1.default, (product) => product.image, {
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: "product_id" }),
    __metadata("design:type", product_entity_1.default)
], Image.prototype, "product", void 0);
Image = __decorate([
    (0, typeorm_1.Entity)({ name: "images" })
], Image);
exports.default = Image;
//# sourceMappingURL=image.entity.js.map