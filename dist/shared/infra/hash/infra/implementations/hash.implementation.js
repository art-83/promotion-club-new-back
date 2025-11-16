"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class Hash {
    async encrypt(password) {
        return await bcrypt_1.default.hash(password, 10);
    }
    async compare(password, hash) {
        return await bcrypt_1.default.compare(password, hash);
    }
}
exports.default = Hash;
//# sourceMappingURL=hash.implementation.js.map