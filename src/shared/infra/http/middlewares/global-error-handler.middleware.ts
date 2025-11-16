import { Request, Response, NextFunction } from "express";
import { isCelebrateError } from "celebrate";
import { ErrorReply } from "redis";
import AppError from "../errors/app-error";

const globalErrorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  if (isCelebrateError(error)) {
    return response.status(400).json(error);
  }

  if (error instanceof AppError) {
    return response.status(error.code).json({
      message: error.message,
    });
  }

  if (error instanceof ErrorReply) {
    return response.status(500).json({
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    message: "Internal Server Error",
  });
};

export default globalErrorHandler;
