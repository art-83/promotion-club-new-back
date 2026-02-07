import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import UserController from "../controllers/user.controller";
import permissionMiddleware from "../../../../../shared/infra/http/middlewares/permission.middleware";
import Permissions from "../../../../../shared/infra/http/middlewares/utils/permissions";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post(
  "/token",
  permissionMiddleware(Permissions.CREATE_USER_PUSH_TOKEN),
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
      platform: Joi.string().required(),
    },
  }),
  userController.createUserPushToken
);

userRoutes.get("/me", permissionMiddleware(Permissions.GET_ME), userController.me);

userRoutes.put(
  "/:id/permissions",
  permissionMiddleware(Permissions.UPDATE_USER_PERMISSIONS),
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
  permissionMiddleware(Permissions.SHOW_USERS),
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().uuid(),
      name: Joi.string(),
      join_user_permissions: Joi.boolean().optional(),
      offset: Joi.number(),
      limit: Joi.number(),
    },
  }),
  userController.show
);

userRoutes.get("/store-options", permissionMiddleware(Permissions.SHOW_USER_STORE_OPTIONS), userController.showUserStoreOptions);

userRoutes.post(
  "/store-options/:store_id",
  permissionMiddleware(Permissions.CREATE_USER_STORE_OPTIONS),
  celebrate({
    [Segments.PARAMS]: {
      store_id: Joi.string().uuid().required(),
    },
  }),
  userController.createUserStoreOptions
);

userRoutes.delete(
  "/store-options/:store_id",
  permissionMiddleware(Permissions.DELETE_USER_STORE_OPTIONS),
  celebrate({
    [Segments.PARAMS]: {
      store_id: Joi.string().uuid().required(),
    },
  }),
  userController.deleteUserStoreOptions
);

userRoutes.get(
  "/benefits",
  permissionMiddleware(Permissions.SHOW_USER_BENEFITS),
  celebrate({
    [Segments.QUERY]: {
      benefit_id: Joi.string().uuid().optional(),
      start_date: Joi.date().optional(),
      end_date: Joi.date().optional(),
      offset: Joi.number().integer().optional(),
      limit: Joi.number().integer().optional(),
    },
  }),
  userController.showUserBenefits
);

userRoutes.post(
  "/benefits/:benefit_id",
  permissionMiddleware(Permissions.CREATE_USER_BENEFIT),
  celebrate({
    [Segments.PARAMS]: {
      benefit_id: Joi.string().uuid().required(),
    },
  }),
  userController.createUserBenefit
);

userRoutes.delete(
  "/benefits/:benefit_id",
  permissionMiddleware(Permissions.DELETE_USER_BENEFIT),
  celebrate({
    [Segments.PARAMS]: {
      benefit_id: Joi.string().uuid().required(),
    },
  }),
  userController.deleteUserBenefit
);

export default userRoutes;
