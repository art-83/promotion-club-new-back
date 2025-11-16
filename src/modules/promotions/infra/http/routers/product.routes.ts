import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import ProductController from "../controllers/product.controller";

const productRoutes = Router();
const productController = new ProductController();

productRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required(),
      store_id: Joi.string().uuid().required(),
    },
  }),
  productController.create
);

productRoutes.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().uuid(),
      name: Joi.string(),
      price: Joi.number(),
    },
  }),
  productController.show
);

productRoutes.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      price: Joi.number(),
    },
  }),
  productController.update
);

productRoutes.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productController.delete
);

export default productRoutes;
