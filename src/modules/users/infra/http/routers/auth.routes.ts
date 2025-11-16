import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { celebrate, Joi, Segments } from "celebrate";

const authRouter = Router();
const authController = new AuthController();

authRouter.post(
  "/sign-up",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      cpf: Joi.string().required(),
    },
  }),
  authController.signUp
);

authRouter.post(
  "/sign-in",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authController.signIn
);

export default authRouter;
