import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import "../../containers";

import express from "express";
import routes from "./routes";
import dataSource from "../orm/database";
import globalErrorHandler from "./middlewares/global-error-handler.middleware";
import { errors } from "celebrate";
import cacheClient from "../cache/cache";

import cors from "cors";
import ResendMailer from "../mailer/infra/implementations/resend-mailer.implementation";
import EmailBodyDTO from "../mailer/dtos/email-body.dto";
import passwordResetCacheClient from "../cache/password-reset-cache";

async function main() {
  const server = express();

  server.use(cors());

  server.use(express.json());
  server.use(routes);
  server.use(errors());
  server.use(globalErrorHandler);

  const port = Number(process.env.SERVER_PORT);

  await cacheClient.connect();
  await passwordResetCacheClient.connect();
  await dataSource.initialize();
  //const migrations = await dataSource.runMigrations();

  server.listen(port, () => console.log(`http://localhost:${port}`));
}

main();
