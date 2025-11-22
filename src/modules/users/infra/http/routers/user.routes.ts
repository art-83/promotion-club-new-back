import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import UserController from "../controllers/user.controller";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/me", userController.me);



userRoutes.put(
  "/:id/permissions",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      permissions: Joi.array().items(Joi.string()).optional(),
      store_id: Joi.string().uuid().optional(),
      join_user_permissions: Joi.boolean().optional(),
    },
  }),
  userController.updateUserPermissions
);

userRoutes.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().uuid(),
      name: Joi.string(),
      join_user_permissions: Joi.boolean().optional(),
    },
  }),
  userController.show
);

export default userRoutes;
