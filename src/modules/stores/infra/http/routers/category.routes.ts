import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import CategoryController from "../controllers/category.controller";

const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  categoryController.create
);

categoryRoutes.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().uuid().optional(),
      name: Joi.string().optional(),
      offset: Joi.number().optional(),
      limit: Joi.number().optional(),
    },
  }),
  categoryController.find
);

categoryRoutes.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  categoryController.delete
);

export default categoryRoutes;
