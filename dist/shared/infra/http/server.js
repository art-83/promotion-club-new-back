"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("reflect-metadata");
require("../../containers");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = __importDefault(require("../orm/database"));
const global_error_handler_middleware_1 = __importDefault(require("./middlewares/global-error-handler.middleware"));
const celebrate_1 = require("celebrate");
const cache_1 = __importDefault(require("../cache/cache"));
const schedule_operations_1 = __importDefault(require("../../schedule-operations"));
const cors_1 = __importDefault(require("cors"));
async function main() {
    const server = (0, express_1.default)();
    server.use((0, cors_1.default)());
    server.use("/files", express_1.default.static("storage/images"));
    server.use(express_1.default.json());
    server.use(routes_1.default);
    server.use((0, celebrate_1.errors)());
    server.use(global_error_handler_middleware_1.default);
    const port = Number(process.env.SERVER_PORT);
    await cache_1.default.connect();
    await database_1.default.initialize();
    server.listen(port, () => console.log(`http://localhost:${port}`));
    (0, schedule_operations_1.default)();
}
main();
//# sourceMappingURL=server.js.map