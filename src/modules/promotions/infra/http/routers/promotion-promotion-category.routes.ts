import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import PromotionPromotionCategoryController from "../controllers/promotion-promotion-category.controller";

const promotionPromotionCategoryRoutes = Router();
const promotionPromotionCategoryController = new PromotionPromotionCategoryController();

promotionPromotionCategoryRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      promotion_id: Joi.string().uuid().required(),
      promotion_category_id: Joi.string().uuid().required(),
    },
  }),
  promotionPromotionCategoryController.create
);

promotionPromotionCategoryRoutes.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().uuid().optional(),
      promotion_id: Joi.string().uuid().optional(),
      promotion_category_id: Joi.string().uuid().optional(),
    },
  }),
  promotionPromotionCategoryController.find
);

promotionPromotionCategoryRoutes.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      promotion_id: Joi.string().uuid().optional(),
      promotion_category_id: Joi.string().uuid().optional(),
    },
  }),
  promotionPromotionCategoryController.update
);

promotionPromotionCategoryRoutes.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  promotionPromotionCategoryController.delete
);

export default promotionPromotionCategoryRoutes;
