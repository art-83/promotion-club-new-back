"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_config_1 = __importDefault(require("../../../../../config/jwt.config"));
class Jwt {
    generate(data) {
        return jsonwebtoken_1.default.sign(data, jwt_config_1.default.secret, {
            algorithm: jwt_config_1.default.algorithm,
        });
    }
    validate(token) {
        return jsonwebtoken_1.default.verify(token, jwt_config_1.default.secret, {
            algorithms: [jwt_config_1.default.algorithm],
        });
    }
}
exports.default = Jwt;
//# sourceMappingURL=jwt.implementation.js.map