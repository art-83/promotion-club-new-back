"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwtConfig = {
    secret: String(process.env.JWT_SECRET),
    algorithm: "HS256",
};
exports.default = jwtConfig;
//# sourceMappingURL=jwt.config.js.map