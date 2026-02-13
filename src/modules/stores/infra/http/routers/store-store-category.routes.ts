import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import StoreStoreCategoryController from "../controllers/store-store-category.controller";

const storeStoreCategoryRoutes = Router();
const storeStoreCategoryController = new StoreStoreCategoryController();

storeStoreCategoryRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      store_id: Joi.string().uuid().required(),
      category_id: Joi.string().uuid().required(),
    },
  }),
  storeStoreCategoryController.create
);

storeStoreCategoryRoutes.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().uuid().optional(),
      store_id: Joi.string().uuid().optional(),
      category_id: Joi.string().uuid().optional(),
    },
  }),
  storeStoreCategoryController.find
);

storeStoreCategoryRoutes.put(
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
  storeStoreCategoryController.update
);

storeStoreCategoryRoutes.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  storeStoreCategoryController.delete
);

export default storeStoreCategoryRoutes;
