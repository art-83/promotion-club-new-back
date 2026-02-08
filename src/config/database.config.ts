import { DataSourceOptions } from "typeorm";

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
} as DataSourceOptions;

export default dataSourceOptions;
