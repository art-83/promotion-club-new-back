import { Request, Response, NextFunction } from "express";
import logger from "../../../../config/winston.config";

const telemetryMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const data = `${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })} - from: ${request.user_id} - method: ${request.method} - url: ${request.originalUrl}`;
  logger.info(`Request received: ${data}`);
  next();
};

export default telemetryMiddleware;
