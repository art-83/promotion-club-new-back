import { SetOptions } from "redis";

const cacheConfig = {
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  expiration: {
    type: "EX",
    value: 300,
  } as SetOptions,
};

export default cacheConfig;
