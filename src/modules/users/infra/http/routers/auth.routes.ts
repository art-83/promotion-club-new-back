import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { celebrate, Joi, Segments } from "celebrate";
import telemetryMiddleware from "../../../../../shared/infra/http/middlewares/telemetry.middleware";

const authRouter = Router();
const authController = new AuthController();

authRouter.post(
  "/sign-up",
  //telemetryMiddleware,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(32).required(),
      cpf: Joi.string().min(11).max(11).required(),
      phone: Joi.string().required(),
    },
  }),
  authController.signUp
);

authRouter.post(
  "/sign-in",
  //telemetryMiddleware,
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authController.signIn
);

authRouter.post(
  "/reset-password/request",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  authController.requestPasswordReset
);

authRouter.post(
  "/reset-password/validate",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      code: Joi.string().required(),
    },
  }),
  authController.validatePasswordResetCode
);

authRouter.post(
  "/reset-password/change-password",
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().min(8).max(32).required(),
    },
  }),
  authController.changePassword
);

export default authRouter;
