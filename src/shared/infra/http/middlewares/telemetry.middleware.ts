import { Request, Response, NextFunction } from "express";
import logger from "../../../../config/winston.config";

const telemetryMiddleware = (request: Request, response: Response, next: NextFunction) => {
  logger.info("Request received", {
    from: request.user_id,
    method: request.method,
    url: request.originalUrl,
    ip: request.ip,
  });
  next();
};

export default telemetryMiddleware;
