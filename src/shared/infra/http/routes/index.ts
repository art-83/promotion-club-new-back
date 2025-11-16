import { Router } from "express";
import userRoutes from "../../../../modules/users/infra/http/routers/user.routes";
import storeRoutes from "../../../../modules/stores/infra/http/routers/store.routes";
import productRoutes from "../../../../modules/promotions/infra/http/routers/product.routes";
import promotionRoutes from "../../../../modules/promotions/infra/http/routers/promotion.routes";
import imageRoutes from "../../../../modules/images/infra/http/routers/image.routes";
import qrCodeRoutes from "../../../../modules/qr-code/infra/http/routers/qr-code.routes";
import authRouter from "../../../../modules/users/infra/http/routers/auth.routes";
import authMiddleware from "../middlewares/auth.middleware";

const routes = Router();

routes.use("/auth", authRouter);

routes.use(authMiddleware);

routes.use("/users", userRoutes);
routes.use("/stores", storeRoutes);
routes.use("/products", productRoutes);
routes.use("/promotions", promotionRoutes);
routes.use("/images", imageRoutes);
routes.use("/qr-codes", qrCodeRoutes);

export default routes;
