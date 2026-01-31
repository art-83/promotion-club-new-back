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
      name: Joi.string().required(),
      price: Joi.number().required(),
      discount_percentage: Joi.number().required(),
      expire_at: Joi.date().required(),
      store_id: Joi.string().uuid().required(),
      image_id: Joi.string().uuid().optional(),
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
      name: Joi.string(),
      price: Joi.number(),
      start_price: Joi.number(),
      end_price: Joi.number(),
      discount_percentage: Joi.number(),
      start_final_price: Joi.number(),
      end_final_price: Joi.number(),
      expire_at: Joi.date(),
      store_id: Joi.string().uuid(),
      start_date: Joi.date(),
      end_date: Joi.date(),
      offset: Joi.number().integer(),
      limit: Joi.number().integer(),
      is_approved: Joi.boolean().default(true),
      join_store: Joi.boolean(),
      join_image: Joi.boolean(),
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
      name: Joi.string().optional(),
      price: Joi.number().optional(),
      discount_percentage: Joi.number().optional(),
      expire_at: Joi.date().optional(),
      is_approved: Joi.boolean().optional(),
      store_id: Joi.string().uuid().optional(),
      image_id: Joi.string().uuid().optional(),
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

promotionRoutes.delete("/scheduled/delete-all-expired-promotions", promotionController.deleteExpiredPromotions);

export default promotionRoutes;
