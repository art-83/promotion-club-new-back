import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import BenefitTierController from "../controllers/benefit-tier.controller";
import permissionMiddleware from "../../../../../shared/infra/http/middlewares/permission.middleware";
import Permissions from "../../../../../shared/infra/http/middlewares/utils/permissions";

const benefitTierRoutes = Router();
const benefitTierController = new BenefitTierController();

benefitTierRoutes.get(
  "/",
  permissionMiddleware(Permissions.SHOW_BENEFIT_TIERS),
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().uuid().optional(),
      name: Joi.string().optional(),
      minimum_score: Joi.number().optional(),
      maximum_score: Joi.number().optional(),
    },
  }),
  benefitTierController.show
);

benefitTierRoutes.put(
  "/:id",
  permissionMiddleware(Permissions.UPDATE_BENEFIT_TIER),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().optional(),
      minimum_score: Joi.number().optional(),
      maximum_score: Joi.number().optional(),
      color_hex: Joi.string()
        .pattern(/^#[0-9A-Fa-f]{6}$/)
        .optional(),
      description: Joi.string().optional(),
    },
  }),
  benefitTierController.update
);

export default benefitTierRoutes;
