import { SetOptions } from "redis";

const cacheConfig = {
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  defaultExpiration: {
    type: "EX",
    value: 300,
  } as SetOptions,
  deleteExpiration: {
    type: "EX",
    value: 20,
  } as SetOptions,
};

export default cacheConfig;
