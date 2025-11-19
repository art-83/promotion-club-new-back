import { Router } from "express";
import ImageController from "../controllers/image.controller";
import upload from "../../../../../config/multer.config";

const imageRoutes = Router();
const imageController = new ImageController();

imageRoutes.post(
  "/",
  upload.single("image"),
  imageController.create
);

export default imageRoutes;
