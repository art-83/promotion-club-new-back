"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const cache_config_1 = __importDefault(require("../../../config/cache.config"));
const cacheClient = (0, redis_1.createClient)({ url: cache_config_1.default.url });
cacheClient.on("error", (error) => console.log("Redis Client Error:", error));
exports.default = cacheClient;
//# sourceMappingURL=cache.js.map