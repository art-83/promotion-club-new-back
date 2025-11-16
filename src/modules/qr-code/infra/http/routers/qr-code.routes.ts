import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import QrCodeController from "../controllers/qr-code.controller";
import authMiddleware from "../../../../../shared/infra/http/middlewares/auth.middleware";

const qrCodeRoutes = Router();
const qrCodeController = new QrCodeController();

qrCodeRoutes.use(authMiddleware);

qrCodeRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      promotion_id: Joi.string().uuid().required(),
    },
  }),
  qrCodeController.create
);

qrCodeRoutes.delete("/:id", qrCodeController.validate);

export default qrCodeRoutes;
