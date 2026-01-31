import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import PromotionTagController from "../controllers/promotion-tag.controller";

const promotionTagRoutes = Router();
const promotionTagController = new PromotionTagController();

promotionTagRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      promotion_id: Joi.string().uuid().required(),
      tag_id: Joi.string().required(),
    },
  }),
  promotionTagController.create
);

promotionTagRoutes.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().optional(),
      promotion_id: Joi.string().uuid().optional(),
      tag_id: Joi.string().optional(),
    },
  }),
  promotionTagController.find
);

export default promotionTagRoutes;
