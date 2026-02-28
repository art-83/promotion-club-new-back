import { SetOptions } from "redis";

const passwordResetCacheConfig = {
  url: `redis://${process.env.PASSWORD_RESET_CACHE_REDIS_HOST}:${process.env.PASSWORD_RESET_CACHE_REDIS_PORT}`,
  defaultExpiration: {
    expiration: { type: "EX", value: 300 },
  } as SetOptions,
  prefix: {
    passwordReset: "password-reset",
    tokenBlacklist: "token-blacklist",
  },
};

export default passwordResetCacheConfig;
