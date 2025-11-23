import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import UserController from "../controllers/user.controller";
import permissionMiddleware from "../../../../../shared/infra/http/middlewares/permission.middleware";
import Permissions from "../../../../../shared/infra/http/middlewares/utils/permissions";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/me", permissionMiddleware(Permissions.GET_ME), userController.me);

userRoutes.put(
  "/:id/permissions",
  //permissionMiddleware(Permissions.UPDATE_USER_PERMISSIONS),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      permissions: Joi.array().items(Joi.string()).optional(),
      store_id: Joi.string().uuid().allow(null).optional(),
    },
  }),
  userController.updateUserPermissions
);

userRoutes.get(
  "/",
  //permissionMiddleware(Permissions.SHOW_USERS),
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
