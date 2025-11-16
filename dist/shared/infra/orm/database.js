"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("../../../config/database.config"));
const dataSource = new typeorm_1.DataSource(database_config_1.default);
exports.default = dataSource;
//# sourceMappingURL=database.js.map