import { Router } from "express";
import ImageController from "../controllers/image.controller";
import imageUploader from "../../../utils/image-uploader";
import permissionMiddleware from "../../../../../shared/infra/http/middlewares/permission.middleware";
import Permissions from "../../../../../shared/infra/http/middlewares/utils/permissions";

const imageRoutes = Router();
const imageController = new ImageController();

imageRoutes.post("/", permissionMiddleware(Permissions.CREATE_IMAGE), imageUploader.single("image"), imageController.create);

export default imageRoutes;
