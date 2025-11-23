import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import ProductController from "../controllers/product.controller";
import permissionMiddleware from "../../../../../shared/infra/http/middlewares/permission.middleware";
import Permissions from "../../../../../shared/infra/http/middlewares/utils/permissions";

const productRoutes = Router();
const productController = new ProductController();

productRoutes.post(
  "/",
  permissionMiddleware(Permissions.CREATE_PRODUCT),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required(),
      store_id: Joi.string().uuid().required(),
      image_id: Joi.string().uuid().optional(),
    },
  }),
  productController.create
);

productRoutes.get(
  "/",
  permissionMiddleware(Permissions.SHOW_PRODUCTS),
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().uuid(),
      name: Joi.string(),
      price: Joi.number(),
      start_price: Joi.number(),
      end_price: Joi.number(),
      store_id: Joi.string().uuid(),
      join_store: Joi.boolean(),
      join_image: Joi.boolean(),
    },
  }),
  productController.show
);

productRoutes.put(
  "/:id",
  permissionMiddleware(Permissions.UPDATE_PRODUCT),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().optional(),
      price: Joi.number().optional(),
      store_id: Joi.string().uuid().optional(),
      image_id: Joi.string().uuid().optional(),
    },
  }),
  productController.update
);

productRoutes.delete(
  "/:id",
  permissionMiddleware(Permissions.DELETE_PRODUCT),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productController.delete
);

export default productRoutes;
