"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const validate_jwt_service_1 = __importDefault(require("../../jwt/services/validate-jwt.service"));
const app_error_1 = __importDefault(require("../errors/app-error"));
const authMiddleware = (request, response, next) => {
    try {
        const authorization = request.headers.authorization;
        if (!authorization)
            return response.status(401).json({ message: "Authorization must be provided." });
        const validateJwtService = tsyringe_1.container.resolve(validate_jwt_service_1.default);
        const jwt = validateJwtService.execute(authorization);
        request.user_id = jwt.user_id;
    }
    catch (error) {
        console.error(error);
        if (error instanceof app_error_1.default)
            return response.status(error.code).json({ message: error.message });
        return response.status(401).json({ message: "Invalid authorization." });
    }
    next();
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map