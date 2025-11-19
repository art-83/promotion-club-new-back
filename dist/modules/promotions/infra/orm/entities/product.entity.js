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
const promotion_entity_1 = __importDefault(require("./promotion.entity"));
const store_entity_1 = __importDefault(require("../../../../stores/infra/orm/entities/store.entity"));
const image_entity_1 = __importDefault(require("../../../../images/infra/orm/entities/image.entity"));
let Product = class Product {
    id;
    name;
    price;
    created_at;
    updated_at;
    // relations
    store;
    image;
    promotion;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal" }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => store_entity_1.default, (store) => store.products, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "store_id" }),
    __metadata("design:type", store_entity_1.default)
], Product.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => image_entity_1.default, (image) => image.product, {
        onDelete: "CASCADE",
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "image_id" }),
    __metadata("design:type", image_entity_1.default)
], Product.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => promotion_entity_1.default, (promotion) => promotion.product),
    __metadata("design:type", promotion_entity_1.default)
], Product.prototype, "promotion", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)({ name: "products" })
], Product);
exports.default = Product;
//# sourceMappingURL=product.entity.js.map