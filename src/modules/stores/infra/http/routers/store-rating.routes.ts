import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import StoreRatingController from "../controllers/store-rating.controller";
import permissionMiddleware from "../../../../../shared/infra/http/middlewares/permission.middleware";
import Permissions from "../../../../../shared/infra/http/middlewares/utils/permissions";

const storeRatingRoutes = Router();
const storeRatingController = new StoreRatingController();

storeRatingRoutes.post(
  "/",
  permissionMiddleware(Permissions.CREATE_STORE_RATING),
  celebrate({
    [Segments.BODY]: {
      rating: Joi.number().min(1).max(5).required(),
      description: Joi.string().optional().allow("", null),
      user_id: Joi.string().uuid().required(),
      store_id: Joi.string().uuid().required(),
    },
  }),
  storeRatingController.create
);

storeRatingRoutes.get(
  "/",
  permissionMiddleware(Permissions.SHOW_STORE_RATINGS),
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().uuid().optional(),
      user_id: Joi.string().uuid().optional(),
      store_id: Joi.string().uuid().optional(),
      offset: Joi.number().optional(),
      limit: Joi.number().optional(),
    },
  }),
  storeRatingController.show
);

storeRatingRoutes.put(
  "/:id",
  permissionMiddleware(Permissions.UPDATE_STORE_RATING),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      rating: Joi.number().min(1).max(5).optional(),
      description: Joi.string().optional().allow("", null),
    },
  }),
  storeRatingController.update
);

storeRatingRoutes.delete(
  "/:id",
  permissionMiddleware(Permissions.DELETE_STORE_RATING),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  storeRatingController.delete
);

export default storeRatingRoutes;
