import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import StoreRatingResponseController from "../controllers/store-rating-response.controller";
import permissionMiddleware from "../../../../../shared/infra/http/middlewares/permission.middleware";
import Permissions from "../../../../../shared/infra/http/middlewares/utils/permissions";

const storeRatingResponseRoutes = Router();
const storeRatingResponseController = new StoreRatingResponseController();

storeRatingResponseRoutes.post(
  "/",
  permissionMiddleware(Permissions.CREATE_STORE_RATING_RESPONSE),
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      user_id: Joi.string().uuid().required(),
      store_rating_id: Joi.string().uuid().required(),
    },
  }),
  storeRatingResponseController.create
);

storeRatingResponseRoutes.get(
  "/",
  permissionMiddleware(Permissions.SHOW_STORE_RATING_RESPONSES),
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().uuid().optional(),
      user_id: Joi.string().uuid().optional(),
      store_rating_id: Joi.string().uuid().optional(),
      offset: Joi.number().optional(),
      limit: Joi.number().optional(),
    },
  }),
  storeRatingResponseController.show
);

storeRatingResponseRoutes.put(
  "/:id",
  permissionMiddleware(Permissions.UPDATE_STORE_RATING_RESPONSE),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      description: Joi.string().optional(),
    },
  }),
  storeRatingResponseController.update
);

storeRatingResponseRoutes.delete(
  "/:id",
  permissionMiddleware(Permissions.DELETE_STORE_RATING_RESPONSE),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  storeRatingResponseController.delete
);

export default storeRatingResponseRoutes;
