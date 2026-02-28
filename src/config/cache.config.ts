import { SetOptions } from "redis";

const cacheConfig = {
  url: `redis://${process.env.CACHE_REDIS_HOST}:${process.env.CACHE_REDIS_PORT}`,
  defaultExpiration: {
    expiration: { type: "EX", value: 300 },
  } as SetOptions,
  deleteExpiration: {
    expiration: { type: "EX", value: 20 },
  } as SetOptions,
};

export default cacheConfig;
