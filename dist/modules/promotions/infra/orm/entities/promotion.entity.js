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
const product_entity_1 = __importDefault(require("./product.entity"));
const promotion_ticket_entity_1 = __importDefault(require("../../../../tickets/infra/orm/entities/promotion-ticket.entity"));
let Promotion = class Promotion {
    id;
    is_approved;
    discount_percentage;
    expire_at;
    final_price;
    created_at;
    updated_at;
    product;
    promotion_tickets;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Promotion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Promotion.prototype, "is_approved", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Promotion.prototype, "discount_percentage", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Promotion.prototype, "expire_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Promotion.prototype, "final_price", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Promotion.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Promotion.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => product_entity_1.default, (product) => product.promotion, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "product_id" }),
    __metadata("design:type", product_entity_1.default)
], Promotion.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => promotion_ticket_entity_1.default, (promotion_tickets) => promotion_tickets.promotion),
    __metadata("design:type", Array)
], Promotion.prototype, "promotion_tickets", void 0);
Promotion = __decorate([
    (0, typeorm_1.Entity)({ name: "promotions" })
], Promotion);
exports.default = Promotion;
//# sourceMappingURL=promotion.entity.js.map