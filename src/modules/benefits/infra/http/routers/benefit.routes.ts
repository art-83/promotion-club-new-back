import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import BenefitController from "../controllers/benefit.controller";
import permissionMiddleware from "../../../../../shared/infra/http/middlewares/permission.middleware";
import Permissions from "../../../../../shared/infra/http/middlewares/utils/permissions";

const benefitRoutes = Router();
const benefitController = new BenefitController();

benefitRoutes.get(
  "/",
  permissionMiddleware(Permissions.SHOW_BENEFITS),
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().uuid().optional(),
      store_id: Joi.string().uuid().optional(),
      join_image: Joi.boolean().optional(),
      join_store: Joi.boolean().optional(),
      start_date: Joi.date().optional(),
      end_date: Joi.date().optional(),
      offset: Joi.number().integer().optional(),
      limit: Joi.number().integer().optional(),
    },
  }),
  benefitController.show
);

benefitRoutes.post(
  "/",
  permissionMiddleware(Permissions.CREATE_BENEFIT),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      score_required: Joi.number().required(),
      store_id: Joi.string().uuid().required(),
      image_id: Joi.string().uuid().optional(),
    },
  }),
  benefitController.create
);

benefitRoutes.put(
  "/:id",
  permissionMiddleware(Permissions.UPDATE_BENEFIT),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().optional(),
      description: Joi.string().optional(),
      score_required: Joi.number().optional(),
      store_id: Joi.string().uuid().optional(),
      image_id: Joi.string().uuid().optional(),
    },
  }),
  benefitController.update
);

benefitRoutes.delete(
  "/:id",
  permissionMiddleware(Permissions.DELETE_BENEFIT),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  benefitController.delete
);

export default benefitRoutes;
