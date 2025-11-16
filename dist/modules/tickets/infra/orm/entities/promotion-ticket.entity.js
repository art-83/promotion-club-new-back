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
const user_entity_1 = __importDefault(require("../../../../users/infra/orm/entities/user.entity"));
const promotion_entity_1 = __importDefault(require("../../../../promotions/infra/orm/entities/promotion.entity"));
let PromotionTicket = class PromotionTicket {
    id;
    saved_money;
    created_at;
    user;
    promotion;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], PromotionTicket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PromotionTicket.prototype, "saved_money", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PromotionTicket.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.default, (user) => user.promotional_ticket),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.default)
], PromotionTicket.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => promotion_entity_1.default, (promotion) => promotion.promotion_tickets),
    (0, typeorm_1.JoinColumn)({ name: "promotion_id" }),
    __metadata("design:type", promotion_entity_1.default)
], PromotionTicket.prototype, "promotion", void 0);
PromotionTicket = __decorate([
    (0, typeorm_1.Entity)({ name: "promotion_tickets" })
], PromotionTicket);
exports.default = PromotionTicket;
//# sourceMappingURL=promotion-ticket.entity.js.map