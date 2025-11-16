"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const tsyringe_1 = require("tsyringe");
const delete_expired_promotions_service_1 = __importDefault(require("../../../modules/promotions/services/promotions/delete-expired-promotions.service"));
const cron_config_1 = __importDefault(require("../../../config/cron.config"));
async function scheduleDeleteExpiredPromotions() {
    node_cron_1.default.schedule(cron_config_1.default.interval, async () => {
        const deleteExpiredPromotionsService = tsyringe_1.container.resolve(delete_expired_promotions_service_1.default);
        await deleteExpiredPromotionsService.execute();
    });
}
exports.default = scheduleDeleteExpiredPromotions;
//# sourceMappingURL=schedule-delete-expired-promotions.js.map