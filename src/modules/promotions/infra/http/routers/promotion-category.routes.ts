import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import PromotionCategoryController from "../controllers/promotion-category.controller";

const promotionCategoryRoutes = Router();
const promotionCategoryController = new PromotionCategoryController();

promotionCategoryRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      store_id: Joi.string().uuid().required(),
    },
  }),
  promotionCategoryController.create
);

promotionCategoryRoutes.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().uuid().optional(),
      name: Joi.string().optional(),
      store_id: Joi.string().uuid().optional(),
      offset: Joi.number().optional(),
      limit: Joi.number().optional(),
    },
  }),
  promotionCategoryController.find
);

promotionCategoryRoutes.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  promotionCategoryController.delete
);

export default promotionCategoryRoutes;
