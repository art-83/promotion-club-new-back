import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import StoreController from "../controllers/store.controller";

const storeRoutes = Router();
const storeController = new StoreController();

storeRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      street: Joi.string().required(),
      neighborhood: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      number: Joi.string().required(),
    },
  }),
  storeController.create
);

storeRoutes.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().uuid(),
      name: Joi.string(),
      street: Joi.string(),
      neighborhood: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      number: Joi.string(),
    },
  }),
  storeController.show
);

storeRoutes.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      street: Joi.string(),
      neighborhood: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      number: Joi.string(),
    },
  }),
  storeController.update
);

storeRoutes.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  storeController.delete
);

export default storeRoutes;
