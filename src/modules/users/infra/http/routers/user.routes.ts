import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import UserController from "../controllers/user.controller";
import authMiddleware from "../../../../../shared/infra/http/middlewares/auth.middleware";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/me", userController.me);

userRoutes.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().uuid(),
      name: Joi.string(),
    },
  }),
  userController.show
);

export default userRoutes;
