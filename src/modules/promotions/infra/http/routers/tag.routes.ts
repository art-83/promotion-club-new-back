import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import TagController from "../controllers/tag.controller";

const tagRoutes = Router();
const tagController = new TagController();

tagRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      store_id: Joi.string().uuid().optional(),
    },
  }),
  tagController.create
);

tagRoutes.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().optional(),
      name: Joi.string().optional(),
      store_id: Joi.string().optional(),
    },
  }),
  tagController.find
);

export default tagRoutes;
