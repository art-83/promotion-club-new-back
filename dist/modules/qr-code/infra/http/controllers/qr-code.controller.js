"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const generate_qr_code_service_1 = __importDefault(require("../../../services/generate-qr-code.service"));
const validate_qr_code_and_create_promotion_ticket_service_1 = __importDefault(require("../../../services/validate-qr-code-and-create-promotion-ticket.service"));
class QrCodeController {
    async create(request, response) {
        const generateQrCodeService = tsyringe_1.container.resolve(generate_qr_code_service_1.default);
        const promotion_id = request.body.promotion_id;
        const user_id = request.user_id;
        const qrCode = await generateQrCodeService.execute({
            user_id,
            promotion_id,
        });
        return response.status(201).json(qrCode);
    }
    async validate(request, response) {
        const validateQrCodeAndCreatePromotionTicketService = tsyringe_1.container.resolve(validate_qr_code_and_create_promotion_ticket_service_1.default);
        const qrCode = await validateQrCodeAndCreatePromotionTicketService.execute(request.user_id);
        return response.status(200).json(qrCode);
    }
}
exports.default = QrCodeController;
//# sourceMappingURL=qr-code.controller.js.map