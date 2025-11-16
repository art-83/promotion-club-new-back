"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataSourceOptions = {
    type: String(process.env.TYPEORM_TYPE),
    host: String(process.env.TYPEORM_HOST),
    port: Number(process.env.TYPEORM_PORT),
    username: String(process.env.TYPEORM_USERNAME),
    password: String(process.env.TYPEORM_PASSWORD),
    database: String(process.env.TYPEORM_DATABASE),
    synchronize: Boolean(process.env.TYPEORM_SYNC),
    entities: [__dirname + String(process.env.TYPEORM_ENTITIES)],
    //dropSchema: true,
};
exports.default = dataSourceOptions;
//# sourceMappingURL=database.config.js.map