"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cache_1 = __importDefault(require("../../../../../shared/infra/cache/cache"));
const cache_config_1 = __importDefault(require("../../../../../config/cache.config"));
class Cache {
    client;
    constructor() {
        this.client = cache_1.default;
    }
    async generate(data) {
        const jsonData = JSON.stringify(data);
        const save = String(await this.client.set(data.user_id, jsonData, cache_config_1.default.expiration));
        return save;
    }
    async find(id) {
        const qrCode = String(this.client.get(id));
        return qrCode;
    }
    async delete(id) {
        const deleteQrCode = await this.client.del(id);
        return deleteQrCode;
    }
}
exports.default = Cache;
//# sourceMappingURL=cache.implementation.js.map