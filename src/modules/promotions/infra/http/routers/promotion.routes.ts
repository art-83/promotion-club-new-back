import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import PromotionController from "../controllers/promotion.controller";
import permissionMiddleware from "../../../../../shared/infra/http/middlewares/permission.middleware";
import Permissions from "../../../../../shared/infra/http/middlewares/utils/permissions";

const promotionRoutes = Router();
const promotionController = new PromotionController();

promotionRoutes.post(
  "/",
  permissionMiddleware(Permissions.CREATE_PROMOTION),
  celebrate({
    [Segments.BODY]: {
      discount_percentage: Joi.number().required(),
      product_id: Joi.string().uuid().required(),
      expire_at: Joi.date().required(),
    },
  }),
  promotionController.create
);

promotionRoutes.get(
  "/",
  permissionMiddleware(Permissions.SHOW_PROMOTIONS),
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().uuid(),
      discount_percentage: Joi.number(),
      start_final_price: Joi.number(),
      end_final_price: Joi.number(),
      expire_at: Joi.date(),
      store_id: Joi.string().uuid(),
      start_date: Joi.date(),
      end_date: Joi.date(),
      offset: Joi.number().integer(),
      limit: Joi.number().integer(),
    },
  }),
  promotionController.show
);

promotionRoutes.put(
  "/:id",
  permissionMiddleware(Permissions.UPDATE_PROMOTION),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      discount_percentage: Joi.number(),
      final_price: Joi.number(),
      expire_at: Joi.date(),
      is_approved: Joi.boolean(),
    },
  }),
  promotionController.update
);

promotionRoutes.delete(
  "/:id",
  permissionMiddleware(Permissions.DELETE_PROMOTION),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  promotionController.delete
);

export default promotionRoutes;
