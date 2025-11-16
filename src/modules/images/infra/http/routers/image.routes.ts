import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import ImageController from "../controllers/image.controller";
import upload from "../../../../../config/multer.config";

const imageRoutes = Router();
const imageController = new ImageController();

imageRoutes.post(
  "/",
  upload.single("image"),
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().uuid().required(),
    },
  }),
  imageController.create
);

export default imageRoutes;
