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
let ValidateQrCodeService = class ValidateQrCodeService {
    cache;
    promotionTicketRepository;
    userRepository;
    promotionRepository;
    constructor(cache, promotionTicketRepository, userRepository, promotionRepository) {
        this.cache = cache;
        this.promotionTicketRepository = promotionTicketRepository;
        this.userRepository = userRepository;
        this.promotionRepository = promotionRepository;
    }
    async execute(user_id) {
        const qrCode = await this.cache.find(user_id);
        if (!qrCode)
            throw new app_error_1.default(404, "QrCode not found.");
        const qrCodeParsed = JSON.parse(qrCode);
        const userQueryOptions = {
            id: user_id,
        };
        const promotionsQueryOptions = {
            id: qrCodeParsed.promotion_id,
            join_product: true,
        };
        const [user, promotion] = await Promise.all([
            (await this.userRepository.find(userQueryOptions)).at(0),
            (await this.promotionRepository.find(promotionsQueryOptions)).at(0),
        ]);
        if (!user)
            throw new app_error_1.default(404, "User not found.");
        if (!promotion)
            throw new app_error_1.default(404, "Promotion not found.");
        const createPromotionTicketData = {
            saved_money: promotion.product.price - promotion.final_price,
            user: user,
            promotion: promotion,
        };
        const createPromotionTicket = await this.promotionTicketRepository.create(createPromotionTicketData);
        const removeQrCode = await this.cache.delete(user_id);
        if (removeQrCode == 0)
            throw new app_error_1.default(404, "QrCode invalid or expired.");
        return { message: "QrCode validated successfuly.", createPromotionTicket };
    }
};
ValidateQrCodeService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("CacheProvider")),
    __param(1, (0, tsyringe_1.inject)("PromotionTicketRepository")),
    __param(2, (0, tsyringe_1.inject)("UserRepository")),
    __param(3, (0, tsyringe_1.inject)("PromotionRepository")),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], ValidateQrCodeService);
exports.default = ValidateQrCodeService;
//# sourceMappingURL=validate-qr-code-and-create-promotion-ticket.service.js.map