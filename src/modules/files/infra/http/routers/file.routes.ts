import { Router } from "express";
import FileController from "../controllers/file.controller";
import fileUploader from "../../../utils/file-uploader";
import permissionMiddleware from "../../../../../shared/infra/http/middlewares/permission.middleware";
import Permissions from "../../../../../shared/infra/http/middlewares/utils/permissions";

const fileRoutes = Router();
const fileController = new FileController();

fileRoutes.post("/", permissionMiddleware(Permissions.CREATE_FILE), fileUploader.single("file"), fileController.create);

export default fileRoutes;
