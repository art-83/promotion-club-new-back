import { createClient, RedisClientType } from "redis";
import cacheConfig from "../../../config/cache.config";

const cacheClient = createClient({ url: cacheConfig.url });

cacheClient.on("error", (error) => console.log("Redis Client Error:", error));

export default cacheClient;
