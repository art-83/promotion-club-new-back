import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import QrCodeController from "../controllers/qr-code.controller";
import permissionMiddleware from "../../../../../shared/infra/http/middlewares/permission.middleware";
import Permissions from "../../../../../shared/infra/http/middlewares/utils/permissions";

const qrCodeRoutes = Router();
const qrCodeController = new QrCodeController();

qrCodeRoutes.post(
  "/",
  permissionMiddleware(Permissions.CREATE_QR_CODE),
  celebrate({
    [Segments.BODY]: {
      promotion_id: Joi.string().uuid().required(),
    },
  }),
  qrCodeController.create
);

qrCodeRoutes.delete(
  "/:user_id",
  permissionMiddleware(Permissions.VALIDATE_QR_CODE),
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
  }),
  qrCodeController.validate
);

export default qrCodeRoutes;
