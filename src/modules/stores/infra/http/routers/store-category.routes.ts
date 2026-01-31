import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import StoreCategoryController from "../controllers/store-category.controller";

const storeCategoryRoutes = Router();
const storeCategoryController = new StoreCategoryController();

storeCategoryRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      store_id: Joi.string().uuid().required(),
      category_id: Joi.string().uuid().required(),
    },
  }),
  storeCategoryController.create
);

storeCategoryRoutes.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().uuid().optional(),
      store_id: Joi.string().uuid().optional(),
      category_id: Joi.string().uuid().optional(),
    },
  }),
  storeCategoryController.find
);

storeCategoryRoutes.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      store_id: Joi.string().uuid().optional(),
      category_id: Joi.string().uuid().optional(),
    },
  }),
  storeCategoryController.update
);

storeCategoryRoutes.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  storeCategoryController.delete
);

export default storeCategoryRoutes;
