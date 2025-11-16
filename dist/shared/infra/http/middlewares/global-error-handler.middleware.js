"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const redis_1 = require("redis");
const app_error_1 = __importDefault(require("../errors/app-error"));
const globalErrorHandler = (error, request, response, next) => {
    if ((0, celebrate_1.isCelebrateError)(error)) {
        return response.status(400).json(error);
    }
    if (error instanceof app_error_1.default) {
        return response.status(error.code).json({
            message: error.message,
        });
    }
    if (error instanceof redis_1.ErrorReply) {
        return response.status(500).json({
            message: error.message,
        });
    }
    console.error(error);
    return response.status(500).json({
        message: "Internal Server Error",
    });
};
exports.default = globalErrorHandler;
//# sourceMappingURL=global-error-handler.middleware.js.map