"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schedule_delete_expired_promotions_1 = __importDefault(require("./operations/schedule-delete-expired-promotions"));
function initScheduleOperations() {
    (0, schedule_delete_expired_promotions_1.default)();
}
exports.default = initScheduleOperations;
//# sourceMappingURL=index.js.map