import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import PromotionController from "../controllers/promotion.controller";

const promotionRoutes = Router();
const promotionController = new PromotionController();

promotionRoutes.post(
  "/",
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
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().uuid(),
      discount_percentage: Joi.number(),
      final_price: Joi.number(),
      expire_at: Joi.date(),
    },
  }),
  promotionController.show
);

promotionRoutes.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      discount_percentage: Joi.number(),
      final_price: Joi.number(),
      expire_at: Joi.date(),
    },
  }),
  promotionController.update
);

promotionRoutes.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  promotionController.delete
);

export default promotionRoutes;
