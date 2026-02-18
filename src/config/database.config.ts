import { DataSourceOptions } from "typeorm";
import fs from "fs";

const dataSourceOptions = {
  type: String(process.env.TYPEORM_TYPE),
  host: String(process.env.TYPEORM_HOST),
  port: Number(process.env.TYPEORM_PORT),
  username: String(process.env.TYPEORM_USERNAME),
  password: String(process.env.TYPEORM_PASSWORD),
  database: String(process.env.TYPEORM_DATABASE),
  entities: [__dirname + String(process.env.TYPEORM_ENTITIES)],
  migrations: [__dirname + String(process.env.TYPEORM_MIGRATIONS)],
  synchronize: true,
  //dropSchema: true, // pelo amor de jesus cristo nao descomenta essa porra
  ssl: {
    ca: fs.readFileSync(__dirname + "/sa-east-1-bundle.pem"),
  },
} as DataSourceOptions;

export default dataSourceOptions;
