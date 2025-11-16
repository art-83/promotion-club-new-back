import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import ValidateJwtService from "../../jwt/services/validate-jwt.service";
import AppError from "../errors/app-error";

const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
  try {
    const authorization = request.headers.authorization;

    if (!authorization) return response.status(401).json({ message: "Authorization must be provided." });

    const validateJwtService = container.resolve(ValidateJwtService);
    const jwt = validateJwtService.execute(authorization);

    request.user_id = jwt.user_id;
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) return response.status(error.code).json({ message: error.message });
    return response.status(401).json({ message: "Invalid authorization." });
  }
  next();
};

export default authMiddleware;
