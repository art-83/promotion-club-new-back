import { createClient } from "redis";
import passwordResetCacheConfig from "../../../config/password-reset-cache.config";

const passwordResetCacheClient = createClient({ url: passwordResetCacheConfig.url });

passwordResetCacheClient.on("error", (error) => console.log("Redis Client Error:", error));

export default passwordResetCacheClient;
