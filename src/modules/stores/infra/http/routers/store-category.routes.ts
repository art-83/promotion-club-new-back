import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import StoreCategoryController from "../controllers/store-category.controller";

const storeCategoryRoutes = Router();
const storeCategoryController = new StoreCategoryController();

storeCategoryRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  storeCategoryController.create
);

storeCategoryRoutes.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().uuid().optional(),
      name: Joi.string().optional(),
      offset: Joi.number().optional(),
      limit: Joi.number().optional(),
    },
  }),
  storeCategoryController.find
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
