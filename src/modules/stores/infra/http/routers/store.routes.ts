import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import StoreController from "../controllers/store.controller";
import permissionMiddleware from "../../../../../shared/infra/http/middlewares/permission.middleware";
import Permissions from "../../../../../shared/infra/http/middlewares/utils/permissions";

const storeRoutes = Router();
const storeController = new StoreController();

storeRoutes.post(
  "/",
  permissionMiddleware(Permissions.CREATE_STORE),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      invoice_taxes_percentage: Joi.number().min(0).max(100).required(),
      street: Joi.string().required(),
      neighborhood: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      number: Joi.string().required(),
      file_id: Joi.string().uuid().optional(),
    },
  }),
  storeController.create
);

storeRoutes.get(
  "/",
  permissionMiddleware(Permissions.SHOW_STORES),
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().uuid(),
      name: Joi.string(),
      street: Joi.string(),
      neighborhood: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      number: Joi.string(),
      join_file: Joi.boolean(),
      offset: Joi.number(),
      limit: Joi.number(),
    },
  }),
  storeController.show
);

storeRoutes.put(
  "/:id",
  permissionMiddleware(Permissions.UPDATE_STORE),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().optional(),
      invoice_taxes_percentage: Joi.number().min(0).max(100).optional(),
      street: Joi.string().optional(),
      neighborhood: Joi.string().optional(),
      city: Joi.string().optional(),
      state: Joi.string().optional(),
      number: Joi.string().optional(),
      file_id: Joi.string().uuid().optional(),
    },
  }),
  storeController.update
);

storeRoutes.delete(
  "/:id",
  permissionMiddleware(Permissions.DELETE_STORE),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  storeController.delete
);

export default storeRoutes;
