"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cacheConfig = {
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    expiration: {
        type: "EX",
        value: 300,
    },
};
exports.default = cacheConfig;
//# sourceMappingURL=cache.config.js.map